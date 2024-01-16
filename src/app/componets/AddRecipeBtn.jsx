"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddRecipeBtn() {
  const [showAddFrom, setShowAddForm] = useState(false);
  const [suggestion, setSuggestion] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [inputText, setInputText] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("/ingredients.json")
      .then((res) => res.json())
      .then((data) => setIngredients(data));
  }, []);

  /**
   * Add Recipe Form Handler
   * @param {*} data getting the all data
   * @returns
   */
  const handleAddRecipeForm = async (d) => {
    const data = {
      title: d.title,
      description: d.description,
      ingredients: d.ingredients.split(","),
    };
    const res = await fetch("/api/recipe", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.success) {
      toast.success("New Recipe created Successfully!");
      router.refresh();
      setShowAddForm(!showAddFrom);
    }

    reset();
  };

  const handleSuggestion = (event) => {
    const text = event.target.value.toLowerCase();
    console.log(text);
    const filteredSuggestion = ingredients.filter((ingredient) =>
      // console.log()
      ingredient.label.toLowerCase.includes(text)
    );
    setInputText(text);
    setSuggestion(filteredSuggestion);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
    setSuggestion([]);
  };

  return (
    <>
      <button
        className="bg-green-600 px-4 py-2 text-white rounded"
        onClick={() => setShowAddForm(!showAddFrom)}
      >
        Add a Recipe
      </button>

      {/*===========ADD RECIPE FORM==========*/}
      <form
        onSubmit={handleSubmit(handleAddRecipeForm)}
        className={`${
          showAddFrom ? "show" : "hidden"
        } absolute top-[110px] left-[420px] flex flex-col gap-2 w-[450px] min-h-[200px] bg-[#f2f6f3] px-4 py-5 rounded-lg `}
        action=""
      >
        {/*============FORM HEADING============ */}
        <div className="flex justify-between mb-2 items-center">
          <h3 className="text-center text-xl">Add a new Recipe</h3>
          <div className="text-4xl">
            <button onClick={() => setShowAddForm(!showAddFrom)}>
              &times;
            </button>
          </div>
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
        <ul>
          {suggestion.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
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
          value="Add Recipe"
          className="cursor-pointer bg-green-600 text-white mt-3 rounded py-1.5"
        />
      </form>
    </>
  );
}
