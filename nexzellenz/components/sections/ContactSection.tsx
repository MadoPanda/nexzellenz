"use client";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CONTACT = {
  phone: "+91 XXXXX XXXXX",
  email: "info@nexzellenz.com",
  address: "India — Pan-India Delivery",
  hours: "Mon–Sat: 09:00–19:00 IST",
};

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setStatus("sending");

  const formData = new FormData(e.currentTarget);

  const data = {
    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!,

    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    message: formData.get("message"),

    subject: "New Project Inquiry - Nexzellenz",
    from_name: "Nexzellenz Website",
    replyto: formData.get("email"),
    botcheck: "",
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } else {
      console.error(result);
      setStatus("error");
    }
  } catch (error) {
    console.error(error);
    setStatus("error");
  }
}

  const inputStyle: React.CSSProperties = {
    background: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    padding: "12px 14px",
    fontFamily: "'Syne',sans-serif",
    fontSize: "clamp(13px,1.5vw,14px)",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s",
    borderRadius: 0,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: "clamp(9px,1.2vw,10px)",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    color: "var(--text-muted)",
    display: "block",
    marginBottom: "6px",
  };

  const onFocus = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => (e.target.style.borderColor = "var(--accent)");
  
  const onBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => (e.target.style.borderColor = "var(--border)");

  const contactItems = [
    {
      label: "Phone",
      value: CONTACT.phone,
      icon: (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91A16 16 0 0 0 15 15.91l1.27-.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      ),
    },
    {
      label: "Email",
      value: CONTACT.email,
      icon: (
        <>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </>
      ),
    },
    {
      label: "Location",
      value: CONTACT.address,
      icon: (
        <>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="section-py relative z-10"
      style={{ background: "var(--bg2)" }}
    >
      <div className="container-x">
        <ScrollReveal className="text-center mb-10 sm:mb-14">
          <p className="section-label justify-center">Contact Us</p>
          <h2
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(40px,6vw,80px)",
              letterSpacing: "2px",
              lineHeight: 0.95,
              color: "var(--text)",
            }}
          >
            START YOUR PROJECT
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-16">
          <ScrollReveal className="md:col-span-2 flex flex-col gap-6 sm:gap-8">
            <div>
              <h3
                className="font-bold mb-2"
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "clamp(16px,2vw,20px)",
                  color: "var(--text)",
                }}
              >
                Get in Touch
              </h3>
              <p
                style={{
                  fontSize: "clamp(12px,1.4vw,14px)",
                  lineHeight: 1.75,
                  color: "var(--text-muted)",
                }}
              >
                Ready to bring your idea to life? Share your project details and
                our team responds within 2 business hours.
              </p>
            </div>
            {contactItems.map((c) => (
              <div key={c.label} className="flex gap-3 sm:gap-4 items-start">
                <div
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    background: "var(--border-soft)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  >
                    {c.icon}
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: "clamp(8px,1vw,10px)",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginBottom: "3px",
                    }}
                  >
                    {c.label}
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(12px,1.4vw,14px)",
                      color: "var(--text)",
                      fontWeight: 500,
                    }}
                  >
                    {c.value}
                  </p>
                </div>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={1} className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="John"
                    required
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Service Required</label>
                <select
                  name="service"
                  style={{ ...inputStyle, appearance: "none" }}
                  onFocus={onFocus}
                  onBlur={onBlur}
                >
                  <option value="">Select a service...</option>
                  {[
                    "SLA 3D Printing",
                    "FDM 3D Printing",
                    "3D Modeling & Design",
                    "Rapid Prototyping",
                    "Post Processing",
                    "Other / Consultation",
                  ].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Project Description</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Describe your project — dimensions, quantity, material preferences, intended use..."
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "100px",
                  }}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="font-bold uppercase transition-all duration-300"
                style={{
                  padding: "clamp(12px,1.5vw,16px) clamp(24px,3vw,36px)",
                  background: status === "sent" ? "#00b894" : "var(--accent)",
                  color: "var(--bg)",
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "clamp(12px,1.4vw,14px)",
                  letterSpacing: "1px",
                  border: "none",
                  opacity: status === "sending" ? 0.7 : 1,
                  width: "100%",
                  cursor:
                    status === "sending" || status === "sent"
                      ? "default"
                      : "pointer",
                }}
              >
                {status === "idle" && "Send Project Brief →"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "✓ Message Sent! We'll contact you soon."}
                {status === "error" && "Try Again →"}
              </button>
              {status === "error" && (
                <p
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 12,
                    color: "var(--accent2)",
                  }}
                >
                  Something went wrong. Please email us directly at{" "}
                  {CONTACT.email}
                </p>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}