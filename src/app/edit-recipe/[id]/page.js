"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

let selectedItems = [];
export default function page() {
  const router = useRouter();
  const param = useParams();
  const [suggestion, setSuggestion] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState(null);
  const [inputText, setInputText] = useState("");
  const [inputValues, setInputValues] = useState({
    title: ingredient?.title,
    description: ingredient?.description,
  });
  const { id } = param;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

    /***
     *
     * FETCHING INGREDIENTS USING USEMEMO
     */
    fetch("/ingredients.json")
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data);
      });
  }, []);

  /**
   * EDIT RECIPE FORM HANDLER
   * @param {*} data getting the all data
   * @returns
   */
  const handleEidtRecipeForm = async (d) => {
    const data = {
      title: d.title || ingredient.title,
      description: d.description || ingredient.description,
      ingredients: selectedItems,
      img: ingredient.img
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

  /**
   * HANDLE SUGGESTION FUNCTION
   * @param {*} event getting event
   */
  const handleSuggestion = (event) => {
    const text = event.target.value.toLowerCase();
    const filteredSuggestion = ingredients.filter((ingredient) =>
      ingredient.label.toLowerCase().includes(text)
    );
    setInputText(text);
    setSuggestion(filteredSuggestion);
  };

  /**
   * SUGGESTION VALUE SELECTION HANDLE FUNCTION
   * @param {*} suggestion
   */
  const handleSuggestionClick = (selectedItem) => {
    // selectedItem();
    selectedItems.push(selectedItem);
    setSuggestion([]);
  };

  /**
   * REMOVE SELECTED RECIPE INGREDIENTS
   * @param {*} getting the clicked item
   */
  const deleteSelectedItem = (item) => {
    const index = selectedItems.indexOf(item);
    selectedItems.splice(index, 1);
    setSuggestion([]);
  };

  return (
    <div className="w-[60%] mx-auto my-8 pb-8">
      {/*==============GO BACK ARROW SIGN============== */}
      <div className="w-[80%] mx-auto mb-2">
        <button onClick={() => router.back()} className="text-[30px]">
          &#8592;
        </button>
      </div>
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
          {...register("title", { required: false })}
          className="px-2 py-1.5"
          type="text"
          value={inputValues?.title || ingredient?.title}
          onChange={(e) =>
            setInputValues({ ...inputValues, title: e.target.value })
          }
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

        {/*=============SHOWING SELECTED INGREDIENTS======= */}
        {selectedItems.length > 0 && (
          <div className="flex gap-3 mt-2">
            {selectedItems.map((item, index) => (
              <div className="bg-[#dcdede] px-[6px] py-[1px] rounded text-[12px] relative">
                {item}
                {selectedItems.length > 1 && (
                  <div
                    className="absolute cursor-pointer top-[-8px] right-[-5px] text-[15px]"
                    onClick={() => deleteSelectedItem(item)}
                  >
                    &times;
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <input
          {...register("ingredients", { required: false })}
          aria-invalid={errors.ingredients ? "true" : "false"}
          className="px-2 py-1.5"
          type="text"
          onChange={handleSuggestion}
          placeholder={ingredient?.ingredients.map(
            (ingredient) => ingredient?.name + " , "
          )}
        />
        {/*================ INGREDIENTS SUGGESTION============= */}
        <div
          className={`${
            inputText.length > 0 && suggestion.length > 0 ? "show" : "hidden"
          } relative`}
        >
          <ul className="absolute top-[0px] bg-[#f6faff] w-[80%] overflow-y-auto max-h-[220px] rounded-lg py-4 px-2">
            {suggestion.map((suggestion, index) => (
              <li
                onClick={() => handleSuggestionClick(suggestion.label)}
                key={index}
                className="cursor-pointer hover:bg-white px-2 py-1 rounded"
              >
                {suggestion.label}
              </li>
            ))}
          </ul>
        </div>
        {/*============REPORT INGREDIENTS FIELD ERROR============= */}
        {errors.ingredients?.type === "required" && (
          <p
            className="font-semibold text-[12px] text-red-400 tracking-widest focus:outline-none"
            role="alert"
          >
            Atleast one ingredients is must.
          </p>
        )}
        <textarea
          cols="10"
          rows="4"
          className="p-3"
          {...register("description", { required: false })}
          value={inputValues?.description || ingredient?.description}
          onChange={(e) =>
            setInputValues({ ...inputValues, description: e.target.value })
          }
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
