"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function page() {
  const router = useRouter();
  const param = useParams();
  const { id } = param;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  /**
   * EDIT RECIPE FORM HANDLER
   * @param {*} data getting the all data
   * @returns
   */
  const handleEidtRecipeForm = async (d) => {
    const data = {
      title: d.title,
      description: d.description,
      ingredients: d.ingredients.split(","),
    };
    const res = await fetch(`/api/recipe/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      toast.success("Recipe updated Successfully!");
      router.push("/");
      router.refresh();
    }

    reset();
  };

  return (
    <div className="w-[60%] mx-auto mt-12">
      {/*===========EDIT RECIPE FORM==========*/}
      <form
        onSubmit={handleSubmit(handleEidtRecipeForm)}
        className={` left-[420px] flex flex-col gap-2 w-[80%] mx-auto min-h-[200px] bg-[#f2f6f3] px-4 py-5 rounded-lg `}
        action=""
      >
        {/*============FORM HEADING============ */}
        <div className="flex justify-between mb-2 items-center">
          <h3 className="text-center text-xl">Edit Recipe</h3>
        </div>
        <input
          {...register("title", { required: true })}
          aria-invalid={errors.title ? "true" : "false"}
          className="px-2 py-1.5"
          type="text"
          placeholder="Recipe title"
        />
        {/*============REPORT NAME FIELD ERROR============= */}
        {errors.title?.type === "required" && (
          <p
            className="font-semibold text-[12px] text-red-400 tracking-widest focus:outline-none"
            role="alert"
          >
            Recipe title is required.
          </p>
        )}
        <input
          {...register("ingredients", { required: true })}
          aria-invalid={errors.ingredients ? "true" : "false"}
          className="px-2 py-1.5"
          type="text"
          // onChange={handleSuggestion}
          placeholder="Ingredients"
        />
        {/* <ul>
          {suggestion.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul> */}
        {/*============REPORT INGREDIENTS FIELD ERROR============= */}
        {errors.ingredients?.type === "required" && (
          <p
            className="font-semibold text-[12px] text-red-400 tracking-widest focus:outline-none"
            role="alert"
          >
            Atleast one ingredients is must.
          </p>
        )}
        {/* <input
          {...register("image", { required: false })}
          className="px-2 py-1.5 bg-white"
          type="file"
        /> */}
        <textarea
          aria-invalid={errors.description ? "true" : "false"}
          cols="10"
          rows="4"
          className="p-3"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description?.type === "required" && (
          <p
            className="font-semibold text-[12px] text-red-400 tracking-widest focus:outline-none"
            role="alert"
          >
            Description field is must.
          </p>
        )}

        <input
          type="submit"
          value="Edit"
          className="cursor-pointer bg-green-600 text-white mt-3 rounded py-1.5"
        />
      </form>
    </div>
  );
}
