"use client"

import { useState } from "react"
import { motion } from "framer-motion"

// Define TypeScript interface for the quote object
interface Quote {
  text: string;
  name: string;
  position: string;
  image: string;
}

const quotes: Quote[] = [
  {
    text: "CryoRepository has helped me accelerate my team's research tenfold.",
    name: "J. Doe",
    position: "CTO, Nvidia",
    image: "https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/1695167344576.jpeg?v=1724466587998",
  },
  {
    text: "An amazing resource for cryopreservation insights and breakthroughs.",
    name: "Jane Doe",
    position: "CEO, Tesla & SpaceX",
    image: "https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/1695167344576.jpeg?v=1724466587998",
  },
  {
    text: "Thanks to CryoRepository, we've pushed the boundaries of longevity research.",
    name: "Dr. Jane Smith",
    position: "Lead Researcher",
    image: "https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/1695167344576.jpeg?v=1724466587998",
  },
];

export default function QuoteSlider() {
  const [currentQuote, setCurrentQuote] = useState<number>(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const handleNext = () => {
    setDirection("forward");
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const handlePrev = () => {
    setDirection("backward");
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const variants = {
    forward: { opacity: 0, x: 100 },
    backward: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="my-[112px]"> {/*my-[calc(50vh-100px)]">*/}
      <div className="max-w-[1300px] mx-auto w-[80%] grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:flex-col">
        {/* Left Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-[calc(2rem+3vw)] leading-[calc(2rem+2.5vw)] font-medium mb-2">
            From our <br />
            <span className="font-semibold">community.</span>
          </h1>
          <p className="text-[calc(1rem+0.5vw)] mb-6 max-w-[390px] text-gray-500 dark:text-gray-400">
            Here&apos;s what other users had to say about{" "}
            <span className="font-semibold">CryoRepository.</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              className="w-[52px] h-[52px] text-3xl rounded-full border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transition cursor-pointer"
              onClick={handlePrev}
            >
              ←
            </button>
            <button
              className="w-[52px] h-[52px] text-3xl rounded-full border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transition cursor-pointer"
              onClick={handleNext}
            >
              →
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col">
          <motion.h1
            className="mb-4 text-2xl font-medium"
            key={currentQuote}
            initial={direction === "forward" ? variants.forward : variants.backward}
            animate={variants.visible}
            exit={direction === "forward" ? variants.backward : variants.forward}
            transition={{ duration: 0.5 }}
          >
            {quotes[currentQuote].text}
          </motion.h1>

          <div className="flex items-center gap-2">
            <img
              className="w-20 h-20 rounded-full"
              src={quotes[currentQuote].image}
              alt={quotes[currentQuote].name}
              width={80}
              height={80}
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{quotes[currentQuote].name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{quotes[currentQuote].position}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}