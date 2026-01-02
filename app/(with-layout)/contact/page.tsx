"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { z } from "zod";
import { sendEmail } from "@/app/actions";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await sendEmail(formData);
      if (response.success) {
        toast.success("Message sent!", {
          description: "We will get back to you soon."
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        toast.error("Submission failed", {
          description: response.error || "Failed to send message. Please try again."
        });
      }
    } catch (error) {
      toast.error("Unexpected error", { description: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="min-h-screen bg-rosegold/25 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="max-w-3xl w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl"
        variants={itemVariants}
      >
        <motion.div className="text-center mb-10" variants={itemVariants}>
          <h1 className="text-4xl font-serif text-stone-800 mb-4">Get in Touch</h1>
          <p className="text-stone-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={itemVariants}>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-stone-700">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`bg-stone-50 border-stone-200 focus:border-stone-400 focus:ring-stone-400 ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-stone-700">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className={`bg-stone-50 border-stone-200 focus:border-stone-400 focus:ring-stone-400 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="subject" className="text-stone-700">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="What is this regarding?"
              value={formData.subject}
              onChange={handleChange}
              required
                className={`bg-stone-50 border-stone-200 focus:border-stone-400 focus:ring-stone-400 ${errors.subject ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
            />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="message" className="text-stone-700">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message here..."
              value={formData.message}
              onChange={handleChange}
              required
                className={`min-h-[150px] bg-stone-50 border-stone-200 focus:border-stone-400 focus:ring-stone-400 ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
            />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white py-6 text-lg font-medium tracking-wide transition-all disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}