"use client";
import { useRouter } from "next/navigation";
import React, { useReducer } from "react";

const NewUserPage = () => {
  const router = useRouter();

  return (
    <button className="btn btn-primary" onClick={() => router.push("/users")}>
      Create
    </button>
  );
};

export default NewUserPage;
