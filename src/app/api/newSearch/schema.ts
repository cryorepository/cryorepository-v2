// lib/schema.ts
import mongoose, { Schema, Document, Model, Connection } from 'mongoose';

interface IReference {
  organisation: string | null;
  reference: string | null;
  url: string | null;
}

interface ICellInfo {
  cellType: string | null;
  successRate: string | null;
  referenceURL: string | null;
}

interface IGrasInfo {
  found: boolean;
  reference_url: string | null;
}

interface IMainDB extends Document {
  name: string;
  hash: string;
  class: string;
  chemical_formula: string;
  chemical_formula_html: string;
  molecular_formula: string;
  molecular_formula_html: string;
  molecular_weight: string;
  optimal_conc: string;
  structure_image: string;
  cas_number: string;
  pricing_info: string[];
  safety_document_sheet: string;
  written_by: string[];
  raw_text: string;
  html_text: string;
  overview: string;
  tags: string;
  version: string;
  synonyms: string[];
  references: IReference[];
  cell_info: ICellInfo[];
  gras_info: IGrasInfo;
  date_written: Date;
  date_uploaded: Date;
}

const mainDBConnection: Connection = mongoose.createConnection(process.env.MAIN_DB_URI || '');

mainDBConnection.once('open', () => {
  console.log('Connected to main database - READ ONLY');
});

const dataSchema: Schema = new mongoose.Schema({
  name: { type: String, index: true },
  hash: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  class: String,
  chemical_formula: String,
  chemical_formula_html: String,
  molecular_formula: String,
  molecular_formula_html: String,
  molecular_weight: String,
  optimal_conc: String,
  structure_image: String,
  cas_number: String,
  pricing_info: [{ type: Schema.Types.Mixed }],
  safety_document_sheet: String,
  written_by: [{ type: String }],
  raw_text: String,
  html_text: String,
  overview: String,
  tags: String,
  version: String,
  synonyms: [{ type: String }],
  references: [
    {
      organisation: { type: String, default: null },
      reference: { type: String, default: null },
      url: { type: String, default: null },
    },
  ],
  cell_info: [
    {
      cellType: { type: String, default: null },
      successRate: { type: String, default: null },
      referenceURL: { type: String, default: null },
    },
  ],
  gras_info: {
    found: { type: Boolean, required: true },
    reference_url: { type: String, required: false },
  },
  date_written: Date,
  date_uploaded: {
    type: Date,
    required: true,
  },
});

// Create text index with weights (run once, e.g., in a setup script)
dataSchema.index({
  name: 'text',
  synonyms: 'text',
  overview: 'text',
  tags: 'text',
  written_by: 'text',
  'references.reference': 'text',
}, {
  weights: {
    name: 10, // Highest weight for title
    synonyms: 8,
    overview: 5,
    tags: 3,
    written_by: 2,
    'references.reference': 1,
  },
  name: 'TextIndex',
});

const MainDB: Model<IMainDB> = mainDBConnection.model<IMainDB>('MainDB', dataSchema);

export default MainDB;