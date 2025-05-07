"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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
import { ChevronsUpDown, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

interface CellComponentProps {
  cellTypeFilters: string[];
  cellType: string;
  setCellType: (value: string) => void;
  successRateMin: number | string;
  setSuccessRateMin: (value: number | string) => void;
  successRateMax: number | string;
  setSuccessRateMax: (value: number | string) => void;
}

export function CellComponent({ 
  cellTypeFilters,
  cellType,
  setCellType,
  successRateMin,
  setSuccessRateMin,
  successRateMax,
  setSuccessRateMax,
}: CellComponentProps) {
  const [open, setOpen] = useState(false);
  
  const mappedFilters = [
    { value: "none", label: "Reset Selection" },
    ...cellTypeFilters.map((type) => ({
      value: type,
      label: type,
    })),
  ];

  const handleSelect = (value: string) => {
    // Set cellType to empty string for "none", otherwise set to the selected value
    setCellType(value === "none" ? "" : value);
    setOpen(false); // Close the popover after selection
  };

  // Find the label for the currently selected cellType
  const selectedLabel = mappedFilters.find((item) => item.value === cellType)?.label || "Select Cell Type...";

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
  
    // Only allow digits
    if (!/^\d*$/.test(raw)) return;
  
    const value = Number(raw);
    if (value > 100) return;
    if (value < 0) return;
  
    setSuccessRateMin(raw);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
  
    // Only allow digits
    if (!/^\d*$/.test(raw)) return;
  
    const value = Number(raw);
    if (value > 100) return;
    if (value < 0) return;
  
    setSuccessRateMax(raw);
  };

  useEffect(() => {
    if (cellType === "none"){
      setCellType("");
    }
  }, [cellType]);

    return (
      <div className="flex flex-wrap items-center gap-2">
        <p>Tested on</p>
        
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-fit min-w-[230px] max-w-[350px] justify-between"
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {selectedLabel}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[230px] p-0">
          <Command>
            <CommandInput placeholder="Search Cell Types..." />
            <CommandList>
              <CommandEmpty>No cell type found.</CommandEmpty>
              <CommandGroup>
                {mappedFilters.map((item) => (
                  <CommandItem
                    className="cursor-pointer"
                    key={item.value}
                    value={item.value}
                    onSelect={() => handleSelect(item.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        cellType === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

        
        {cellType && (
        <>
          <p>with a success rate of</p>

          <Input className="w-24" type="text" placeholder="15" value={successRateMin} onChange={handleMinChange} />

          <p>% to</p>

          <Input className="w-24" type="text" placeholder="70" value={successRateMax} onChange={handleMaxChange} />
          <p>%.</p>
        </>
        )}
      </div>
    )
}