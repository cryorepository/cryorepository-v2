"use client"
import { useState, useEffect } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

interface GrasProps {
  foundOnGRASList: boolean | undefined;
  setFoundOnGRASList: (value: boolean | undefined) => void;
}

export function GrasList({ foundOnGRASList, setFoundOnGRASList}: GrasProps) {

  const [selectValue, setSelectValue] = useState<string>("both");

  // Sync the select value with foundOnGRASList when it changes
  useEffect(() => {
    if (foundOnGRASList === undefined) {
      setSelectValue("both");
    } else if (foundOnGRASList) {
      setSelectValue("onList");
    } else {
      setSelectValue("offList");
    }
  }, [foundOnGRASList]);
  
  return (
    <div>
      <p className="mb-1">Is on FDA&apos;s 
        <a 
        className="px-1 hover:underline font-semibold"
        target="_blank"
        rel="noopener noreferrer"
        href="https://en.wikipedia.org/wiki/Generally_recognized_as_safe#:~:text=Generally%20recognized%20as%20safe%20(GRAS,conditions%20of%20its%20intended%20use.">
        GRAS List
        </a>
      </p>
      <Select 
        defaultValue="both"
        value={selectValue} // controlled value
        onValueChange={(value) => {
          setFoundOnGRASList(
            value === "both"
              ? undefined
              : value === "onList"
              ? true
              : false
          );
        }}
      >
        <SelectTrigger className="cursor-pointer">
          <SelectValue placeholder="Both" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="cursor-pointer" value="onList">
            Found
          </SelectItem>
          <SelectItem className="cursor-pointer" value="offList">
            Not Found
          </SelectItem>
          <SelectItem className="cursor-pointer" value="both">
            Both
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
