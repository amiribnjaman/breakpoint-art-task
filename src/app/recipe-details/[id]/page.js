"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

let selectedItems = [];
export default function page() {
  const router = useRouter();
  const param = useParams();
  const [ingredient, setIngredient] = useState(null);
  const { id } = param;

  /***
   *
   * FETCHING A SPECIFIC RECIPE THROUGH ID
   */
  useEffect(() => {
    fetch(`/api/recipe/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setIngredient(data.recipe);
        selectedItems = data.recipe.ingredients.map(
          (ingredient) => ingredient.name
        );
      });
  }, []);

    return (
        <div className="w-[60%] mx-auto mt-8">
            <button onClick={()=>router.push('/')} className="text-[30px]">&#8592;</button>
        <div className="bg-gray-100 w-full rounded-lg p-4">
          <div>
            <h4 className="text-left text-[24px] capitalize font-semibold">
              {ingredient?.title}
            </h4>
          </div>
          <div className="flex gap-4 items-center">
            <h4 className="text-left font-semibold text-[15px] underline">
              Ingredients:
            </h4>
            <ul class="py-2 px-4 border-r flex gap-2 text-right justify-left">
              {ingredient?.ingredients.map((ingredient) => (
                <li className="bg-[#dcdede] px-[8px] py-[2px] rounded text-[13px]">
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          <p class="py-2 px-4 w-full mx-auto bg-gray-50 rounded mt-4 text-left">
            <span className="text-[15px] font-semibold"> Instruction: </span> {ingredient?.description}
          </p>
        </div>
      </div>
    );
}
