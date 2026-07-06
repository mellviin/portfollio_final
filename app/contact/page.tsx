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
        <div className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
          <p className="label text-white/70">Contact</p>
          <h1 className="heading">Let&apos;s talk product, systems, and thoughtful delivery.</h1>
          <p className="body-sm max-w-2xl">
            I&apos;m currently exploring roles where I can help teams ship reliable product experiences with a strong technical foundation.
          </p>
          <div className="flex flex-wrap gap-5 label">
            <a href="mailto:melvinvenk707@gmail.com" className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/40">
              melvinvenk707@gmail.com
            </a>
            <a href="tel:+917022224871" className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/40">
              +91 7022224871
            </a>
            <span className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-white/60">
              Bangalore, Karnataka, India
            </span>
            <Link href="/resume" className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/40">
              View résumé
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.22)]">
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

      <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <h2 className="heading-3">Send a message</h2>
          <p className="body-sm muted">
            Share a brief note and I&apos;ll follow up when I can.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-3">
              <span className="label text-white">Name</span>
              <input
                required
                name="name"
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="rounded-2xl border border-white/20 bg-black/40 px-5 py-3 body-sm text-white outline-none placeholder:text-white/50 transition-all focus:border-white/40 focus:bg-black/50"
                placeholder="Your name"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="label text-white">Email</span>
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="rounded-2xl border border-white/20 bg-black/40 px-5 py-3 body-sm text-white outline-none placeholder:text-white/50 transition-all focus:border-white/40 focus:bg-black/50"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="flex flex-col gap-3">
            <span className="label text-white">Message</span>
            <textarea
              required
              name="message"
              rows={6}
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              className="rounded-2xl border border-white/20 bg-black/40 px-5 py-3 body-sm text-white outline-none placeholder:text-white/50 transition-all focus:border-white/40 focus:bg-black/50"
              placeholder="Tell me what you’re building..."
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-text rounded-full border border-white/30 bg-white/5 px-6 py-3 text-white transition-all duration-200 hover:bg-white/10 hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </button>

            {status !== "idle" ? (
              <p className={`body-sm ${status === "success" ? "text-white" : "muted"}`}>
                {feedback}
              </p>
            ) : null}
          </div>
        </form>
      </section>
    </main>
  );
}
