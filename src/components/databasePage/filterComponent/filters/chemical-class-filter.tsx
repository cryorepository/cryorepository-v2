"use client"

import React, { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ChemClassProps {
  chemClassFilters: string[];
  chemicalClasses: string[];
  setChemicalClasses: (value: string[]) => void;
  reset: boolean;
  setReset: (value: boolean) => void;
}

export function ChemClass({ chemClassFilters, chemicalClasses, setChemicalClasses, reset, setReset }: ChemClassProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const normalizedChemicalClasses = Array.isArray(chemicalClasses) ? chemicalClasses : [chemicalClasses];

  useEffect(() => {
    setChemicalClasses(selected)
  }, [selected])

  useEffect(() => {
    const formatted = normalizedChemicalClasses.map((c) => c.replace(/\s+/g, "+"))
    setSelected(formatted)
  }, [])

  /*useEffect(() => {
    setSelected(normalizedChemicalClasses)
  }, [])*/

  useEffect(() => {
    if (reset === true) {
      setSelected([]);
      setReset(false);
    }
  }, [reset])

  const mappedFilters = chemClassFilters.map((item) => ({
    value: item.replace(/\s+/g, "+"), // replace spaces with +
    label: item,
  }));

  const toggleValue = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const selectedLabels = mappedFilters
    .filter((i) => selected.includes(i.value))
    .map((i) => i.label)

  /*const selectedLabels = mappedFilters
    .filter((i) => selected.includes(i.label))
    .map((i) => i.label)*/

  return (
    <div>
      <p className="mb-1">Select Chemical Classes</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-fit min-w-[230px] max-w-[350px] justify-between"
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {selectedLabels.length > 0 ? selectedLabels.join(", ") : "Select Chemical Classes..."}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[230px] p-0">
          <Command>
            <CommandInput placeholder="Search Chem Classes..." />
            <CommandList>
              <CommandEmpty>No chemical class found.</CommandEmpty>
              <CommandGroup>
                {mappedFilters.map((chemClass) => (
                  <CommandItem
                    className="cursor-pointer"
                    key={chemClass.value}
                    //key={chemClass.label}
                    value={chemClass.value}
                    //value={chemClass.label}
                    onSelect={() => toggleValue(chemClass.value)}
                    //onSelect={() => toggleValue(chemClass.label)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(chemClass.value) ? "opacity-100" : "opacity-0"
                        //selected.includes(chemClass.label) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {chemClass.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}