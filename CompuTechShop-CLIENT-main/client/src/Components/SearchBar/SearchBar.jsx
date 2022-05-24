import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchBar.module.css";
import { getProductsByName, getProductsSearchbar } from "../../Redux/Actions/index";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  useEffect(()=> {
    dispatch(getProductsSearchbar())
  }, [dispatch])

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getProductsByName(name));
    setName("");
    navigate("/search/" + name);
  }
  let products = useSelector((state) => state.searchBar)
  products = products.filter(e => e.quantity > 0)
  // console.log(products)

  return (
    <div className={styles.searchBarContainer}>
      {/* <input
        className={styles.searchBarInput}
        value={name}
        type="text"
        placeholder="Search Product..."
        onChange={(e) => handleInputChange(e)}
      /> */}
      <Stack spacing={0} sx={{ width: 600}}>
      <Autocomplete
        id="free-solo-2-demo"
        options={products.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            focus='false'
            value={name}
            variant='filled'
            onChange={(e) => handleInputChange(e)}
            onSelect={handleInputChange}
            {...params}
            placeholder="Search product..."
            InputProps={{
              disableUnderline: true,
              ...params.InputProps,
              type: 'search',
              style: { height: 35, alignContent:'center', backgroundColor:'transparent'}
            }}
          />
        )}
      />
    </Stack>
      <button
        className={styles.searchBarButton}
        type="submit"
        onClick={(e) => handleSubmit(e)}
        disabled={name === "" ? true : false}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
