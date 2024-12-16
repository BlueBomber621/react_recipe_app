import React from "react";
import PropTypes from "prop-types";

const Recipe = ({ title, image, ingredients, servings, summary }) => {
  return (
    <div className="recipe">
      <h1>{title}</h1>
      <img src={image} alt={title} />
      <p>Servings: {servings}</p>
      <ul>
        {ingredients.map((ingredient) => (
          <li>{ingredient.original}</li>
        ))}
      </ul>
      <p dangerouslySetInnerHTML={{ __html: summary }}></p>
    </div>
  );
};

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  servings: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
};

export default Recipe;
