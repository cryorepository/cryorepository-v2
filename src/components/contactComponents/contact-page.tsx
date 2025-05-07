"use client";

import { useState } from "react";
import Turnstile, { useTurnstile } from "react-turnstile";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const turnstile = useTurnstile();
  const [firstName, setFirstName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successScreen, setSuccess] = useState(true);
  const siteKey = process.env.NEXT_PUBLIC_SITEKEY as string;
    
  if (!siteKey) {
    throw new Error('Missing NEXT_PUBLIC_SITEKEY environment variable');
  }
  

  const handleSubmit = async (event: React.FormEvent) => {
    setSubmitDisabled(true);
    event.preventDefault();

    try {
      const payload = {
        cloudflare_turnstile: turnstileToken,
        first_name: firstName,
        organisation: organisation,
        email: email,
        user_message: userMessage,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setSubmitDisabled(false);

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setSuccess(false);
        setFirstName("");
        setOrganisation("");
        setEmail("");
        setUserMessage("");
      } else {
        turnstile.reset();
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        setErrorMessage(errorData.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-128px)] bg-[url('/assets/glass_effect.png')] bg-cover bg-no-repeat flex items-center justify-center px-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between">
        {/* Left Section - Hidden on Mobile */}
        <div className="hidden md:flex flex-col flex-1 max-w-md">
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-4xl">
                Contact Us
              </CardTitle>
              <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                Email or complete the form to learn how our we
                can assist your research needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:contact@cryorepository.com"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                contact@cryorepository.com
              </a>
              <div className="flex flex-col sm:flex-row gap-4 mt-6 px-0">
                <div className="flex-1 bg-transparent border-none shadow-none">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Tailored Solutions
                    </h2>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We specialize in providing information solutions that are
                      tailored to your specific needs. We understand that every
                      organization is unique, and therefore requires customized
                      approaches.
                    </p>
                  </div>
                </div>
                <div className="flex-1 bg-transparent border-none shadow-none">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Working Together
                    </h2>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We&apos;re here to support your cryopreservation research. 
                      Whether you need data, integration options, or have questions, 
                      reach out—let&apos;s advance the science together.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Form or Success Message */}
        <Card className="flex-1 max-w-md w-full shadow-lg">
          {successScreen ? (
            <div>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {errorMessage && (
                    <p className="text-sm">{errorMessage}</p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="text"
                      placeholder="First Name"
                      required
                      maxLength={100}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="text"
                      placeholder="Organisation"
                      maxLength={100}
                      value={organisation}
                      onChange={(e) => setOrganisation(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <div className="relative items-center border rounded-md">
                      <Mail height={16} width={16} className="absolute ml-1 left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      maxLength={100}
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9"
                    />
                  </div>
                  <Textarea
                    placeholder="How we can help?"
                    maxLength={500}
                    required
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    className="resize-none h-24"
                  />
                  <div className="flex justify-center">
                    <Turnstile
                      sitekey={siteKey}
                      theme="light"
                      onVerify={(token) => {
                        setTurnstileToken(token);
                        setSubmitDisabled(false);
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitDisabled}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Submit
                  </Button>
                </form>
              </CardContent>
            </div>
          ) : (
            <div>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                  Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground mt-4 text-center">
                  We have received your message and will reply promptly.
                </p>
              </CardContent>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}