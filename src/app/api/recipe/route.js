import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: true,
  },
};

/**
 * POST A NEW RECIPE
 * @param {*} req USER REQUESTED DATA
 * @param {*} res RESPONSE
 * @returns
 */
export async function POST(req, res) {
  try {
    const data = await req.json();
    const recipe = await prisma.recipe.create({
      data: {
        title: data.title,
        description: data.description,
      },
      include: {
        ingredients: true,
      },
    });

    await Promise.all(
      data.ingredients.map(async (ingredient) => {
        return prisma.ingredient.create({
          data: {
            name: ingredient,
            recipe: {
              connect: {
                id: recipe.id,
              },
            },
          },
        });
      })
    );

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
