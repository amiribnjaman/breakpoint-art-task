"use client";
import Link from "next/link";
import AddRecipe from "./componets/AddRecipe";
import RecipeDelete from "./componets/RecipeDelete";
import Search from "./componets/Search";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filteredValue, setFilteredValue] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    try {
      fetch(`/api/recipe`, {
        cache: "no-cache",
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setRecipes(data.data);
        });
    } catch (error) {
      console.error("Error fetching recipe:", error);
      throw error;
    }
  }, [reload]);

  return (
    <main className="flex min-h-screen flex-col items-center w-[80%] mx-auto mt-6">
      <div className="mt-8 flex justify-between w-full items-center">
        <div className="flex gap-4">
          <h4>All Recipe</h4>
          {/*================SEARCH FIELD============ */}
          <Search setFilteredValue={setFilteredValue} recipes={recipes} />
        </div>
        <AddRecipe reload={reload} setReload={setReload} />
      </div>

      {/*=============RECIPE SHOWING================ */}
      <div className="w-full mt-6">
        <div>
          <div className="grid grid-cols-4 gap-x-4 gap-y-6 ">
            {filteredValue?.length > 0
              ? filteredValue?.map((recipe) => (
                  <div className="bg-gray-100  shadow">
                    <div className="h-[180px] bg-gray-100 rounded-tl rounded-tr">
                      <img
                        src={recipe?.img}
                        className="w-full h-[150px] "
                        alt=""
                      />
                    </div>
                    <div className="bg-gray-100 w-full rounded-lg p-4 pt-2 shadow-md">
                      <div>
                        <h4 className="text-center text-[20px] capitalize font-semibold">
                          {recipe?.title}
                        </h4>
                      </div>
                      <div>
                        <h4 className="text-center font-semibold text-[13px] mt-4 underline">
                          Ingredients
                        </h4>
                        <ul class="py-2 px-4 border-r flex gap-2 text-right justify-center">
                          {recipe.ingredients.map((ingredient) => (
                            <li className="bg-[#dcdede] px-[6px] py-[1px] rounded text-[12px]">
                              {ingredient.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p class="py-1 px-4 w-[90%] mx-auto bg-gray-50 rounded mt-2 text-left">
                        <span className="text-[15px] font-semibold pr-4">
                          Instruction:
                        </span>
                        {recipe?.description}
                      </p>
                      <div class="py-2 px-4 flex justify-center mt-4 gap-2 text-right">
                        <Link
                          className="bg-gray-300 px-3 py-1 rounded"
                          href={`recipe-details/${recipe.id}`}
                        >
                          Details
                        </Link>
                        <RecipeDelete
                          reload={reload}
                          setReload={setReload}
                          id={recipe.id}
                        />
                        <Link
                          className="bg-[#cae2ea] px-4 py-1 rounded"
                          href={`edit-recipe/${recipe.id}`}
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              : recipes?.map((recipe, index) => (
                  <div className="bg-gray-100  shadow">
                    <div className="h-[180px] bg-gray-100 rounded-tl rounded-tr">
                      <img
                        src={recipe?.img}
                        className="w-full h-[150px] "
                        alt=""
                      />
                    </div>
                    <div className="w-full rounded-lg p-4 shadow-md">
                      <div>
                        <h4 className="text-center text-[20px] capitalize font-semibold">
                          {recipe?.title}
                        </h4>
                      </div>
                      <div>
                        <h4 className="text-center font-semibold text-[13px] mt-4 underline">
                          Ingredients
                        </h4>
                        <ul class="py-2 px-4 border-r flex gap-2 text-right justify-center">
                          {recipe.ingredients.map((ingredient) => (
                            <li className="bg-[#dcdede] px-[6px] py-[1px] rounded text-[12px]">
                              {ingredient.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p class="py-2 px-4 w-[90%] mx-auto bg-gray-50 rounded mt-4 text-left">
                        <span className="text-[15px] font-semibold pr-4">
                          Instruction:
                        </span>
                        {recipe?.description}
                      </p>
                      <div class="py-2 px-4 flex justify-center mt-4 gap-2 text-right">
                        <Link
                          className="bg-gray-300 px-3 py-1 rounded"
                          href={`recipe-details/${recipe.id}`}
                        >
                          Details
                        </Link>
                        <RecipeDelete id={recipe.id} />
                        <Link
                          className="bg-[#cae2ea] px-4 py-1 rounded"
                          href={`edit-recipe/${recipe.id}`}
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {recipes.length < 1 && (
            <p className="text-center mt-12 text-xl">There is no Recipe.</p>
          )}
        </div>
      </div>
    </main>
  );
}
