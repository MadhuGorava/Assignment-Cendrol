import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [joke, setJoke] = useState("");

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.chucknorris.io/jokes/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const fetchRandomJoke = async () => {
    try {
      const response = await axios.get(
        `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`
      );
      setJoke(response.data.value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchRandomJoke();
  };

  return (
    <div className="app-container">
      <header>
        <h1 className="header">Chuck Norris Jokes</h1>
      </header>
      <section>
        <ul className="list-items">
          {categories.map((category, index) => (
            <li key={index} onClick={() => handleCategorySelect(category)}>
              {category}
            </li>
          ))}
        </ul>
      </section>
      <section>
        {selectedCategory && (
          <div className="text-container">
            <p>{joke}</p>
            <button onClick={fetchRandomJoke}>Get Another Joke</button>
          </div>
        )}
      </section>
      <footer>
        <p>&copy; 2023 Chuck Norris</p>
      </footer>
    </div>
  );
};

export default App;
