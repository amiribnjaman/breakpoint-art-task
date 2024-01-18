"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

      });
  }, []);

  return (
    <div className="w-[60%] mx-auto mt-8 pb-8">
      <div className="flex justify-between my-1 items-center">
        {/*=============BACK ARROW ICON & EDIT RECIPE PAGE LINK============== */}
        <button onClick={() => router.back()} className="text-[30px]">
          &#8592;
        </button>
        <Link
          className="bg-[#cae2ea] px-6 py-1.5 rounded"
          href={`/edit-recipe/${ingredient?.id}`}
        >
          Edit
        </Link>
      </div>
      <div className="bg-gray-100 w-full rounded-lg p-4 mb-12">
        <div className="h-[180px] bg-gray-100 rounded-tl rounded-tr">
          <Image
            src={ingredient?.img}
            className="w-[400px] h-[200px] "
            alt=""
            width="100"
            height="150"
          />
        </div>
        <div className="mt-12">
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
          <span className="text-[15px] font-semibold"> Instruction: </span>{" "}
          {ingredient?.description}
        </p>
      </div>
    </div>
  );
}
