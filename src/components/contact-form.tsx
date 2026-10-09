"use client";

import { useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");

  function prepare() {
    const formData = new FormData(form.current!);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "Portfolio enquiry");
    const message = String(formData.get("message") || "");
    const body = `Hi Omar,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
    const text = `To: orezk337@gmail.com\nSubject: ${subject}\n\n${body}`;
    setDraft(text);
    return { subject, body, text };
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { subject, body } = prepare();
    setStatus("Opening your email app. Review and send there; this website has not sent a message.");
    window.location.href = `mailto:orezk337@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function copyDraft() {
    if (!form.current?.reportValidity()) return;
    const { text } = prepare();
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Draft copied. Paste it into your email app and send to orezk337@gmail.com.");
    } catch {
      setStatus("Copy is unavailable. Select and copy the draft below manually.");
    }
  }

  return (
    <form ref={form} onSubmit={submit} className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
      <p className="mb-6 text-sm leading-6 text-muted-foreground">This form prepares an email in your own email app; it does not send a message from the website. You can also copy your draft or email <a className="underline" href="mailto:orezk337@gmail.com">orezk337@gmail.com</a> directly.</p>
      <noscript><p className="mb-4">JavaScript is needed to prepare a draft. Please use the direct email link above.</p></noscript>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Name
          <Input name="name" required placeholder="Your name" className="h-12 rounded-xl bg-background" />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Email
          <Input name="email" required type="email" placeholder="you@company.com" className="h-12 rounded-xl bg-background" />
        </label>
      </div>
      <label className="mt-5 block space-y-2 text-sm font-medium">
        Subject
        <Input name="subject" required placeholder="What would you like to discuss?" className="h-12 rounded-xl bg-background" />
      </label>
      <label className="mt-5 block space-y-2 text-sm font-medium">
        Message
        <Textarea name="message" required placeholder="Tell me about the role, project, or data challenge." className="min-h-40 rounded-xl bg-background" />
      </label>
      <Button type="submit" className="mt-6 h-12 w-full rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/15 hover:opacity-90 sm:w-auto sm:px-7">
        Open email app <Send className="size-4" />
      </Button>
      <Button type="button" variant="outline" onClick={copyDraft} className="mt-3 h-12 w-full rounded-xl sm:ml-3 sm:w-auto">Copy message</Button>
      <p role="status" className="mt-4 text-sm text-muted-foreground">{status}</p>
      {draft && <label className="mt-4 block text-sm">Prepared email (select to copy)<Textarea readOnly value={draft} className="mt-2 min-h-48" /></label>}
    </form>
  );
}
