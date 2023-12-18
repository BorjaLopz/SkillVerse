import { useState } from "react";
import { categories } from "../../config";
import "./style.css";

function SelectCategoryComponent({ handleChangeSelect }) {
  // const [categorySelected, setCategorySelected] = useState(
  //   "Todas las categorías"
  // );

  // const handleChangeSelect = (e) => {
  //   setCategorySelected(e);
  //   console.log("selectedOption");
  //   console.log(e.target.value);
  // };

  return (
    <section className="custom-select">
      <select onChange={handleChangeSelect}>
        {categories.map((c) => {
          return <option value={c}>{c}</option>;
        })}
      </select>
    </section>
  );
}

export default SelectCategoryComponent;
