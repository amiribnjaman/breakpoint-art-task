"use client";

import React, { useEffect } from "react";

export default function Search({ setFilteredValue, recipes }) {

  /**
   * HANDLE SEARCH FILTER FUCTION 
   * @param {*} e event
   * @returns 
   */ 
  const handleSearch = (e) => {
    let searchtitleResult, searchIngredientResult;
    const text = e.target.value.toLowerCase();
    searchtitleResult = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(text)
    );

    searchIngredientResult = recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.name.toLowerCase().includes(text)
      )
    );
    if (searchtitleResult.length > 0) {
      return setFilteredValue(searchtitleResult);
    } else if (searchIngredientResult.length > 0) {
      return setFilteredValue(searchIngredientResult);
    }
  };

  return (
    <div>
      <input
        onChange={(e) => handleSearch(e)}
        className="px-2 py-1.5 rounded w-[350px]"
        type="text"
        placeholder="Search by title or ingredient"
      />{" "}
    </div>
  );
}
