import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contact, rooms } from "@/data/content";
import { dateToEpochDay, nextDay, nightsBetween, todayLocal } from "@/lib/dates";
import { supabase } from "@/integrations/supabase/client";
import { btnClass } from "./ui";
import { cn } from "@/lib/utils";

export type BookingPrefill = { room?: string | undefined; in?: string | undefined; out?: string | undefined; guests?: number | undefined };

const field = "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary";
const lab = "eyebrow mb-1 block text-[0.6rem] text-muted-foreground";

export function BookingForm({ prefill = {} }: { prefill?: BookingPrefill }) {
  const preset = rooms.find((r) => r.id === prefill.room);
  const today = todayLocal();
  const validIn = prefill.in && dateToEpochDay(prefill.in) !== null && prefill.in >= today ? prefill.in : "";
  const validOut = validIn && prefill.out && nightsBetween(validIn, prefill.out) > 0 ? prefill.out : "";
  const empty = { full_name: "", email: "", phone: "", check_in: validIn, check_out: validOut, guests: Math.max(1, Math.min(prefill.guests ?? 2, preset?.guests ?? 4)), room: preset?.id ?? "", message: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const set = (k: keyof typeof empty, v: string | number) => setForm((f) => ({ ...f, [k]: v }));
  const selectedRoom = rooms.find((r) => r.id === form.room);
  const maxGuests = selectedRoom?.guests ?? 4;
  const nights = nightsBetween(form.check_in, form.check_out);

  const emailDraft = `mailto:${contact.email}?subject=${encodeURIComponent("Availability enquiry - Archontiko Tsikari")}&body=${encodeURIComponent(
    [`Name: ${form.full_name}`, `Email: ${form.email}`, `Phone: ${form.phone || "Not provided"}`, `Studio: ${selectedRoom?.name || "No preference"}`, `Check-in: ${form.check_in || "To be confirmed"}`, `Check-out: ${form.check_out || "To be confirmed"}`, `Guests: ${Math.min(form.guests, maxGuests)}`, "", form.message].join("\n"),
  )}`;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.check_in < todayLocal() || nights < 1) return setError("Please choose a check-out date after your check-in date.");
    setStatus("sending");
    const payload = {
      full_name: form.full_name.trim(), email: form.email.trim(), phone: form.phone.trim() || null,
      check_in: form.check_in, check_out: form.check_out, guests: Math.min(form.guests, maxGuests),
      room: form.room || null, message: form.message.trim() || null,
    };
    let err: unknown = null;
    const hook = import.meta.env["VITE_BOOKING_WEBHOOK_URL"] as string | undefined;
    if (hook) {
      try {
        // text/plain keeps this a "simple" request so Google Apps Script accepts it without CORS preflight
        const res = await fetch(hook, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ ...payload, room: selectedRoom?.name ?? null, nights }) });
        const out = await res.json().catch(() => ({ ok: res.ok }));
        if (!out.ok) err = out.error ?? "failed";
      } catch (e) { err = e; }
    } else {
      ({ error: err } = await supabase.from("booking_inquiries").insert(payload));
    }
    if (err) {
      setStatus("idle");
      setError("Your request was not submitted. Please try again or use the prepared email option below.");
    } else setStatus("sent");
  };

  if (status === "sent")
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 py-12 text-center duration-700">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" strokeWidth={1} />
        <h3 className="mt-6 text-5xl">Thank you, {form.full_name.split(" ")[0]}</h3>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Your request for {nights} night{nights > 1 ? "s" : ""} has reached us. We will reply to {form.email} with availability and rates shortly.
        </p>
        <button onClick={() => { setForm(empty); setStatus("idle"); }} className={cn(btnClass("outline"), "mt-10")}>Send another request</button>
      </div>
    );

  return (
    <form onSubmit={submit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <label className="sm:col-span-2"><span className={lab}>Studio</span>
        <select value={form.room} onChange={(e) => set("room", e.target.value)} className={field}>
          <option value="">No preference</option>
          {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </label>
      <label><span className={lab}>Check-in</span>
        <input type="date" required min={today} value={form.check_in} onChange={(e) => { const v = e.target.value; setForm((c) => ({ ...c, check_in: v, check_out: c.check_out && c.check_out <= v ? "" : c.check_out })); }} className={field} />
      </label>
      <label><span className={lab}>Check-out</span>
        <input type="date" required min={nextDay(form.check_in || today)} value={form.check_out} onChange={(e) => set("check_out", e.target.value)} className={field} />
      </label>
      <label><span className={lab}>Full name</span>
        <input required maxLength={120} value={form.full_name} onChange={(e) => set("full_name", e.target.value)} className={field} placeholder="Your name" />
      </label>
      <label><span className={lab}>Guests</span>
        <select value={Math.min(form.guests, maxGuests)} onChange={(e) => set("guests", Number(e.target.value))} className={field}>
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
      <label><span className={lab}>Email</span>
        <input type="email" required maxLength={200} value={form.email} onChange={(e) => set("email", e.target.value)} className={field} placeholder="you@example.com" />
      </label>
      <label><span className={lab}>Phone</span>
        <input maxLength={40} value={form.phone} onChange={(e) => set("phone", e.target.value)} className={field} placeholder="Optional" />
      </label>
      <label className="sm:col-span-2"><span className={lab}>Message</span>
        <textarea rows={3} maxLength={2000} value={form.message} onChange={(e) => set("message", e.target.value)} className={cn(field, "resize-none")} placeholder="Arrival time, special requests…" />
      </label>
      {nights > 0 && <p className="eyebrow text-primary sm:col-span-2">{nights} night{nights > 1 ? "s" : ""} selected</p>}
      {error && <p role="alert" className="text-sm text-destructive sm:col-span-2">{error}</p>}
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className={cn(btnClass("solid"), "disabled:opacity-60")}>
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />} Send request
        </button>
        <a href={emailDraft} className="link-line text-sm text-muted-foreground">or send by email</a>
      </div>
    </form>
  );
}
