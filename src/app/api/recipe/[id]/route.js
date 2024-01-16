import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * DELETE A NEW RECIPE
 * @param {*} req USER REQUESTED DATA
 * @param {*} res RESPONSE
 * @returns
 */
export async function DELETE(req, res) {
  const urlParts = req.url.split("/");
  const idIndex = urlParts.indexOf("recipe") + 1;
  const id = urlParts[idIndex];

  await prisma.ingredient.deleteMany({
    where: {
      recipeId: parseInt(id),
    },
  });

  const deleteRecipe = await prisma.recipe.deleteMany({
    where: {
      id: parseInt(id),
    },
  });

  console.log(deleteRecipe);

  return NextResponse.json({
    success: true,
    msg: "Recipe delete successfully",
    deleteRecipe,
  });
}
