import { NextRequest, NextResponse } from "next/server";
import MainDB from "@/lib/schemas/schema";


// Define TypeScript interfaces
interface Entry {
  hash: string;
  name: string;
  overview: string;
  structure_image?: string;
}

interface IndexResponse {
  filter: string[];
  uniqueCellTypes: string[];
  entries: Entry[];
  total: number;
  page: number;
  totalPages: number;
}

// GET /api/index-database?page=1&limit=10
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    //const limit = parseInt(searchParams.get("limit") || "10", 10);
    const limit = Math.min(parseInt(searchParams.get("limit") || "10", 10), 36);

    // Validate pagination parameters
    if (page < 1 || limit < 1) {
      return NextResponse.json({ error: "Invalid page or limit" }, { status: 400 });
    }

    // Fetch unique cell types
    const cellTypes = await MainDB.aggregate([
      { $unwind: "$cell_info" },
      { $match: { "cell_info.cellType": { $ne: null } } },
      { $group: { _id: "$cell_info.cellType" } },
      { $sort: { _id: 1 } },
    ]);

    const uniqueCellTypes = cellTypes.map((item) => item._id);

    // Fetch unique classes
    const classes = await MainDB.distinct("class", { class: { $ne: "" } });

    // Fetch paginated entries
    const skip = (page - 1) * limit;
    const entries = await MainDB.find({}, "name hash overview structure_image")
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await MainDB.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        filter: classes,
        uniqueCellTypes,
        entries,
        total,
        page,
        totalPages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching entries." },
      { status: 500 }
    );
  }
}