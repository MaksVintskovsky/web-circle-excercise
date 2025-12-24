import {  useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import MenuItem from "../components/MenuItem/MenuItem.jsx";

import styles from "./RestaurantView.module.css";
import NavBar from "../components/NavBar/NavBar.jsx";
import SearchField from "../components/SearchField/SearchField.jsx";
import Wishlist from "../components/Wishlist/Wishlist.jsx";

const RestaurantView = () => {
  const [dishes, setDishes] = useState([]);
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const fetchMeals = async (searchTerm) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`
    );
    const data = await res.json();
    setDishes(data.meals ?? []);
  };

  const debouncedSearch = useDebouncedCallback(
    (searchTerm) => {
      fetchMeals(searchTerm);
    },
    800
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const addDishToWishlist = (dish) => {
    const isAlreadyInWishlist = wishlist.some((d) => d.idMeal === dish.idMeal);
    if (isAlreadyInWishlist) {
      setWishlist(wishlist.filter((d) => d.idMeal !== dish.idMeal));
    } else {
      setWishlist([...wishlist, dish]);
    }
  }
  const removeDishFromWishlist = (dish) => {
    setWishlist(wishlist.filter((d) => d.idMeal !== dish.idMeal));
  }
  const toggleWishlist = (dish) => {
    const isAlreadyInWishlist = wishlist.some((d) => d.idMeal === dish.idMeal);
    if (isAlreadyInWishlist) {
      removeDishFromWishlist(dish);
    } else {
      addDishToWishlist(dish);
    }
  }

  return (
    <>
      <NavBar>
        <h1>ReDI React Restaurant</h1>

        <SearchField 
          value={query}
          onChange={setQuery}
          placeholder="Search for your favorite dish..."
        />
        <Wishlist wishlist={wishlist} />
      </NavBar>

      <div className={styles.restaurantWrapper}>
        <div className={styles.menu}>
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <MenuItem
                key={dish.idMeal}
                dish={dish}
                isInWishlist={wishlist.some((d) => d.idMeal === dish.idMeal)}
                onToggleWishlist={toggleWishlist}
              />
            ))
          ) : (
            <p>No dishes found :</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantView;
