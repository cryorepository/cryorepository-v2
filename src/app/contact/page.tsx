import type { Metadata } from "next"

import { contactMetadata } from "@/lib/seo"
import Enterprise from "./import"

export const metadata: Metadata = contactMetadata;

export default function Search() {
  return (
    <>

      <Enterprise />

      <style>{`
        footer{
          display: none;
        }
      `}</style>
    </>
  );
}