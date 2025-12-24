
import { useState } from "react";
import styles from "./Wishlist.module.css";

export default function Wishlist({ wishlist }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wishlistwrapper}>
      <div
        className={styles.wishlist}
        onClick={() => setOpen(!open)}
      >
        <h1>Your wishlist</h1>
        <div className={styles.wishlistCount}>
          {wishlist.length}
        </div>
        <span className={styles.arrow}>
          {open ? "▲" : "▼"}
        </span>
      </div>

      {open && (
        <ul className={styles.wishlistList}>
          {wishlist.map((dish) => (
            <li key={dish.idMeal}>
              <h3>{dish.strMeal}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
