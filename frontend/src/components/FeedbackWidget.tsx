"use client";

import { useState, useCallback } from "react";

interface FeedbackData {
  type: "bug" | "feature" | "general";
  message: string;
  email?: string;
  url: string;
  timestamp: string;
}

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"bug" | "feature" | "general">("general");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);

    const feedback: FeedbackData = {
      type,
      message: message.trim(),
      email: email.trim() || undefined,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    // Store in localStorage (persistent feedback log)
    const existing = JSON.parse(localStorage.getItem("cargonode_feedback") || "[]");
    existing.push(feedback);
    localStorage.setItem("cargonode_feedback", JSON.stringify(existing));

    // Brief delay for UX
    await new Promise((r) => setTimeout(r, 500));

    setSubmitted(true);
    setSubmitting(false);
    setMessage("");
    setEmail("");

    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
    }, 2000);
  }, [type, message, email]);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center text-2xl"
        aria-label="Send feedback"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Feedback panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-primary text-white px-4 py-3">
            <h3 className="font-semibold">Send Feedback</h3>
            <p className="text-xs text-blue-100">Help us improve CargoNode</p>
          </div>

          {submitted ? (
            <div className="p-6 text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="font-medium text-secondary">Thank you!</p>
              <p className="text-sm text-gray-500 mt-1">Your feedback has been recorded.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              {/* Type selector */}
              <div className="flex gap-2">
                {(["bug", "feature", "general"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      type === t
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {t === "bug" ? "🐛 Bug" : t === "feature" ? "✨ Feature" : "💬 General"}
                  </button>
                ))}
              </div>

              {/* Message */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  type === "bug"
                    ? "Describe the bug..."
                    : type === "feature"
                    ? "What feature would you like?"
                    : "Share your thoughts..."
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={3}
                required
              />

              {/* Email (optional) */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || !message.trim()}
                className="w-full py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send Feedback"}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
