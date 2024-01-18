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

/**
 * UPDATE AN EXISTING RECIPE
 * @param {*} req USER REQUESTED DATA
 * @param {*} res RESPONSE
 * @returns
 */
export async function PATCH(req, res) {
  const urlParts = req.url.split("/");
  const idIndex = urlParts.indexOf("recipe") + 1;
  const id = urlParts[idIndex];
  const data = await req.json();

  // console.log("length is " + data, data.ingredients.length);

  const result = await prisma.recipe.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: data?.title,
      description: data?.description,
      ingredients: {
        deleteMany: {}, // Delete all previous existing ingredients
        create:
          data.ingredients.length > 0
            ? data?.ingredients.map((ingredient) => ({
                name: ingredient,
              }))
            : [],
      },
      img: data.img,
    },

    include: {
      ingredients: true,
    },
  });

  return NextResponse.json({
    success: true,
    msg: "Recipe updated successfully",
    result,
  });
}

/**
 * GETTING A SPECIFIC DATA USING ID
 * @param {*} req USER REQUESTED DATA
 * @param {*} res RESPONSE
 * @returns
 */

export async function GET(req, res) {
  const urlParts = req.url.split("/");
  const idIndex = urlParts.indexOf("recipe") + 1;
  const id = urlParts[idIndex];
  // console.log(id);
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      ingredients: true,
    },
  });

  // console.log(recipe);
  return NextResponse.json({
    success: true,
    msg: "Recipe find successfully",
    recipe,
  });
}
