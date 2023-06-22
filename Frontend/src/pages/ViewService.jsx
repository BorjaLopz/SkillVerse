import React from "react";
import ViewComments from "./ViewComments";
import AddComment from "./AddComment";

function Service() {
  return (
    <>
      <h2 className="text-3xl font-bold underline">Servicio</h2>
      <ViewComments />
      <AddComment />
    </>
  );
}

export default Service;
