/*import type { Metadata } from "next"

import GridContainer from "@/components/homeComponents/grid-container"
import { homeMetadata } from "@/lib/seo";

export const metadata: Metadata = homeMetadata;

export default function Home() {
  return (
    <>
      <div className="top"></div>
      <GridContainer />
    </>
  );
}*/

//import Link from "next/link"
import type { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
//import { ArrowBigRightDash } from "lucide-react"
import { SearchBox } from "@/components/searchComponents/search-box";
import { searchMetadata } from "@/lib/seo"

export const metadata: Metadata = searchMetadata;

export default function Search() {
  return (
    <div className="md:w-4/5 w-full mx-auto h-[calc(100vh-128px)] pt-[100px] md:pt-[20vh] text-center md:text-left">
      <svg className="absolute z-[-1] top-[64px] w-1/2 left-[45%] max-h-[calc(100vh-64px)] opacity-90 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]" aria-hidden="true" viewBox="0 0 668 1069" width="668" height="1069" fill="none"><defs><clipPath id=":r1:-clip-path"><path fill="#fff" transform="rotate(-180 334 534.4)" d="M0 0h668v1068.8H0z"></path></clipPath></defs><g opacity=".4" clipPath="url(#:r1:-clip-path)" strokeWidth="4"><path opacity=".3" d="M584.5 770.4v-474M484.5 770.4v-474M384.5 770.4v-474M283.5 769.4v-474M183.5 768.4v-474M83.5 767.4v-474" stroke="#334155"></path><path d="M83.5 221.275v6.587a50.1 50.1 0 0 0 22.309 41.686l55.581 37.054a50.102 50.102 0 0 1 22.309 41.686v6.587M83.5 716.012v6.588a50.099 50.099 0 0 0 22.309 41.685l55.581 37.054a50.102 50.102 0 0 1 22.309 41.686v6.587M183.7 584.5v6.587a50.1 50.1 0 0 0 22.31 41.686l55.581 37.054a50.097 50.097 0 0 1 22.309 41.685v6.588M384.101 277.637v6.588a50.1 50.1 0 0 0 22.309 41.685l55.581 37.054a50.1 50.1 0 0 1 22.31 41.686v6.587M384.1 770.288v6.587a50.1 50.1 0 0 1-22.309 41.686l-55.581 37.054A50.099 50.099 0 0 0 283.9 897.3v6.588" stroke="#334155"></path><path d="M384.1 770.288v6.587a50.1 50.1 0 0 1-22.309 41.686l-55.581 37.054A50.099 50.099 0 0 0 283.9 897.3v6.588M484.3 594.937v6.587a50.1 50.1 0 0 1-22.31 41.686l-55.581 37.054A50.1 50.1 0 0 0 384.1 721.95v6.587M484.3 872.575v6.587a50.1 50.1 0 0 1-22.31 41.686l-55.581 37.054a50.098 50.098 0 0 0-22.309 41.686v6.582M584.501 663.824v39.988a50.099 50.099 0 0 1-22.31 41.685l-55.581 37.054a50.102 50.102 0 0 0-22.309 41.686v6.587M283.899 945.637v6.588a50.1 50.1 0 0 1-22.309 41.685l-55.581 37.05a50.12 50.12 0 0 0-22.31 41.69v6.59M384.1 277.637c0 19.946 12.763 37.655 31.686 43.962l137.028 45.676c18.923 6.308 31.686 24.016 31.686 43.962M183.7 463.425v30.69c0 21.564 13.799 40.709 34.257 47.529l134.457 44.819c18.922 6.307 31.686 24.016 31.686 43.962M83.5 102.288c0 19.515 13.554 36.412 32.604 40.645l235.391 52.309c19.05 4.234 32.605 21.13 32.605 40.646M83.5 463.425v-58.45M183.699 542.75V396.625M283.9 1068.8V945.637M83.5 363.225v-141.95M83.5 179.524v-77.237M83.5 60.537V0M384.1 630.425V277.637M484.301 830.824V594.937M584.5 1068.8V663.825M484.301 555.275V452.988M584.5 622.075V452.988M384.1 728.537v-56.362M384.1 1068.8v-20.88M384.1 1006.17V770.287M283.9 903.888V759.85M183.699 1066.71V891.362M83.5 1068.8V716.012M83.5 674.263V505.175" stroke="#334155"></path>
      <circle cx="83.5" cy="384.1" r="10.438" transform="rotate(-180 83.5 384.1)" fill="#1E293B" stroke="#334155"></circle><circle cx="83.5" cy="200.399" r="10.438" transform="rotate(-180 83.5 200.399)" stroke="#334155"></circle><circle cx="83.5" cy="81.412" r="10.438" transform="rotate(-180 83.5 81.412)" stroke="#334155"></circle><circle cx="183.699" cy="375.75" r="10.438" transform="rotate(-180 183.699 375.75)" fill="#1E293B" stroke="#334155"></circle><circle cx="183.699" cy="563.625" r="10.438" transform="rotate(-180 183.699 563.625)" fill="#1E293B" stroke="#334155"></circle><circle cx="384.1" cy="651.3" r="10.438" transform="rotate(-180 384.1 651.3)" fill="#1E293B" stroke="#334155"></circle><circle cx="484.301" cy="574.062" r="10.438" transform="rotate(-180 484.301 574.062)" fill="#0EA5E9" fillOpacity=".42" stroke="#0EA5E9"></circle><circle cx="384.1" cy="749.412" r="10.438" transform="rotate(-180 384.1 749.412)" fill="#1E293B" stroke="#334155"></circle><circle cx="384.1" cy="1027.05" r="10.438" transform="rotate(-180 384.1 1027.05)" stroke="#334155"></circle><circle cx="283.9" cy="924.763" r="10.438" transform="rotate(-180 283.9 924.763)" stroke="#334155"></circle><circle cx="183.699" cy="870.487" r="10.438" transform="rotate(-180 183.699 870.487)" stroke="#334155"></circle><circle cx="283.9" cy="738.975" r="10.438" transform="rotate(-180 283.9 738.975)" fill="#1E293B" stroke="#334155"></circle><circle cx="83.5" cy="695.138" r="10.438" transform="rotate(-180 83.5 695.138)" fill="#1E293B" stroke="#334155"></circle><circle cx="83.5" cy="484.3" r="10.438" transform="rotate(-180 83.5 484.3)" fill="#0EA5E9" fillOpacity=".42" stroke="#0EA5E9"></circle><circle cx="484.301" cy="432.112" r="10.438" transform="rotate(-180 484.301 432.112)" fill="#1E293B" stroke="#334155"></circle><circle cx="584.5" cy="432.112" r="10.438" transform="rotate(-180 584.5 432.112)" fill="#1E293B" stroke="#334155"></circle><circle cx="584.5" cy="642.95" r="10.438" transform="rotate(-180 584.5 642.95)" fill="#1E293B" stroke="#334155"></circle><circle cx="484.301" cy="851.699" r="10.438" transform="rotate(-180 484.301 851.699)" stroke="#334155"></circle><circle cx="384.1" cy="256.763" r="10.438" transform="rotate(-180 384.1 256.763)" stroke="#334155"></circle></g></svg>

      {/*<div className="mb-2">
          <h1 className="font-semibold text-5xl bg-radial-[at_25%_25%] from-(--foreground) to-[#6638b0] bg-clip-text text-transparent leading-[54px]">Search our Cryoprotectant Database</h1>
          <h3 className="font-semibold text-2xl bg-radial-[at_25%_25%] from-(--foreground) to-[#6638b0] bg-clip-text text-transparent">Reliable articles and text written by our team.</h3>
      </div>*/}
      <div className="flex items-center gap-1.5 mb-6">
        <Image src="/assets/logo.png" width={36} height={36} className="select-none h-12 w-12 pointer-events-none [html.light_&]:brightness-0" alt="Logo Image" />
        <h2 className="max-[400px]:hidden font-semibold text-3xl">
          CryoRepository
        </h2>
      </div>

      <SearchBox />

      <div>
        <p className="text-sm max-w-[490px] my-3 text-gray-600 dark:text-gray-300 leading-relaxed">
          <strong>CryoRepository</strong> is a resource focused on cryoprotective compounds.  
          It offers curated data on their chemical properties, biological effects, and performance across species and sample types.  
          <br /><br />
          Designed to support cryopreservation research, CryoRepository aims to advance innovation in cryobiology.
        </p>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Discord Link" asChild>
            <a
              href="http://discord.gg/cryodao"
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
              href="https://x.com/CryoDAO"
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
        </div>
      </div>

      {/*}
      <div className="flex flex-col w-full md:w-[170px] gap-1 mt-4 items-center">
        <Button variant="ghost" className="flex justify-between hover:underline" asChild>
          <Link href="/database" className="flex gap-2 hover:gap-4 transition pr-4 hover:pr-2">
            Filter Database
            <ArrowBigRightDash />
          </Link>
        </Button>

        <Button variant="ghost" className="flex justify-between hover:underline" asChild>
          <Link href="/references" className="flex gap-2 hover:gap-4 transition pr-4 hover:pr-2">
            Reference Index
            <ArrowBigRightDash />
          </Link>
        </Button>
      </div>

      <style>{`
        footer{
          display: none;
        }
      `}</style>
      */}
    </div>
  );
}