"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitClickCount, setSubmitClickCount] = useState(0);
  const [formFilled, setFormFilled] = useState(false);

  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      if (!formFilled) {
        setFormFilled(true);
        window.gtag?.("event", "form_filled", {
          event_category: "Form",
          event_label: "User started filling the form",
        });
      }
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitClickCount((prev) => prev + 1);

    if (submitClickCount === 0) {
      window.gtag?.("event", "submit_clicked", {
        event_category: "Form",
        event_label: "User submitted the form",
      });
    } else {
      window.gtag?.("event", "submit_multiple_clicks", {
        event_category: "Form",
        event_label: `User clicked submit ${submitClickCount + 1} times`,
      });
    }

    setIsOpen(false);
  };

  return (
    <>
      <Head>
        <title>Next.js Popup Form</title>
        <meta name="description" content="A simple Next.js popup form with multi-step functionality." />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXX');
            `,
          }}
        />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Open Popup
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              {step === 1 && (
                <>
                  <h2 className="text-xl font-bold">Step 1: Enter Details</h2>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 p-2 w-full border rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 p-2 w-full border rounded"
                  />
                  <button
                    onClick={() => setStep(2)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Next
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-xl font-bold">Step 2: Your Message</h2>
                  <textarea
                    name="message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 p-2 w-full border rounded"
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
