import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

import QuoteSlider from "@/components/homeComponents/quote-component"
import TeamComponent from "@/components/homeComponents/team-component"
import StepsComponent from "@/components/homeComponents/steps-component"


export default function GridContainer() {
  return (
    <div className="mt-24 mx-auto border border-color w-9/10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center border-b border-color">
        <div className="flex flex-col gap-2 p-12">
            <span className="font-semibold px-2 py-[1px] border border-[#6638b0] rounded-[16px] w-fit bg-gradient-to-b from-[#6638b0] to-[#9848a3] bg-clip-text text-transparent">
            CryoRepository
            </span>
            <h1 className="text-3xl lg:text-5xl font-semibold pb-2">
              Cryoprotective Agents Made Clear
            </h1>
            <Button className="rounded-full w-fit flex gap-0 sm:text-sm text-xs" asChild>
            <Link href="/search">
              Search our CPA Database
              <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" clipRule="evenodd" d="M6.75011 4H6.00011V5.5H6.75011H9.43945L5.46978 9.46967L4.93945 10L6.00011 11.0607L6.53044 10.5303L10.499 6.56182V9.25V10H11.999V9.25V5C11.999 4.44772 11.5512 4 10.999 4H6.75011Z" fill="currentColor"></path></svg>
            </Link>
            </Button>
        </div>

        <div className="w-full h-full">
            <Image className="w-full h-full object-cover md:[clip-path:polygon(10%_0,100%_0,100%_100%,0%_100%)]" src="/assets/landing.png"  height={1045} width={1045} alt="landing image" />
        </div>
      </div>

      <div className="flex items-center justify-evenly p-8 flex-col gap-8 md:flex-row md:gap-0 border-b border-color">
        <div className="flex flex-col text-center">
          <h2 className="text-5xl font-semibold">
            60+
          </h2>
          <p className="text-sm px-4">
            Cryoprotective Agents Indexed
          </p>
        </div>

        <div className="border-l border-dashed border-color w-1 h-30 hidden md:block"></div>

        <div className="flex flex-col text-center">
          <h2 className="text-5xl font-semibold">
            120+
          </h2>
          <p className="text-sm px-4">
            Info Points Logged Per CPA
          </p>
        </div>

        <div className="border-l border-dashed border-color w-1 h-30 hidden md:block"></div>

        <div className="flex flex-col text-center">
          <h2 className="text-5xl font-semibold">
            20+
          </h2>
          <p className="text-sm px-4">
            Cryoprotectant Families Indexed
          </p>
        </div>
      </div>

      <div className="w-full mx-auto mb-6 border-b border-color relative">

        <div className="absolute w-full flex justify-evenly h-full z-[-1]">
          <div className="border-l border-dashed border-color w-1 h-full"></div>
          <div className="border-l border-dashed border-color w-1 h-full"></div>
        </div>


        <div className="flex flex-col md:flex-row items-center max-w-[1100px] mx-auto">
          <div className="flex-1 p-8 flex justify-center">
            <Image src="/assets/mockup_laptop_v2.png"  height={250} width={250} alt="Laptop Mockup" className="w-auto h-[250px] object-contain" />
          </div>

          <div className="flex-1 p-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
                <path fillRule="evenodd" clipRule="evenodd" d="M14.7477 0.293701L0.747695 5.2937L0.730713 6.70002L6.81589 9.04047C6.88192 9.06586 6.93409 9.11804 6.95948 9.18406L9.29994 15.2692L10.7063 15.2523L15.7063 1.25226L14.7477 0.293701ZM7.31426 7.62503L3.15693 6.02605L12.1112 2.8281L7.31426 7.62503ZM8.37492 8.68569L9.9739 12.843L13.1719 3.88876L8.37492 8.68569Z" fill="currentColor"></path>
              </svg>
              <p className="text-sm">CryoRepository AI</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="mt-4 text-2xl md:text-2xl font-semibold text-muted-foreground">
                <span className="text-foreground">Meet your cryopreservation companion.</span> Driven by AI, built for precision — organizing cryoprotectant data you can trust.
              </p>

              <Button asChild className="w-fit rounded-full">
                <a target="_blank" rel="noopener noreferrer" href="https://ai.cryorepository.com/">
                  Visit Website
                  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" clipRule="evenodd" d="M6.75011 4H6.00011V5.5H6.75011H9.43945L5.46978 9.46967L4.93945 10L6.00011 11.0607L6.53044 10.5303L10.499 6.56182V9.25V10H11.999V9.25V5C11.999 4.44772 11.5512 4 10.999 4H6.75011Z" fill="currentColor"></path></svg>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-color mt-6 text-center px-8 py-12">
        <div className="mb-8">
          <h2 className="text-4xl font-semibold">Our Worldclass Team</h2>
          <p className="text-muted-foreground">Our Founders: Helping Accelerate Cryopreservation Research</p>
        </div>
        <TeamComponent />
      </div>

      <div className="border-b border-color p-8 py-12 bg-cover bg-center bg-[url('https://cdn.prod.website-files.com/600ff0f8154936050d98ec01/650aca5d23604334ee6b69ce_Longevist.jpg')]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-[1000px] mx-auto">
          <div className="mx-auto text-center md:text-left">
            <h3 className="font-semibold text-3xl text-grey-800 mb-1 text-white">Made Possible By</h3>
            <Button className="border hover:opacity-100 w-fit bg-white text-black hover:bg-white hover:text-black" asChild>
              <a className="!gap-0" target="_blank" href="https://cryodao.org">
                Their Website
                <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" clipRule="evenodd" d="M6.75011 4H6.00011V5.5H6.75011H9.43945L5.46978 9.46967L4.93945 10L6.00011 11.0607L6.53044 10.5303L10.499 6.56182V9.25V10H11.999V9.25V5C11.999 4.44772 11.5512 4 10.999 4H6.75011Z" fill="currentColor"></path></svg>
              </a>
            </Button>
          </div>

          <Image 
            className="h-16 mx-auto justify-self-start md:justify-self-end invert" 
            src="/assets/cryodao.svg"
            alt="Sponsor Logo"
            height={16}
            width={16}
          />
        </div>
      </div>

      <div className="border-t border-color mt-6">
        <StepsComponent />
      </div>

      <div className="w-full mx-auto mb-6 border-b border-color relative">

        <div className="absolute w-full flex justify-evenly h-full z-[-1]">
          <div className="border-l border-dashed border-color w-1 h-full"></div>
          <div className="border-l border-dashed border-color w-1 h-full"></div>
        </div>


        <div className="flex flex-col md:flex-row items-center max-w-[1100px] mx-auto">
          <div className="flex-1 p-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.51324 3.62367L3.76375 8.34731C3.61845 8.7396 3.24433 8.99999 2.826 8.99999H0.75H0V7.49999H0.75H2.47799L4.56666 1.86057C4.88684 0.996097 6.10683 0.988493 6.43776 1.84891L10.5137 12.4463L12.2408 8.1286C12.3926 7.74894 12.7604 7.49999 13.1693 7.49999H15.25H16V8.99999H15.25H13.5078L11.433 14.1868C11.0954 15.031 9.8976 15.023 9.57122 14.1744L5.51324 3.62367Z"
                  fill="currentColor"
                ></path>
              </svg>
              <p className="text-sm">Cryoprotective Agent Database</p>
            </div>
            <p className="mt-4 text-2xl md:text-2xl font-semibold text-muted-foreground">
              <span className="text-foreground">Preservation starts here.</span> Accuracy is everything, we organize data to ensure clarity and confidence.
            </p>
          </div>

          <div className="flex-1 p-8 flex justify-center md:justify-end">
            <Image src="/assets/globe_poster.png" alt="Globe Poster" height={145} width={145} className="w-auto h-[145px] object-contain" />
          </div>
        </div>
      </div>

      <div className="border-t border-color mt-6">
        <QuoteSlider />
      </div>
    </div>
  )
}