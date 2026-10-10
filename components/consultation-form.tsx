"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/ui/button";
import { track } from "@/lib/fbpixel";

interface ConsultationFormProps {
  showAnimations?: boolean;
}

export function ConsultationForm({ 
  showAnimations = true 
}: ConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);
    const contact = formData.get("contact") as string;
    // Check if contact looks like an email (contains @) or phone
    const isEmail = contact.includes("@");
    const data = {
      name: formData.get("name") as string,
      phone: isEmail ? "" : contact,
      email: isEmail ? contact : "",
      message: formData.get("message") as string,
      interest: formData.get("interest") as string,
      intent: formData.get("intent") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Vaš upit je uspešno poslat. Javićemo Vam se uskoro.",
        });
        (e.target as HTMLFormElement).reset();
        // Track Lead event after successful form submission
        track("Lead");
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Došlo je do greške pri slanju poruke. Molimo pokušajte ponovo.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Došlo je do greške pri slanju poruke. Molimo pokušajte ponovo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const MotionWrapper = showAnimations ? motion.div : "div";
  const motionProps = showAnimations
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
      }
    : {};

  return (
    <div className="space-y-6" style={{ height: "auto", overflow: "visible" }}>
      <p className="text-text-secondary text-sm md:text-base text-center">
        Pošaljite nam poruku i odgovorićemo u najkraćem roku.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <MotionWrapper
            {...(showAnimations ? { ...motionProps, transition: { duration: 0.6, delay: 0.1 } } : {})}
          >
            <label htmlFor="contact-form-name" className="block text-text-secondary text-base font-medium mb-2">
              Ime i prezime <span className="text-text-muted">*</span>
            </label>
            <input
              type="text"
              id="contact-form-name"
              name="name"
              required
              disabled={isSubmitting}
              className="field-surface w-full px-4 py-3 placeholder:text-text-muted"
              placeholder="Vaše ime"
            />
          </MotionWrapper>

          {/* Phone or Email */}
          <MotionWrapper
            {...(showAnimations ? { ...motionProps, transition: { duration: 0.6, delay: 0.2 } } : {})}
          >
            <label htmlFor="contact-form-contact" className="block text-text-secondary text-base font-medium mb-2">
              Telefon ili email <span className="text-text-muted">*</span>
            </label>
            <input
              type="text"
              id="contact-form-contact"
              name="contact"
              required
              disabled={isSubmitting}
              className="field-surface w-full px-4 py-3 placeholder:text-text-muted"
              placeholder="Vaš broj telefona ili email adresa"
            />
          </MotionWrapper>

          {/* Interest */}
          <MotionWrapper
            {...(showAnimations ? { ...motionProps, transition: { duration: 0.6, delay: 0.3 } } : {})}
          >
            <label htmlFor="contact-form-interest" className="block text-text-secondary text-base font-medium mb-2">
              Interesovanje <span className="text-text-muted">*</span>
            </label>
            <div className="relative">
              <select
                id="contact-form-interest"
                name="interest"
                required
                disabled={isSubmitting}
                className="field-surface w-full px-4 py-3 pr-10 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23C9A24D' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '12px',
                }}
              >
                <option value="">Izaberite oblast koja vas zanima</option>
                <option value="facial-rejuvenation">Podmlađivanje lica</option>
                <option value="body-rejuvenation">Podmlađivanje tela</option>
                <option value="not-sure">Nisam siguran / treba mi savet</option>
              </select>
            </div>
          </MotionWrapper>

          {/* User Intent - Radio Group */}
          <MotionWrapper
            {...(showAnimations ? { ...motionProps, transition: { duration: 0.6, delay: 0.4 } } : {})}
          >
            <fieldset className="space-y-3">
              <legend className="block text-text-secondary text-base font-medium mb-3">
                Šta biste želeli da uradite? <span className="text-text-muted">*</span>
              </legend>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="intent"
                    value="question"
                    required
                    disabled={isSubmitting}
                    className="consultation-radio"
                  />
                  <span className="text-text-secondary text-base group-hover:text-text-primary transition-colors duration-250 ease-out">
                    Želim da postavim pitanje
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="intent"
                    value="consultation"
                    required
                    disabled={isSubmitting}
                    className="consultation-radio"
                  />
                  <span className="text-text-secondary text-base group-hover:text-text-primary transition-colors duration-250 ease-out">
                    Želim da zakažem besplatne konsultacije
                  </span>
                </label>
              </div>
            </fieldset>
          </MotionWrapper>

          {/* Message */}
          <MotionWrapper
            {...(showAnimations ? { ...motionProps, transition: { duration: 0.6, delay: 0.5 } } : {})}
          >
            <label htmlFor="contact-form-message" className="block text-text-secondary text-base font-medium mb-2">
              Poruka <span className="text-text-muted">(opciono)</span>
            </label>
            <textarea
              id="contact-form-message"
              name="message"
              rows={4}
              disabled={isSubmitting}
              className="field-surface w-full px-4 py-3 placeholder:text-text-muted resize-none"
              placeholder="Opišite ukratko šta vas zanima ili koji problem želite da rešite"
            />
          </MotionWrapper>

          {/* Submit Status */}
          {submitStatus.type && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              role="alert"
              aria-live="polite"
              className={`p-4 rounded-xl ${
                submitStatus.type === "success"
                  ? "bg-navy-800/30 border border-accent-sage/30 text-text-primary"
                  : "bg-navy-800/30 border border-red-500/30 text-text-primary"
              }`}
            >
              <p className="text-base">{submitStatus.message}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <MotionWrapper
            {...(showAnimations ? { ...motionProps, transition: { duration: 0.6, delay: 0.6 } } : {})}
            className="pt-2 flex justify-center"
          >
            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto px-8 py-3 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Šalje se..." : "Pošalji upit"}
            </Button>
          </MotionWrapper>

          {/* Trust Line */}
          <MotionWrapper
            {...(showAnimations ? { ...motionProps, transition: { duration: 0.6, delay: 0.7 } } : {})}
            className="text-text-muted text-sm text-center"
          >
            <p>Diskretno • Bez obaveze • Individualan pristup</p>
          </MotionWrapper>
      </form>
    </div>
  );
}
