import Link from "next/link";
import AddRecipe from "./componets/AddRecipe";
import RecipeDelete from "./componets/RecipeDelete";
import RecipeDetails from "./componets/RecipeDetails";

/**
 * GETTING ALL RECIPE DATA
 * @returns ALL RECIPE
 */
const allRecipe = async () => {
  try {
    const res = await fetch(`${process.env.URL}/api/recipe`, {
      cache: "no-cache",
      method: "GET",
    });
    const recipe = await res.json();
    return recipe.data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

export default async function Home() {
  const recipes = await allRecipe();

  return (
    <main className="flex min-h-screen flex-col items-center w-[80%] mx-auto mt-6">
      <div className="mt-8 flex justify-between w-full items-center">
        <h4>All Recipe</h4>
        <AddRecipe />
      </div>

      {/*=============RECIPE SHOWING================ */}
      <div className="w-full mt-6">
        <div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6 ">
            {recipes?.map((recipe, index) => (
              <div className="bg-gray-100 w-full rounded-lg p-4 shadow-md">
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
                <div class="py-2 px-4 flex justify-center mt-4 gap-4 text-right">
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
            ))}
          </div>
          {/* <table class="w-full border-blue-50 border border-blue-50">
            <thead>
              <tr class="bg-gray-200 text-right">
                <th class="py-2 px-4 border-r">ID</th>
                <th class="py-2 px-4 border-r w-2/6">Title</th>
                <th class="py-2 px-4 border-r">Ingredients</th>
                <th class="py-2 px-4 border-r">Desciption</th>
                <th class="py-2 px-4 w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes?.map((recipe, index) => (
                <tr key={index} class="hover:bg-gray-50 text-right ">
                  <td class="py-2 px-4 border-r">{recipe.id}</td>
                  <td class="py-2 px-4 border-r">{recipe.title}</td>
                  <td class="py-2 px-4 border-r flex gap-2 text-right justify-end">
                    {recipe.ingredients.map((ingredient) => (
                      <span className="bg-[#dcdede] px-[6px] py-[1px] rounded text-[12px]">
                        {ingredient.name}
                      </span>
                    ))}
                  </td>
                  <td class="py-2 px-4 border-r">{recipe.description}</td>
                  <td class="py-2 px-4 flex justify-end gap-4 text-right">
                    <RecipeDelete id={recipe.id} />
                    <Link href={`edit-recipe/${recipe.id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-blue-600 cursor-pointer"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    </main>
  );
}
