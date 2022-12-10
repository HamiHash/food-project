import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card.js";
import MealItem from "./MealItem/MealItem";
import { useCallback, useEffect, useState } from "react";

const AvailableMeals = () => {
  const [curMeals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMealsHandler = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://food-project-c03a0-default-rtdb.europe-west1.firebasedatabase.app/Meals.json"
      );
      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();
      const meals = Object.values(data).map((meal) => {
        return {
          name: meal.name,
          description: meal.description,
          price: meal.price,
        };
      });
      setMeals(meals);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  const mealsList = curMeals.map((meal) => {
    return (
      <MealItem
        key={Math.random().toFixed(5)}
        id={Math.random().toFixed(5)}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!error) {
    content = <ul>{mealsList}</ul>;
  }
  if (error) {
    content = <p>Something Went wrong</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
