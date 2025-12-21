import styles from "./SearchField.module.css";

const SearchField = ({ value, onChange, placeholder="Find your dish..."}) => {
  
  return (
    <div className={styles.wrapper}>
      <input
        value={value}
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchField;
