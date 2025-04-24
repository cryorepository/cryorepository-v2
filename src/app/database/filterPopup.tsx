/*"use client"

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { Copy, Check, X, BookOpen } from "lucide-react";
import { ComboboxDemo } from "./popover"

export function FilterPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 h-8 w-8 sm:h-8 sm:w-auto"
          title="Cite this resource"
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:block">Filter Articles</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={popupVariants}
          transition={{ duration: 0.1 }}
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Filter Articles</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>
          <ComboboxDemo />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterPopup;*/

/*"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookOpen, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

// Sample ComboboxDemo (replace with your actual ComboboxDemo if different)
export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const options = [
    { value: "article", label: "Article" },
    { value: "blog", label: "Blog" },
    { value: "news", label: "News" },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select type..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandList>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function FilterPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 h-8 w-8 sm:h-8 sm:w-auto"
          title="Filter articles"
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:block">Filter Articles</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={popupVariants}
          transition={{ duration: 0.1 }}
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Filter Articles</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>
          <div className="mt-4">
            <ComboboxDemo />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default FilterPopup;*/



"use client";

import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { ComboboxDemo } from "./popover"
import { GrasList } from "./grasList";

export function FilterPopup() {
  

  return (
    <Accordion type="single" collapsible className="w-full px-4 rounded-md text-sm font-medium border bg-background shadow-xs dark:hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
        <AccordionItem value="item-1">
            <AccordionTrigger>Filter Entries</AccordionTrigger>
            <AccordionContent className="border-t border-color pt-4">

                <ComboboxDemo />

                <GrasList />

            </AccordionContent>
        </AccordionItem>
    </Accordion>
  );
}

export default FilterPopup;