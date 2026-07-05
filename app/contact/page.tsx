"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to send the message right now.");
      }

      setStatus("success");
      setFeedback(data.message ?? "Thanks for reaching out. I’ll reply shortly.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unable to send the message right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Contact</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-5xl">
            Let&apos;s talk product, systems, and thoughtful delivery.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
            I&apos;m currently exploring roles where I can help teams ship reliable product experiences with a strong technical foundation.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="mailto:melvinvenk707@gmail.com" className="rounded-full border border-[var(--color-border)] px-4 py-2 transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
              melvinvenk707@gmail.com
            </a>
            <a href="tel:+917022224871" className="rounded-full border border-[var(--color-border)] px-4 py-2 transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
              +91 7022224871
            </a>
            <span className="rounded-full border border-[var(--color-border)] px-4 py-2 text-[var(--color-text-muted)]">
              Bangalore, Karnataka, India
            </span>
            <Link href="/resume" className="rounded-full border border-[var(--color-border)] px-4 py-2 transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
              View résumé
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 shadow-[0_1px_0_rgba(255,255,255,0.02)]">
          <Image
            src="/contact-illustration.svg"
            alt="TODO: Add descriptive alt text for the contact illustration"
            width={720}
            height={540}
            priority
            className="h-auto w-full rounded-2xl"
          />
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-[var(--color-text)]">Send a message</h2>
          <p className="text-[var(--color-text-muted)]">
            Share a brief note and I&apos;ll follow up when I can.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
              <span className="text-[var(--color-text)]">Name</span>
              <input
                required
                name="name"
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] outline-none"
                placeholder="Your name"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
              <span className="text-[var(--color-text)]">Email</span>
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] outline-none"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
            <span className="text-[var(--color-text)]">Message</span>
            <textarea
              required
              name="message"
              rows={6}
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] outline-none"
              placeholder="Tell me what you’re building..."
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </button>

            {status !== "idle" ? (
              <p className={`text-sm ${status === "success" ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"}`}>
                {feedback}
              </p>
            ) : null}
          </div>
        </form>
      </section>
    </main>
  );
}
