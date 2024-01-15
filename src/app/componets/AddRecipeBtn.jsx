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
      <form className={`${showAddFrom ? "show" : "hidden"} absolute top-1/3 left-1/3 flex flex-col gap-2`} action="">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Description" />
        <input type="text" />
      </form>
    </>
  );
}
