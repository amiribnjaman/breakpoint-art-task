"use client";

import React, { useState } from "react";

export default function AddRecipeBtn() {
  const [showAddFrom, setShowAddForm] = useState(false);
  return (
    <>
      <button
        className="bg-green-600 px-4 py-2 text-white rounded"
        onClick={() => setShowAddForm(!showAddFrom)}
      >
        Add a Recipe
      </button>

      {/*=====================*/}
      <form
        className={`${
          showAddFrom ? "show" : "hidden"
        } absolute top-[130px] left-[450px] flex flex-col gap-2 w-[350px] min-h-[200px] bg-[#f2f6f3] px-3 py-4 rounded `}
        action=""
          >
              <h3 className="text-center text-xl mb-2">Add a new Recipe</h3>
        <input className="px-2 py-1.5" type="text" placeholder="Name" />
        <input className="px-2 py-1.5" type="text" placeholder="Ingredients" />
        <input className="px-2 py-1.5 bg-white" type="file" />
              <textarea name="" id="" cols="10" rows="4"></textarea>
              <input type="submit" value="Add Recipe" className="cursor-pointer bg-green-600 text-white mt-3 rounded py-1.5" />
      </form>
    </>
  );
}
