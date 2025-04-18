import React from "react"
import { BookOpenText, Eye, BookCheck, Laptop } from "lucide-react"

interface Stage {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
}

interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface VestingStagesProps {
  stages?: Stage[];
  image?: Image;
}

const defaultStages: Stage[] = [
  {
    title: '1. Initial Data Collection',
    icon: BookOpenText,
    description:
      'Conduct extensive research to gather essential information about cryoprotectants. This includes their chemical properties, applications, storage requirements, and compatibility with biological samples.',
  },
  {
    title: '2. Review',
    icon: Eye,
    description:
      'Critically evaluate and verify the collected data for accuracy and relevance. Cross-reference information with reputable sources, and resolve discrepancies in terminology or reported values.',
  },
  {
    title: '3. Publishing',
    icon: BookCheck,
    description:
      'Organize the data into a user-friendly format. Publish on a robust database with in-depth data points, including cryoprotectant properties, applications, and methods.',
  },
  {
    title: '4. Updates',
    icon: Laptop,
    description:
      'Ensure the database remains current and reliable by incorporating new cryoprotectants, updated research findings, and user feedback. Implement a versioning system to track changes.',
  },
];

const defaultImage: Image = {
  src: 'https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/Screenshot_2024-08-02_at_5.00.10_PM-removebg-preview.png?v=1722582117925',
  alt: 'Scientist',
  width: 369,
  height: 676,
};

/**
 * A reusable component to display a series of vesting stages with an accompanying image.
 * Each stage includes a title, icon, and description, connected by a dotted line.
 * Supports dark mode and responsive design using Tailwind CSS.
 */
const StepsComponent: React.FC<VestingStagesProps> = ({ stages = defaultStages, image = defaultImage }) => {
  return (
    <div className="border-b border-color py-12">
      <div className="flex flex-col lg:flex-row justify-evenly items-center w-full max-w-[1100px] px-[5%] mx-auto">
        {/* Stages Section */}
        <div className="stages flex flex-col gap-6 w-full relative">
          {stages.map((stage, index, array) => (
            <div className="stageItem flex gap-4 relative" key={index}>
              <div className="icon-container flex flex-col items-center relative">
                <div className="icon">
                  <p className="sacds w-[50px] h-[50px] rounded-full flex items-center justify-center text-lg text-white dark:bg-[#655aff] dark:border-[#292566] bg-[var(--icon-color)] border-[var(--hover-color)] border-[10px]">
                    <stage.icon width="16" />
                  </p>
                </div>
                {index !== array.length - 1 && (
                  <div className="dotted-line z-[-1] absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] h-full bg-[radial-gradient(circle_closest-side,#524ac6_99%,transparent_100%)] dark:bg-[radial-gradient(circle_closest-side,#524ac6_99%,transparent_100%)] bg-[radial-gradient(circle_closest-side,var(--icon-color)_99%,transparent_100%)] bg-[length:100%_6px]"></div>
                )}
              </div>
              <div className="stage flex flex-col justify-center flex-1">
                <h3 className="text-2xl font-semibold m-0">{stage.title}</h3>
                <p className="m-0 text-sm">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div className="flexImg flex justify-center items-center w-2/5 max-h-[600px] mx-auto p-5 box-border">
          <img
            className="imageSci w-full max-h-[600px] h-auto object-contain"
            alt={image.alt}
            src={image.src}
            width={image.width}
            height={image.height}
          />
        </div>
      </div>
    </div>
  );
};

export default StepsComponent;