"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/ui/button";

interface ConsultationFormProps {
  calendlyContainerId?: string;
  showAnimations?: boolean;
}

export function ConsultationForm({ 
  calendlyContainerId = "calendly-container",
  showAnimations = true 
}: ConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<string>("");
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [calendlyError, setCalendlyError] = useState(false);
  const calendlyInitialized = useRef(false);
  const retryCountRef = useRef(0);

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

  const handleIntentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIntent(e.target.value);
  };

  // Initialize Calendly with retry logic
  useEffect(() => {
    // Only initialize when consultation option is selected
    if (selectedIntent !== "consultation") {
      calendlyInitialized.current = false;
      retryCountRef.current = 0;
      setCalendlyError(false);
      return;
    }

    // Reset error state when intent changes
    setCalendlyError(false);

    const initializeCalendly = (attempt: number = 1): void => {
      const maxRetries = 5;
      const retryDelay = 500; // 500ms between retries

      // Check if script is loaded
      if (typeof window === "undefined" || !(window as any).Calendly) {
        if (attempt <= maxRetries) {
          setTimeout(() => initializeCalendly(attempt + 1), retryDelay);
        } else {
          setCalendlyError(true);
        }
        return;
      }

      // Check if container exists
      const container = document.getElementById(calendlyContainerId);
      if (!container) {
        if (attempt <= maxRetries) {
          setTimeout(() => initializeCalendly(attempt + 1), retryDelay);
        } else {
          setCalendlyError(true);
        }
        return;
      }

      // Guard against double-init
      if (calendlyInitialized.current || container.querySelector(".calendly-inline-widget")) {
        return;
      }

      try {
        (window as any).Calendly.initInlineWidget({
          url: "https://calendly.com/andrejmilovanovic267/free-app-discuss-zoom-call",
          parentElement: container,
        });
        calendlyInitialized.current = true;
        retryCountRef.current = 0;
      } catch (error) {
        console.error("Calendly initialization error:", error);
        if (attempt <= maxRetries) {
          setTimeout(() => initializeCalendly(attempt + 1), retryDelay);
        } else {
          setCalendlyError(true);
        }
      }
    };

    // Start initialization with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      initializeCalendly();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedIntent, calendlyContainerId]);

  const MotionWrapper = showAnimations ? motion.div : "div";
  const motionProps = showAnimations
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
      }
    : {};

  return (
    <form onSubmit={handleSubmit} className="space-y-6" style={{ height: "auto", overflow: "visible" }}>
      {/* Name */}
      <MotionWrapper
        {...(showAnimations ? { ...motionProps, transition: { duration: 0.6, delay: 0.1 } } : {})}
      >
        <label htmlFor={`${calendlyContainerId}-name`} className="block text-text-secondary text-base font-medium mb-2">
          Ime i prezime <span className="text-text-muted">*</span>
        </label>
        <input
          type="text"
          id={`${calendlyContainerId}-name`}
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
        <label htmlFor={`${calendlyContainerId}-contact`} className="block text-text-secondary text-base font-medium mb-2">
          Telefon ili email <span className="text-text-muted">*</span>
        </label>
        <input
          type="text"
          id={`${calendlyContainerId}-contact`}
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
        <label htmlFor={`${calendlyContainerId}-interest`} className="block text-text-secondary text-base font-medium mb-2">
          Interesovanje <span className="text-text-muted">*</span>
        </label>
        <div className="relative">
          <select
            id={`${calendlyContainerId}-interest`}
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
                onChange={handleIntentChange}
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
                onChange={handleIntentChange}
                className="consultation-radio"
              />
              <span className="text-text-secondary text-base group-hover:text-text-primary transition-colors duration-250 ease-out">
                Želim da zakažem besplatne konsultacije
              </span>
            </label>
          </div>
        </fieldset>
      </MotionWrapper>

      {/* Calendly Widget - Conditional Render */}
      <AnimatePresence>
        {selectedIntent === "consultation" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1],
              ...(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? { duration: 0 }
                : {})
            }}
            className="overflow-visible"
            aria-live="polite"
            aria-label="Calendly booking widget"
          >
            <div className="mt-6 pt-6 border-t border-[#C9A24D]/30">
              {/* Gold accent line */}
              <div className="h-[1px] bg-[#C9A24D] mb-6 w-full"></div>
              
              {/* Calendly wrapper */}
              <div 
                id={calendlyContainerId}
                className="relative rounded-2xl overflow-hidden bg-navy-900/20 backdrop-blur-sm border border-white/5 p-4 md:p-6 w-full"
                style={{
                  height: "900px",
                  minHeight: "900px",
                }}
                role="region"
                aria-label="Calendar booking"
              />
              {/* Fallback link if Calendly fails to load */}
              {calendlyError && (
                <div className="mt-4 text-center">
                  <a
                    href="https://calendly.com/andrejmilovanovic267/free-app-discuss-zoom-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C9A24D] hover:text-[#D4AF37] underline transition-colors duration-250"
                  >
                    Otvori stranicu za zakazivanje
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message */}
      <MotionWrapper
        {...(showAnimations ? { ...motionProps, transition: { duration: 0.6, delay: 0.5 } } : {})}
      >
        <label htmlFor={`${calendlyContainerId}-message`} className="block text-text-secondary text-base font-medium mb-2">
          Poruka <span className="text-text-muted">(opciono)</span>
        </label>
        <textarea
          id={`${calendlyContainerId}-message`}
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
  );
}
