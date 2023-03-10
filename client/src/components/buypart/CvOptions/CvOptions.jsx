import React from "react";

import "./CvOptions.css";

const CvOptions = (props) => {
  const options = [
    { text: "Stationary", handler: props.actionProvider.handleOptionFile, id: 1 },
    { text: "Canteen", handler: props.actionProvider.handleOptionCanteen, id: 2 },
    


  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="cv-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="cv-options-container">{optionsMarkup}</div>;
};

export default CvOptions;