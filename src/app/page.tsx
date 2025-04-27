import type { Metadata } from "next"

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
}