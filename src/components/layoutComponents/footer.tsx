/*import Image from "next/image"
import React from "react"
import Link from "next/link"

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border-color dark:shadow-xl mt-24 relative">
      <div className="w-[70%] md:w-[80%] mx-auto py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
          <div className="flex flex-col items-center text-center py-2 md:py-0">
            <p className="text-text text-base md:text-lg mb-1">Pages</p>
            <div className="flex md:flex-col flex-wrap justify-center gap-x-4">
              <Link
                href="/"
                aria-label="Home"
                className="text-muted-foreground text-sm py-1 md:py-0 hover:text-black dark:hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/search"
                aria-label="Search"
                className="text-muted-foreground text-sm py-1 md:py-0 hover:text-black dark:hover:text-white"
              >
                Search
              </Link>
              <Link
                href="/contact"
                aria-label="Reference Index"
                className="text-muted-foreground text-sm py-1 md:py-0 hover:text-black dark:hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center text-center py-2 md:py-0">
            <p className="text-text text-base md:text-lg mb-1 md:mb-2">Search</p>
            <div className="flex md:flex-col flex-wrap justify-center gap-x-4">
              
              <Link
                href="/database"
                aria-label="Database Index"
                className="text-muted-foreground text-sm py-1 md:py-0 hover:text-black dark:hover:text-white"
              >
                Database Index
              </Link>
              <Link
                href="/references"
                aria-label="Reference Index"
                className="text-muted-foreground text-sm py-1 md:py-0 hover:text-black dark:hover:text-white"
              >
                Reference Index
              </Link>
              <Link
                href="/database"
                aria-label="Reference Index"
                className="text-muted-foreground text-sm py-1 md:py-0 hover:text-black dark:hover:text-white"
              >
                Filter Database
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center text-center py-2 md:py-0">
            <p className="text-text text-base md:text-lg mb-1 md:mb-2">More</p>
            <div className="flex md:flex-col flex-wrap justify-center gap-x-4">
              <a
                href="https://ai.cryorepository.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Our AI Agent"
                className="text-muted-foreground text-sm py-1 md:py-0 hover:text-black dark:hover:text-white flex items-center justify-center"
              >
                Our AI Agent
                <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" clipRule="evenodd" d="M6.75011 4H6.00011V5.5H6.75011H9.43945L5.46978 9.46967L4.93945 10L6.00011 11.0607L6.53044 10.5303L10.499 6.56182V9.25V10H11.999V9.25V5C11.999 4.44772 11.5512 4 10.999 4H6.75011Z" fill="currentColor"></path></svg>
              </a>
              <a
                href="https://cryodao.org/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CryoDAO"
                className="text-muted-foreground text-sm py-1 md:py-0 hover:text-black dark:hover:text-white flex items-center justify-center"
              >
                CryoDAO
                <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" clipRule="evenodd" d="M6.75011 4H6.00011V5.5H6.75011H9.43945L5.46978 9.46967L4.93945 10L6.00011 11.0607L6.53044 10.5303L10.499 6.56182V9.25V10H11.999V9.25V5C11.999 4.44772 11.5512 4 10.999 4H6.75011Z" fill="currentColor"></path></svg>
              </a>
              <a
                href="https://discord.gg/cryodao"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Our AI Agent"
                className="text-muted-foreground text-sm py-1 md:py-0 hover:text-black dark:hover:text-white flex items-center justify-center"
              >
                CryoDAO Discord
                <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" clipRule="evenodd" d="M6.75011 4H6.00011V5.5H6.75011H9.43945L5.46978 9.46967L4.93945 10L6.00011 11.0607L6.53044 10.5303L10.499 6.56182V9.25V10H11.999V9.25V5C11.999 4.44772 11.5512 4 10.999 4H6.75011Z" fill="currentColor"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto border-t border-border-color">
        <div className="mx-auto py-8 grid grid-cols-1 md:grid-cols-[60%_40%] md:max-w-[1005px] text-center md:text-left">
          <div className="mb-8 md:mb-0">
            <Image
              alt="CryoRepository Logo"
              className="mx-auto md:mx-0 w-10 h-10 invert dark:invert-0"
              src="/assets/logo.png"
              width={40}
              height={40}
            />
            <p className="text-muted-foreground text-xs mt-4 max-w-[450px] md:pr-12 mx-auto md:mx-0">
              Your go-to source for all things cryoprotectants. We&apos;re passionate
              about providing researchers and scientists with the best information
              and resources. Our mission is to support your work with comprehensive
              and reliable data, fostering a community dedicated to advancing
              cryopreservation. Join us on this journey to preserve the future!
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-2.5 pb-8 md:pb-8">
              <div>
                <Image
                  className="w-10 h-10 invert-0 dark:invert mx-auto md:mx-0 mt-8 md:mt-0"
                  alt="CryoDao Logo"
                  src="/assets/cryodao.svg"
                  width={40}
                  height={40}
                />
              </div>
              <div className="w-fit">
                <p className="text-muted-foreground text-xs">
                  CRYOREPOSITORY is made possible by CRYODAO. This project is
                  funded by CRYODAO under a grant to advance cryopreservation
                  research and education.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs pt-5 md:pt-0">
              © 2025 CRYOREPOSITORY ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;*/



import Image from "next/image"
import React from "react"
//import Link from "next/link"

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border-color dark:shadow-xl mt-24 relative">
      <div className="w-[80%] mx-auto">
        <div className="mx-auto py-8 grid grid-cols-1 md:grid-cols-[60%_40%] md:max-w-[1005px] text-center md:text-left">
          <div className="mb-8 md:mb-0">
            <Image
              alt="CryoRepository Logo"
              className="mx-auto md:mx-0 w-10 h-10 invert dark:invert-0"
              src="/assets/logo.png"
              width={40}
              height={40}
            />
            <p className="text-muted-foreground text-xs mt-4 max-w-[450px] md:pr-12 mx-auto md:mx-0">
              Your go-to source for all things cryoprotectants. We&apos;re passionate
              about providing researchers and scientists with the best information
              and resources. Our mission is to support your work with comprehensive
              and reliable data, fostering a community dedicated to advancing
              cryopreservation. Join us on this journey to preserve the future!
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-2.5 pb-8 md:pb-8">
              <div>
                <Image
                  className="w-10 h-10 invert-0 dark:invert mx-auto md:mx-0 mt-8 md:mt-0"
                  alt="CryoDao Logo"
                  src="/assets/cryodao.svg"
                  width={40}
                  height={40}
                />
              </div>
              <div className="w-fit">
                <p className="text-muted-foreground text-xs">
                  CRYOREPOSITORY is made possible by {" "}
                  <a 
                    href="https://cryodao.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    CRYODAO
                  </a>
                  . This project is
                  funded by{" "}
                  <a 
                    href="https://cryodao.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    CRYODAO
                  </a>
                  {" "}under a grant to advance cryopreservation
                  research and education.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs pt-5 md:pt-0">
              © 2025 CRYOREPOSITORY ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;