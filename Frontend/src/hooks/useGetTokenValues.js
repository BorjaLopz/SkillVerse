import { useEffect, useState } from "react";
import { localStorageKey } from "../config";

function useGetTokenValues() {
  const object = localStorage.getItem(localStorageKey);
  // console.log(object);
  const objectParsed = JSON.parse(object);
  // console.log(objectParsed);

  // const decoded = jwt(objectParsed);
  // console.log(decoded);

  return objectParsed.token;
}

export default useGetTokenValues;
