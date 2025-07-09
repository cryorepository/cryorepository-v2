/*import Image from "next/image"
import Link from "next/link"
import { NavMenu } from "@/components/layoutComponents/navbarComponents/nav-menu"
import { ThemeTrigger } from "@/components/layoutComponents/navbarComponents/theme-trigger"
import { SearchInput } from "@/components/layoutComponents/navbarComponents/search-input"

const Navbar: React.FC = () => {
  return (
    <nav className="fixed bg-background top-0 h-16 w-full flex items-center justify-between z-10 border-b border-color">
      <div className="flex items-center gap-6">
        <Link aria-label="Home" href="/" className="flex items-center gap-1.5 ml-5 h-10">
          <Image src="/assets/logo.png" width={28} height={28} className="select-none h-8 w-8 pointer-events-none [html.light_&]:brightness-0" alt="Logo Image" />
          <h2 className="max-[400px]:hidden font-semibold text-xl">
            CryoRepository
          </h2>
        </Link>

        <NavMenu />
      </div>

      <div className="flex items-center select-none mr-5 gap-2">
        <ThemeTrigger />
        <SearchInput />
      </div>
    </nav>
  );
};

export default Navbar;*/

import Image from "next/image"
import Link from "next/link"
//import { NavMenu } from "@/components/layoutComponents/navbarComponents/nav-menu"
import { ThemeTrigger } from "@/components/layoutComponents/navbarComponents/theme-trigger"
import { Button } from "../ui/button";
//import { SearchInput } from "@/components/layoutComponents/navbarComponents/search-input"

const Navbar: React.FC = () => {
  return (
    <nav className="fixed bg-background top-0 h-16 w-full flex items-center justify-between z-10 border-b border-color">
      <div className="flex items-center gap-2">
        <Link aria-label="Home" href="/" className="flex items-center gap-1.5 ml-5 mr-4 h-10">
          <Image src="/assets/logo.png" width={28} height={28} className="select-none h-8 w-8 pointer-events-none [html.light_&]:brightness-0" alt="Logo Image" />
          <h2 className="max-[400px]:hidden font-semibold text-xl">
            CryoRepository
          </h2>
        </Link>

        <Button variant={"ghost"} asChild>
          <Link href="/database">
            CPA Database
          </Link>
        </Button>

        {/*<Button variant={"ghost"} asChild>
          <Link href="/about-us">
            About Us
          </Link>
        </Button>
        <NavMenu />*/}
      </div>

      <div className="flex items-center select-none mr-5 gap-2">
        <ThemeTrigger />


        <Button variant="outline" size="icon" aria-label="Discors Link" asChild>
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image 
              src="/assets/external/discord.svg" 
              alt="Discord Logo"
              className="[html.light_&]:brightness-0"
              height={18} 
              width={18} 
            />
          </a>
        </Button>

        <Button variant="outline" size="icon" aria-label="Twitter Link" asChild>
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image 
              src="/assets/external/x.svg" 
              alt="Twitter Logo" 
              className="[html.light_&]:brightness-0"
              height={14} 
              width={14} 
            />
          </a>
        </Button>
        {/*<SearchInput />*/}
      </div>
    </nav>
  );
};

export default Navbar;