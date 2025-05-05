"use client"
import { Input } from "@/components/ui/input"

interface MWComponentProps {
  molecularWeightMin: number | string;
  setMolecularWeightMin: (value: number | string) => void;
  molecularWeightMax: number | string;
  setMolecularWeightMax: (value: number | string) => void;
}

export function MolecularWeight({ 
  molecularWeightMin,
  setMolecularWeightMin,
  molecularWeightMax,
  setMolecularWeightMax,
}: MWComponentProps) {

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
  
    // Only allow digits
    if (!/^\d*$/.test(raw)) return;
  
    const value = Number(raw);
    if (value > 100000) return;
    if (value < 0) return;
  
    setMolecularWeightMin(raw);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
  
    // Only allow digits
    if (!/^\d*$/.test(raw)) return;
  
    const value = Number(raw);
    if (value > 100000) return;
    if (value < 0) return;
  
    setMolecularWeightMax(raw);
  };
  
  return (
    <div className="flex flex-wrap items-center gap-2 whitespace-nowrap">
        Molecular weight of
        <Input className="w-24" type="text" placeholder="10" value={molecularWeightMin} onChange={handleMinChange} />
        g/mol to
        <Input className="w-24" type="text" placeholder="23.5" value={molecularWeightMax} onChange={handleMaxChange} />
        g/mol.
    </div>
  )
}
