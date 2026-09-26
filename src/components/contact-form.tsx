"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(formData: FormData) {
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "Portfolio enquiry");
    const message = String(formData.get("message") || "");
    const body = `Hi Omar,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
    setSent(true);
    window.location.href = `mailto:orezk337@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form action={submit} className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
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
        Send message <Send className="size-4" />
      </Button>
      {sent ? <p className="mt-4 text-sm text-muted-foreground">Your email app should open with the message ready to send.</p> : null}
    </form>
  );
}
