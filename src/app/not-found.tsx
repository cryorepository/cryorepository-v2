import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'CryoRepository - Discover Cryopreservation | Cryo Repo',
  description: 'Your source of information on cryoprotective agents.',
  alternates: {
    canonical: 'https://www.cryorepository.com',
  },
  openGraph: {
    siteName: 'CryoRepository',
    title: 'CryoRepository - Discover Cryopreservation',
    description: 'Your source of information on cryoprotective agents.',
    images: [
      {
        url: '/favicon.png',
        width: 500,
        height: 500,
        alt: 'CryoRepository preview image',
      },
    ],
    url: 'https://www.cryorepository.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryoRepository - Discover Cryopreservation',
    description: 'Your source of information on cryoprotective agents.',
    images: [
      '/favicon.png',
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <div className="top"></div>
      <div className="flex items-center justify-center gap-3 w-screen h-[calc(100vh-128px)]">
        <h1 className="font-semibold text-4xl">404</h1>
        <div className="border-l w-[1px] h-[38px] border-black dark:border-white" />
        <h2 className="font-semibold text-2xl">Page Not Found</h2>
      </div>
      <style>{`
        footer{
          display: none;
        }
      `}</style>
    </>
  );
}