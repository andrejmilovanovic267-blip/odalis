"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/ui/button";
import { track } from "@/lib/fbpixel";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: "",
      interest: formData.get("interest") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Vaš upit je uspešno poslat. Javićemo Vam se uskoro.",
        });
        form.reset();
        track("Lead");
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Došlo je do greške pri slanju poruke. Molimo pokušajte ponovo.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Došlo je do greške pri slanju poruke. Molimo pokušajte ponovo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
      <div>
        <label htmlFor="inquiry-name" className="mb-2 block text-sm font-medium text-text-secondary">
          Ime i prezime <span className="text-[#C9A24D]">*</span>
        </label>
        <input
          id="inquiry-name"
          name="name"
          type="text"
          required
          disabled={isSubmitting}
          autoComplete="name"
          placeholder="Vaše ime i prezime"
          className="field-surface w-full px-4 py-3 placeholder:text-text-muted"
        />
      </div>

      <div>
        <label htmlFor="inquiry-phone" className="mb-2 block text-sm font-medium text-text-secondary">
          Broj telefona <span className="text-[#C9A24D]">*</span>
        </label>
        <input
          id="inquiry-phone"
          name="phone"
          type="tel"
          required
          disabled={isSubmitting}
          autoComplete="tel"
          placeholder="+381 6X XXX XXXX"
          className="field-surface w-full px-4 py-3 placeholder:text-text-muted"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="inquiry-interest" className="mb-2 block text-sm font-medium text-text-secondary">
          Koji tretmani vas zanimaju? <span className="text-[#C9A24D]">*</span>
        </label>
        <select
          id="inquiry-interest"
          name="interest"
          required
          disabled={isSubmitting}
          defaultValue=""
          className="field-surface w-full cursor-pointer appearance-none px-4 py-3 pr-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23C9A24D' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "12px",
          }}
        >
          <option value="" disabled>Izaberite oblast koja vas zanima</option>
          <option value="facial-rejuvenation">Tretmani lica</option>
          <option value="body-rejuvenation">Tretmani tela</option>
          <option value="not-sure">Nisam sigurna/siguran — potrebna mi je preporuka</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="inquiry-message" className="mb-2 block text-sm font-medium text-text-secondary">
          Vaše pitanje ili napomena <span className="text-text-muted">(opciono)</span>
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={4}
          disabled={isSubmitting}
          placeholder="Recite nam nešto više o svojim željama ili pitanjima..."
          className="field-surface w-full resize-y px-4 py-3 placeholder:text-text-muted"
        />
      </div>

      {submitStatus.type && (
        <div
          role="alert"
          aria-live="polite"
          className={`rounded-xl border p-4 text-sm sm:col-span-2 ${
            submitStatus.type === "success"
              ? "border-accent-sage/30 bg-navy-800/30 text-text-primary"
              : "border-red-500/30 bg-navy-800/30 text-text-primary"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="space-y-3 pt-1 sm:col-span-2">
        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Šalje se..." : "Pošaljite upit"}
        </Button>
        <p className="text-center text-sm leading-relaxed text-text-muted">
          Naš tim će vas kontaktirati kako bismo razgovarali o vašim potrebama.
        </p>
      </div>
    </form>
  );
}
