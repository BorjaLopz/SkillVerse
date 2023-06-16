import React from "react";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";

function HomePage() {
  if (loading)
    return (
      <p>
        <Loading />
      </p>
    );
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <PageTitle />
      <SearchBar />
      {/* <section>Contenido de la página, logo, fotos, etc</section> */}
    </>
  );
}

export default HomePage;
