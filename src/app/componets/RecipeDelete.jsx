"use client";

import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RecipeDelete({ id, reload, setReload }) {
  const router = useRouter();

  const handleRecipeDelete = async () => {
    const res = await fetch(`/api/recipe/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.success) {
      toast.success("Recipe Deleted Successfully!");
      router.refresh();
      // router.push('/')
      setReload(!reload);
    }
  };
  return (
    <div>
      <button
        className="bg-red-100 px-3 py-1 rounded"
        onClick={handleRecipeDelete}
      >
        Delete
      </button>
    </div>
  );
}
