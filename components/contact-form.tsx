"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/ui/button";

export function ContactForm() {
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
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <label htmlFor="name" className="block text-text-secondary text-base font-medium mb-2">
          Ime i prezime
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-xl glass-premium border border-white/6 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/10 transition-all duration-300 bg-navy-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Vaše ime i prezime"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <label htmlFor="phone" className="block text-text-secondary text-base font-medium mb-2">
          Broj telefona
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-xl glass-premium border border-white/6 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/10 transition-all duration-300 bg-navy-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Vaš broj telefona"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <label htmlFor="email" className="block text-text-secondary text-base font-medium mb-2">
          Email adresa
        </label>
        <input
          type="email"
          id="email"
          name="email"
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-xl glass-premium border border-white/6 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/10 transition-all duration-300 bg-navy-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Vaša email adresa (opciono)"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <label htmlFor="message" className="block text-text-secondary text-base font-medium mb-2">
          Poruka (opciono)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-xl glass-premium border border-white/6 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/10 transition-all duration-300 bg-navy-900/30 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Napišite nam šta Vas najviše zanima (opciono)"
        />
      </motion.div>

      {submitStatus.type && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl ${
            submitStatus.type === "success"
              ? "bg-navy-800/30 border border-accent-sage/30 text-text-primary"
              : "bg-navy-800/30 border border-red-500/30 text-text-primary"
          }`}
        >
          <p className="text-base font-light">{submitStatus.message}</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="pt-2"
      >
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Šalje se..." : "Pošalji upit"}
        </Button>
      </motion.div>
    </form>
  );
}
