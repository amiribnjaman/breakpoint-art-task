import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: true,
  },
};

/**
 * POST/CREATE A NEW RECIPE
 * @param {*} req USER REQUESTED DATA
 * @param {*} res RESPONSE
 * @returns
 */
export async function POST(req, res) {
  try {
    const data = await req.json();
    console.log(data)
    const recipe = await prisma.recipe.create({
      data: {
        title: data.title,
        description: data.description,
        ingredients: {
          create: data.ingredients.map((ingredient) => ({
            name: ingredient,
          })),
        },
      },

      include: {
        ingredients: true,
      },
    });

    console.log(recipe);
    return NextResponse.json({
      success: true,
      msg: "Recipe created successfully",
      recipe,
    });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

/**
 * GET ALL RECIPE DATA
 * @param {*} req USER REQUESTED DATA
 * @param {*} res RESPONSE
 * @returns
 */
export async function GET(req, res) {
  try {
    const data = await prisma.recipe.findMany({
      include: {
        ingredients: true,
      },
    });
    return NextResponse.json({
      success: true,
      msg: "Data retrive successfully",
      data,
    });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}


