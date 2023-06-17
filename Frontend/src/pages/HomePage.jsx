import React from "react";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";
import useServer from "../hooks/useServer";



function HomePage() {
  const { error, loading } = useServer;
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
