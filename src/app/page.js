import AddRecipeBtn from './componets/AddRecipeBtn'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-20" >
      <h1 className="text-4xl font-bold text-center">Recipe app</h1>
      <div className='mt-8 flex justify-between w-full'>
        <h4>All Recipe</h4>
        <AddRecipeBtn />
      </div>

    </main>
  )
}
