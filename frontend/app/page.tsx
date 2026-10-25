
"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Login backend is not connected yet. We will set it up next.");
  }

  function handleGitHubLogin() {
  window.location.href = "http://127.0.0.1:8000/auth/github/login";
}

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080d18] px-5 py-10 text-white">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#101827] shadow-2xl md:grid-cols-2">
        <section className="flex flex-col justify-between bg-gradient-to-br from-[#142b49] via-[#102039] to-[#101827] p-8 md:p-12">
          <div>
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/15 text-2xl text-cyan-300">
                ⬡
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-[0.2em]">ARGUS</h1>
                <p className="text-xs tracking-widest text-slate-400">
                  AUTONOMOUS SECURITY
                </p>
              </div>
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Intelligent security analysis
            </p>

            <h2 className="max-w-md text-4xl font-bold leading-tight md:text-5xl">
              See deeper.
              <br />
              Secure smarter.
            </h2>

            <p className="mt-6 max-w-sm leading-7 text-slate-400">
              Analyze repositories, investigate vulnerabilities, and turn
              security findings into actionable insights.
            </p>
          </div>

          <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm font-medium text-slate-200">
              Your security workspace
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Repository analysis
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Evidence-based findings
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              Guided remediation
            </div>
          </div>
        </section>

        <section className="p-8 md:p-12">
          <div className="mb-8">
            <p className="text-sm font-medium text-cyan-300">WELCOME BACK</p>
            <h2 className="mt-3 text-3xl font-bold">Sign in to ARGUS</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Access your security analysis workspace.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-400 px-4 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#101827]"
            >
              Sign in
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-700" />
            <span className="text-xs uppercase tracking-wider text-slate-500">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-slate-700" />
          </div>

          <button
            type="button"
            onClick={handleGitHubLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-transparent px-4 py-3.5 font-medium transition hover:border-slate-500 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5 fill-current"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.07c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.23-1.65-1.23-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3.01 0 4.29-2.62 5.23-5.11 5.51.4.35.75 1.02.75 2.06V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z" />
            </svg>
            Sign in with GitHub
          </button>

          <p className="mt-8 text-center text-xs leading-5 text-slate-500">
            ARGUS · Autonomous Multi-Agent Security Framework
          </p>
        </section>
      </div>
    </main>
  );
}
