import Carousel from "react-bootstrap/Carousel";
import "./RecipeCarousel.css";
import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../../services/get";
// import ExampleCarouselImage from "components/ExampleCarouselImage";

const RecipeCarusele = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRecipes();
        console.log("Data from API:", data); // Log data received from the API
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Carousel>
      {recipes.map((recipe, index) => (
        <Carousel.Item key={index}>
          <img
            src={recipe.image}
            alt={recipe.name}
            className="recipe-carousel-image"
          />
          <Carousel.Caption>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>{" "}
            {/* Assuming your recipe object has a description property */}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default RecipeCarusele;