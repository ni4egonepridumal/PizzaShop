import React from "react";
import ContentLoader from "react-content-loader";

const PizzaLoadingBlock = () => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="121" cy="151" r="120" />
      <rect x="0" y="290" rx="4" ry="4" width="244" height="20" />
      <rect x="0" y="332" rx="6" ry="6" width="244" height="65" />
      <rect x="104" y="415" rx="20" ry="20" width="142" height="38" />
      <rect x="0" y="415" rx="3" ry="3" width="91" height="37" />
    </ContentLoader>
  );
};

export default PizzaLoadingBlock;
