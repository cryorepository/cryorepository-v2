import type { Metadata } from "next"

import { contactMetadata } from "@/lib/seo"
import ContactPage from "@/components/contactComponents/contact-page";

export const metadata: Metadata = contactMetadata;

export default function Contact() {
  return (
    <>
      <ContactPage />

      <style>{`
        footer{
          display: none;
        }
      `}</style>
    </>
  );
}