import Image from "next/image"
import Link from "next/link"
import { NavMenu } from "@/components/layoutComponents/navbarComponents/nav-menu"
import { ThemeTrigger } from "@/components/layoutComponents/navbarComponents/theme-trigger"
import { SearchInput } from "@/components/layoutComponents/navbarComponents/search-input"

const Navbar: React.FC = () => {
  return (
    <nav className="fixed bg-background top-0 h-16 w-full flex items-center justify-between z-10 border-b border-color">
      <div className="flex align-center gap-6">
        <Link aria-label="Home" href="/" className="flex items-center gap-1.5 ml-5 h-10">
          <Image src="/logo.png" width={28} height={28} className="select-none h-8 w-8 pointer-events-none [html.light_&]:brightness-0" alt="Logo Image" />
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

export default Navbar;