import AddRecipeBtn from "./componets/AddRecipeBtn";

/**
 * GETTING ALL RECIPE DATA
 * @returns ALL RECIPE
 */
const allRecipe = async () => {
  try {
    const res = await fetch(`${process.env.URL}/api/recipe`, {
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
  console.log(recipes);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-20">
      <h1 className="text-4xl font-bold text-center">Recipe app</h1>
      <div className="mt-8 flex justify-between w-full">
        <h4>All Recipe</h4>
        <AddRecipeBtn />
      </div>
      <div>
        <div>{recipes?.map((recipe) => recipe.title)}</div>
      </div>
    </main>
  );
}
