"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { TriangleAlert, ArrowDownWideNarrow, FunnelX } from "lucide-react"
import { ChemClass } from "@/components/databasePage/filterComponent/filters/chemical-class-filter"
import { GrasList } from "@/components/databasePage/filterComponent/filters/fda-gras-filter"
import { MolecularWeight } from "@/components/databasePage/filterComponent/filters/molecular-weight-filter"
import { CellComponent } from "@/components/databasePage/filterComponent/filters/tested-cell-filter"
import { usePathname } from "next/navigation";

interface FilterParams {
  selectedClasses: string[];
  foundOnGRASList: boolean | undefined;
  cellType: string;
  molecularWeightMin: number | string;
  molecularWeightMax: number | string;
  successRateMin: number | string;
  successRateMax: number | string;
}

interface FilterPopup {
  chemClassFilters: string[];
  cellTypeFilters: string[];
  params: FilterParams;
}

export function FilterPopup({chemClassFilters, cellTypeFilters, params}: FilterPopup) {

  const [chemicalClasses, setChemicalClasses] = useState<string[]>(params.selectedClasses);
  /*const [chemicalClasses, setChemicalClasses] = useState<string[]>(
    Array.isArray(params.selectedClasses) ? params.selectedClasses : [params.selectedClasses]
  );*/

  const [foundOnGRASList, setFoundOnGRASList] = useState<boolean | undefined>(
    params.foundOnGRASList
  );
  const [molecularWeightMin, setMolecularWeightMin] = useState<number | string>(
    params.molecularWeightMin
  );
  const [molecularWeightMax, setMolecularWeightMax] = useState<number | string>(
    params.molecularWeightMax
  );
  const [cellType, setCellType] = useState<string>(params.cellType);
  const [successRateMin, setSuccessRateMin] = useState<number | string>(params.successRateMin);
  const [successRateMax, setSuccessRateMax] = useState<number | string>(params.successRateMax);

  const [reset, setReset] = useState(false);
  const [filterError, setFilterError] = useState<string>("");

  const pathname = usePathname();

  const applyFilters = () => {
    const params = new URLSearchParams();
    let hasFilters = false; // Flag to check if any filter is applied
  
    // Add chemical classes
    if (chemicalClasses.length > 0) {
      params.append('selectedClasses', chemicalClasses.join(','));
      hasFilters = true;
    }
  
    // Add foundOnGRASList
    if (foundOnGRASList === true || foundOnGRASList === false) {
      params.append('GRAS', foundOnGRASList ? 'true' : 'false');
      hasFilters = true;
    }
  
    // Add cell type
    if (cellType) {
      params.append('cellType', cellType);
      hasFilters = true;
    }
  
    // Validate and add molecularWeightMin and molecularWeightMax
    if (molecularWeightMin && molecularWeightMax) {
      const minFloat = parseFloat(molecularWeightMin as string);
      const maxFloat = parseFloat(molecularWeightMax as string);
  
      if (!isNaN(minFloat) && !isNaN(maxFloat)) {
        const weightMin = Math.min(minFloat, maxFloat);
        const weightMax = Math.max(minFloat, maxFloat);
        params.append('weightRangeMin', weightMin.toString());
        params.append('weightRangeMax', weightMax.toString());
        hasFilters = true;
      } else {
        setFilterError("Invalid molecular weight values. Please ensure both are valid numbers.");
        return; // Stop further processing if error occurs
      }
    }
  
    // Validate and add successRateMin and successRateMax only if cellType is specified
    if (cellType && (successRateMin || successRateMax)) {
      if (successRateMin && successRateMax) {
        const successMinFloat = parseFloat(successRateMin as string);
        const successMaxFloat = parseFloat(successRateMax as string);
  
        if (
          !isNaN(successMinFloat) &&
          !isNaN(successMaxFloat) &&
          successMinFloat >= 0 &&
          successMinFloat <= 100 &&
          successMaxFloat >= 0 &&
          successMaxFloat <= 100
        ) {
          const successMin = Math.min(successMinFloat, successMaxFloat);
          const successMax = Math.max(successMinFloat, successMaxFloat);
          params.append('successRateMin', successMin.toString());
          params.append('successRateMax', successMax.toString());
          hasFilters = true;
        } else {
          setFilterError("Invalid success rate values. Please ensure both are valid percentages between 0 and 100.");
          return; // Stop further processing if error occurs
        }
      } else if (successRateMin) {
        const successMinFloat = parseFloat(successRateMin as string);
  
        if (!isNaN(successMinFloat) && successMinFloat >= 0 && successMinFloat <= 100) {
          params.append('successRateMin', successMinFloat.toString());
          hasFilters = true;
        } else {
          setFilterError("Invalid success rate minimum. Please ensure it is a valid percentage between 0 and 100.");
          return; // Stop further processing if error occurs
        }
      } else if (successRateMax) {
        const successMaxFloat = parseFloat(successRateMax as string);
  
        if (!isNaN(successMaxFloat) && successMaxFloat >= 0 && successMaxFloat <= 100) {
          params.append('successRateMax', successMaxFloat.toString());
          hasFilters = true;
        } else {
          setFilterError("Invalid success rate maximum. Please ensure it is a valid percentage between 0 and 100.");
          return; // Stop further processing if error occurs
        }
      }
    }

    const redirectUrl = hasFilters ? `/filter/${params.toString()}` : '/database';
    if (pathname !== redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      setFilterError("This filter has already been applied")
      return;
    }
  };

  const resetFilters = () => {
    setChemicalClasses([]);
    setFoundOnGRASList(undefined);
    setMolecularWeightMin("");
    setMolecularWeightMax("");
    setCellType("");
    setSuccessRateMin("");
    setSuccessRateMax("");
    setReset(true);
  };

  return (
    <Accordion type="single" defaultValue="item-1" collapsible className="w-full px-4 mb-3 rounded-md text-sm font-medium border bg-background shadow-xs dark:hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
        <AccordionItem value="item-1">
            <AccordionTrigger>Filter Entries</AccordionTrigger>
            <AccordionContent className="border-t border-color pt-4 flex flex-col gap-4">
                {filterError && (
                  <div>
                    <p className="flex gap-1 items-center">
                      <TriangleAlert height={18} />
                      {filterError}
                    </p>
                    <div className="border-t border-color opacity-[0.4] mx-4 mt-3" />
                  </div>
                )}
                <ChemClass 
                  chemClassFilters={chemClassFilters} 
                  chemicalClasses={chemicalClasses} 
                  setChemicalClasses={setChemicalClasses}
                  reset={reset} 
                  setReset={setReset}
                />

                <div className="border-t border-color opacity-[0.4] mx-4" />

                <GrasList 
                  foundOnGRASList={foundOnGRASList} 
                  setFoundOnGRASList={setFoundOnGRASList} 
                />

                <div className="border-t border-color opacity-[0.4] mx-4" />

                <MolecularWeight 
                  molecularWeightMin={molecularWeightMin} 
                  setMolecularWeightMin={setMolecularWeightMin} 
                  molecularWeightMax={molecularWeightMax} 
                  setMolecularWeightMax={setMolecularWeightMax} 
                />

                <div className="border-t border-color opacity-[0.4] mx-4" />

                <CellComponent 
                  cellTypeFilters={cellTypeFilters} 
                  cellType={cellType} 
                  setCellType={setCellType} 
                  successRateMin={successRateMin} 
                  setSuccessRateMin={setSuccessRateMin} 
                  successRateMax={successRateMax} 
                  setSuccessRateMax={setSuccessRateMax} 
                />

                <div className="flex items-center gap-2 mt-2">
                  <Button onClick={applyFilters} variant="outline" className="w-[170px]">
                    Apply Filters
                    <ArrowDownWideNarrow />
                  </Button>

                  <Button onClick={resetFilters} variant="secondary" className="w-[170px]">
                    Reset Filters
                    <FunnelX />
                  </Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  );
}

export default FilterPopup;