import React from "react";
import ViewComments from "./ViewComments";
import AddComment from "./AddComment";

function Service() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Service</h1>
      <ViewComments />
      <AddComment />
    </>
  );
}

export default Service;
 