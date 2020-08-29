import React from "react";

const Image = ({ image }) => {
  // Extract the variables
  const { largeImageURL, likes, previewURL, tags, views } = image;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card">
        <img src={previewURL} alt={tags} className="card-img-top" />

        <div className="card-body">
          <p className="card-text">
            {likes}{" "}
            <span role="img" aria-label="Thumbs Up">
              👍
            </span>
          </p>

          <p className="card-text">
            {views}{" "}
            <span role="img" aria-label="eye">
              👁️
            </span>
          </p>
        </div>

        <div className="card-footer">
          <a
            href={largeImageURL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-block"
          >
            See Image
          </a>
        </div>
      </div>
    </div>
  );
};

export default Image;
