import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import ImageList from "./components/ImageList";

function App() {
  // API state
  const [search, saveSearch] = useState("");
  const [images, saveImages] = useState([]);
  const [actualPage, saveActualPage] = useState(1);
  const [totalPages, saveTotalPages] = useState(1);

  useEffect(() => {
    const consultAPI = async () => {
      if (search === "") return;

      const imagesPerPage = 10;
      const key = "18095190-f940ec0cf0fd95da16bce0743";
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${actualPage}`;

      const answer = await fetch(url);
      const result = await answer.json();

      saveImages(result.hits);

      // Calculate total pages
      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      saveTotalPages(calculateTotalPages);

      // Move to the top
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };

    consultAPI();
  }, [search, actualPage]);

  // Define the previous page
  const previousPage = () => {
    const newActualPage = actualPage - 1;

    if (newActualPage === 0) return;

    saveActualPage(newActualPage);
  };

  // Define the next page
  const nextPage = () => {
    const newActualPage = actualPage + 1;

    if (newActualPage > totalPages) return;

    saveActualPage(newActualPage);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="text-center mb-5">
          Incredible free images to download
        </h1>

        <Form saveSearch={saveSearch} />
      </div>

      <div className="row justify-content-center">
        <ImageList images={images} />

        {actualPage === 1 ? null : (
          <button
            type="button"
            className="btn mr-1 btn-success mb-5"
            onClick={previousPage}
          >
            &laquo; Prev
          </button>
        )}

        {actualPage === totalPages ? null : (
          <button
            type="button"
            className="btn btn-success mb-5"
            onClick={nextPage}
          >
            Next &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
