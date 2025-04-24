"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export function GrasList() {
  
  return (
    <Select defaultValue="both">
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
  )
}
