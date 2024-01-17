import Link from "next/link";
import AddRecipe from "./componets/AddRecipe";
import RecipeDelete from "./componets/RecipeDelete";

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
  // console.log(recipes);

  return (
    <main className="flex min-h-screen flex-col items-center w-[80%] mx-auto mt-6">
      <div className="mt-8 flex justify-between w-full">
        <h4>All Recipe</h4>
        <AddRecipe />
      </div>

      {/*=============RECIPE SHOWING================ */}
      <div className="w-full mt-6">
        <div>
          <table class="w-full border-blue-50 border border-blue-50">
            <thead>
              <tr class="bg-gray-200 text-right">
                <th class="py-2 px-4 border-r">ID</th>
                <th class="py-2 px-4 border-r w-2/6">Title</th>
                <th class="py-2 px-4 border-r">Desciption</th>
                <th class="py-2 px-4 w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes?.map((recipe, index) => (
                <tr key={index} class="hover:bg-gray-50 text-right ">
                  <td class="py-2 px-4 border-r">{recipe.id}</td>
                  <td class="py-2 px-4 border-r">{recipe.title}</td>
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
          </table>
        </div>
      </div>
    </main>
  );
}
