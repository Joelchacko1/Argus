
import os
import secrets
from urllib.parse import urlencode

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from fastapi.responses import RedirectResponse

load_dotenv()

GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
SESSION_SECRET = os.getenv("SESSION_SECRET")

if not all([GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SESSION_SECRET]):
    raise RuntimeError("Missing required settings in backend/.env")

GITHUB_CALLBACK_URL = "http://127.0.0.1:8000/auth/github/callback"
FRONTEND_URL = "http://localhost:3000"

app = FastAPI(title="ARGUS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key=SESSION_SECRET,
    same_site="lax",
    https_only=False,  # Local development only
)


@app.get("/")
def home():
    return {"message": "ARGUS backend is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/auth/github/login")
async def github_login(request: Request):
    state = secrets.token_urlsafe(32)
    request.session["oauth_state"] = state

    params = {
        "client_id": GITHUB_CLIENT_ID,
        "redirect_uri": GITHUB_CALLBACK_URL,
        "scope": "read:user user:email",
        "state": state,
    }

    url = "https://github.com/login/oauth/authorize?" + urlencode(params)
    return RedirectResponse(url=url)


@app.get("/auth/github/callback")
async def github_callback(request: Request, code: str = None, state: str = None):
    saved_state = request.session.pop("oauth_state", None)

    if not saved_state or not state or not secrets.compare_digest(saved_state, state):
        raise HTTPException(status_code=400, detail="Invalid OAuth state")

    if not code:
        raise HTTPException(status_code=400, detail="GitHub did not provide an authorization code")

    async with httpx.AsyncClient(timeout=15.0) as client:
        token_response = await client.post(
            "https://github.com/login/oauth/access_token",
            headers={"Accept": "application/json"},
            data={
                "client_id": GITHUB_CLIENT_ID,
                "client_secret": GITHUB_CLIENT_SECRET,
                "code": code,
                "redirect_uri": GITHUB_CALLBACK_URL,
            },
        )
        token_response.raise_for_status()
        token_data = token_response.json()

        access_token = token_data.get("access_token")
        if not access_token:
            raise HTTPException(status_code=400, detail="Could not obtain GitHub access token")

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }

        user_response = await client.get(
            "https://api.github.com/user",
            headers=headers,
        )
        user_response.raise_for_status()
        github_user = user_response.json()

        email = github_user.get("email")
        if not email:
            email_response = await client.get(
                "https://api.github.com/user/emails",
                headers=headers,
            )
            email_response.raise_for_status()
            emails = email_response.json()
            primary_email = next(
                (item["email"] for item in emails if item.get("primary") and item.get("verified")),
                None,
            )
            email = primary_email

    # Store only the needed profile information in the signed session.
    request.session["github_user"] = {
        "id": github_user["id"],
        "username": github_user["login"],
        "name": github_user.get("name"),
        "email": email,
        "avatar_url": github_user.get("avatar_url"),
    }

    return RedirectResponse(url=f"{FRONTEND_URL}/?github=success")


@app.get("/auth/me")
async def current_user(request: Request):
    user = request.session.get("github_user")
    if not user:
        raise HTTPException(status_code=401, detail="Not signed in")
    return user


@app.post("/auth/logout")
async def logout(request: Request):
    request.session.clear()
    return {"message": "Logged out"}
