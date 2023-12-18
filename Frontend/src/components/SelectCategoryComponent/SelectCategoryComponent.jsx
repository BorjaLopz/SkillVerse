import { useState } from "react";
import { categories } from "../../config";
import "./style.css";

function SelectCategoryComponent({ handleChangeSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    handleChangeSelect(category); // Llamar a la función de manejo de cambio con la categoría seleccionada
  };

  // const [categorySelected, setCategorySelected] = useState(
  //   "Todas las categorías"
  // );

  // const handleChangeSelect = (e) => {
  //   setCategorySelected(e);
  //   console.log("selectedOption");
  //   console.log(e.target.value);
  // };

  // return (
  //   <section className="custom-select">
  //     <select onChange={handleChangeSelect}>
  // {categories.map((c) => {
  //   return <option value={c}>{c}</option>;
  // })}
  //     </select>
  //   </section>
  // );

  return (
    <div className={`dropdown-container ${isOpen ? "dropdown-open" : ""}`}>
      {selectedCategory ? (
        <button className="dropdown-button" onClick={toggleDropdown}>
          {`${selectedCategory}`}
        </button>
      ) : (
        <button className="dropdown-button" onClick={toggleDropdown}>
          Selecciona una categoria
        </button>
      )}

      {isOpen && (
        <div className="dropdown-menu">
          {categories.map((c) => {
            return (
              <div
                key={c}
                onClick={() => handleCategoryClick(c)}
                className="optionDropdown"
              >
                {c}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SelectCategoryComponent;
