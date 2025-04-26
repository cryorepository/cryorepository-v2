// /app/api/filter_database/route.ts
import { NextRequest, NextResponse } from "next/server";
import MainDB from "@/lib/schemas/schema";
import mongoose from "mongoose";

// Define interfaces for input and output
interface FilterInput {
  selectedClasses?: string | string[];
  weightRangeMin?: string;
  weightRangeMax?: string;
  successRateMin?: string;
  successRateMax?: string;
  cellType?: string;
  GRAS?: string | boolean;
}

interface RequestBody {
  filters: FilterInput;
}

interface Article {
  name: string;
  hash: string;
  class?: string;
  overview: string;
  structure_image?: string;
  molecular_weight?: string;
  sorted_cell_info?: { cellType: string; successRate: string }[];
  gras_info?: { found: boolean };
}

interface ResponseData {
  results: Article[];
  classes: string[];
  uniqueCellTypes: string[];
}

interface ErrorResponse {
  message: string;
  error: unknown;
}

// Use Mongoose's PipelineStage type
type PipelineStage = mongoose.PipelineStage;

export async function POST(req: NextRequest) {
  try {
    const { filters }: RequestBody = await req.json();
    const {
      selectedClasses,
      weightRangeMin,
      weightRangeMax,
      successRateMin,
      successRateMax,
      cellType,
      GRAS,
    } = filters;

    const parsedSuccessRateMin = successRateMin ? parseFloat(successRateMin) : null;
    const parsedSuccessRateMax = successRateMax ? parseFloat(successRateMax) : null;

    const query: { class?: any } = {};
    if (selectedClasses) {
      query.class = Array.isArray(selectedClasses)
        ? { $in: selectedClasses }
        : selectedClasses;
    }

    // Explicitly type pipeline as PipelineStage[]
    const pipeline: PipelineStage[] = [
      {
        $addFields: {
          parsed_molecular_weight: {
            $cond: {
              if: {
                $regexMatch: {
                  input: "$molecular_weight",
                  regex: /^[0-9]+(\.[0-9]+)?/,
                },
              },
              then: {
                $toDouble: {
                  $ifNull: [
                    { $arrayElemAt: [{ $split: ["$molecular_weight", " "] }, 0] },
                    null,
                  ],
                },
              },
              else: null,
            },
          },
          sorted_cell_info: {
            $filter: {
              input: "$cell_info",
              as: "info",
              cond: {
                $and: [
                  parsedSuccessRateMin !== null
                    ? { $gte: [{ $toDouble: "$$info.successRate" }, parsedSuccessRateMin] }
                    : true,
                  parsedSuccessRateMax !== null
                    ? { $lte: [{ $toDouble: "$$info.successRate" }, parsedSuccessRateMax] }
                    : true,
                  cellType
                    ? {
                        $regexMatch: {
                          input: "$$info.cellType",
                          regex: new RegExp(`^${cellType.trim()}$`, "i"),
                        },
                      }
                    : true,
                ],
              },
            },
          },
        },
      },
    ];

    if (weightRangeMin || weightRangeMax) {
      pipeline.push({
        $match: {
          parsed_molecular_weight: {
            ...(weightRangeMin ? { $gte: parseFloat(weightRangeMin) } : {}),
            ...(weightRangeMax ? { $lte: parseFloat(weightRangeMax) } : {}),
          },
        },
      });
    }

    if (GRAS !== undefined) {
      let isGRAS: boolean | undefined;
      if (GRAS === "true" || GRAS === true) {
        isGRAS = true;
        pipeline.push({
          $match: {
            gras_info: { $exists: true },
            "gras_info.found": isGRAS,
          },
        });
      } else if (GRAS === "false" || GRAS === false) {
        isGRAS = false;
        pipeline.push({
          $match: {
            gras_info: { $exists: true },
            "gras_info.found": isGRAS,
          },
        });
      } else {
        pipeline.push({
          $sort: {
            "gras_info.found": -1,
          },
        });
      }
    }

    if (Object.keys(query).length > 0) {
      pipeline.push({ $match: query });
    }

    if (parsedSuccessRateMin || parsedSuccessRateMax || cellType) {
      pipeline.push({
        $match: { "sorted_cell_info.0": { $exists: true } },
      });
    }

    pipeline.push(
      { $sort: { "sorted_cell_info.successRate": -1 } },
      {
        $project: {
          name: 1,
          hash: 1,
          class: 1,
          overview: 1,
          structure_image: 1,
          sorted_cell_info: 1,
          molecular_weight: 1,
        },
      }
    );

    const results = await MainDB.aggregate(pipeline);
    const classes = await MainDB.distinct("class", { class: { $ne: "" } });
    const cellTypes = await MainDB.aggregate([
      { $unwind: "$cell_info" },
      { $match: { "cell_info.cellType": { $ne: null } } },
      { $group: { _id: "$cell_info.cellType" } },
      { $sort: { _id: 1 } },
    ]);

    const uniqueCellTypes = cellTypes.map((item) => item._id);

    return NextResponse.json(
      { results, classes, uniqueCellTypes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error fetching articles", error },
      { status: 500 }
    );
  }
}