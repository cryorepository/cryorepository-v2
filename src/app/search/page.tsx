import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowBigRightDash } from "lucide-react"

import { SearchBox } from "@/components/searchComponents/search-box";

export const metadata: Metadata = {
  title: 'Search CryoRepository - Discover Cryopreservation | Cryo Repo',
  description: 'Your source of information on cryoprotective agents.',
  alternates: {
    canonical: 'https://www.cryorepository.com/search',
  },
  openGraph: {
    siteName: 'CryoRepository',
    title: 'Search CryoRepository - Discover Cryopreservation',
    description: 'Your source of information on cryoprotective agents.',
    images: [
      {
        url: '/favicon.png',
        width: 500,
        height: 500,
        alt: 'CryoRepository preview image',
      },
    ],
    url: 'https://www.cryorepository.com/search',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search CryoRepository - Discover Cryopreservation',
    description: 'Your source of information on cryoprotective agents.',
    images: [
      '/favicon.png',
    ],
  },
};

export default function Search() {
  return (
    <>
      <div className="w-4/5 mx-auto">
        <div className="mb-2">
            <h1 className="font-semibold text-5xl bg-radial-[at_25%_25%] from-(--foreground) to-[#6638b0] bg-clip-text text-transparent">Search our Cryoprotectant Database</h1>
            <h3 className="font-semibold text-2xl bg-radial-[at_25%_25%] from-(--foreground) to-[#6638b0] bg-clip-text text-transparent">Reliable articles and text written by our team.</h3>
        </div>

        <SearchBox />

        <div className="flex flex-col w-[170px] gap-1 mt-4">
            <Button variant="ghost" className="flex justify-between hover:underline" asChild>
                <Link href="/database" className="flex gap-2 hover:gap-4 transition pr-4 hover:pr-2">
                Filter Database
                <ArrowBigRightDash />
                </Link>
            </Button>
            <Button variant="ghost" className="flex justify-between hover:underline" asChild>
                <Link href="/database" className="flex gap-2 hover:gap-4 transition pr-4 hover:pr-2">
                Reference Index
                <ArrowBigRightDash />
                </Link>
            </Button>
        </div>
      </div>
    </>
  );
}