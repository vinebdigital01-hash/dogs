import React, { useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle.js";

export default function Login() {
  usePageTitle("Login | Madhav Kennal");
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    alert(
      mode === "login"
        ? "Login is a demo UI for now. Connect auth when ready."
        : "Signup is a demo UI for now. Connect auth when ready."
    );
  };

  return (
    <section className="section flex min-h-[70vh] items-center justify-center py-12">
      <div className="card-soft w-full max-w-md p-6 sm:p-8">
        <h1 className="text-center font-display text-2xl font-extrabold text-brand-ink">
          Get started with Madhav Kennal
        </h1>
        <p className="mt-2 text-center text-sm text-brand-charcoalSoft">
          {mode === "login" ? "Sign in to continue" : "Create your account"}
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-brand-charcoalSoft">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-brand-beige bg-brand-cream/40 px-4 py-3 text-sm outline-none focus:border-brand-teal"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-brand-charcoalSoft">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-brand-beige bg-brand-cream/40 px-4 py-3 text-sm outline-none focus:border-brand-teal"
            />
          </div>
          {mode === "login" && (
            <button type="button" className="text-sm font-semibold text-brand-teal hover:underline">
              Forgot Password?
            </button>
          )}
          <button type="submit" className="btn-primary w-full">
            {mode === "login" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <button type="button" className="btn-ghost mt-4 w-full">
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-brand-charcoalSoft">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="font-semibold text-brand-teal hover:underline"
            onClick={() => setMode((m) => (m === "login" ? "signup" : "login"))}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="text-xs text-brand-charcoalSoft hover:text-brand-teal">← Back home</Link>
        </p>
      </div>
    </section>
  );
}
