import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Model, ModelVariant } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  const params = new URL(req.url).searchParams;
  try {
    const makes = await prisma.make.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    let models: Model[] = [];
    if (params.get("make")) {
      models = await prisma.model.findMany({
        where: {
          make: { id: Number(params.get("make")) },
        },
      });
    }

    let modelVariants: ModelVariant[] = [];
    if (params.get("make") && params.get("model")) {
      modelVariants = await prisma.modelVariant.findMany({
        where: {
          model: { id: Number(params.get("model")) },
        },
      });
    }

    const lvMakes = makes.map((item) => {
      return { label: item.name, value: item.id.toString() };
    });
    const lvModels = models.map((item) => {
      return { label: item.name, value: item.id.toString() };
    });
    const lvModelVariants = modelVariants.map((item) => {
      return { label: item.name, value: item.id.toString() };
    });

    return NextResponse.json(
      {
        makes: lvMakes,
        models: lvModels,
        modelVariants: lvModelVariants,
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
