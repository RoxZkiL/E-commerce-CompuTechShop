import React, { useState, useEffect } from "react";
import {
  postProducts,
  getCategories,
  getProducts,
} from "../../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import styles from "./ProductCreate.module.css";
import { Link } from "react-router-dom";
import AdminNav from "../../AdminNav/AdminNav";
import AdminNav2 from "../../AdminNav/AdminNav2";
import ProductCardAdmin from "../ProductCardAdmin/ProductCardAdmin";
import ProductDetailAdminCard from "../Detail/ProductDetailAdminCard";
import Swal from "sweetalert2";
import Footer from '../../../Footer/Footer'

function ProductCreate() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const allProductsCheck = useSelector((state) => state.allProducts);
  const [errors, setErrors] = useState({});
  const Swal = require('sweetalert2')

  const [input, setInput] = useState({
    name: "",
    price: "",
    quantity: "",
    brand: "",
    calification: "0",
    image: "",
    description: "",
    categories: "",
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postProducts(input));
    Swal.fire({
      title: 'Product created!',
      icon: 'success',
      confirmButtonText: 'Ok',
    })
    setInput({
      name: "",
      price: "",
      quantity: "",
      brand: "",
      calification: "0",
      image: "",
      description: "",
      categories: "",
    });
  }

  function validate(input) {
    let errors = {};
    let existent = false;
    allProductsCheck.map((p) =>
      p.name === input.name ? (existent = true) : null
    );
    if (existent) {
      errors.name = "That product already exists.";
    }
    if (!/^[A-Z]/.test(input.name)) {
      errors.name = "First letter must be uppercase";
    }
    if (input.name.length > 130) {
      errors.name = "Max 130 characters";
    }
    if (!input.name) {
      errors.name = "Name required";
    }
    if (input.brand.length > 20) {
      errors.brand = "Max 20 characters";
    }
    if (!input.brand) {
      errors.brand = "Brand required";
    }
    if (!/^[A-Z]/.test(input.description)) {
      errors.description = "First letter must be uppercase";
    }
    if (input.description.length > 5000) {
      errors.description = "Max 5000 characters";
    }
    if (!input.description) {
      errors.description = "Description required";
    }
    if (!input.price || input.price > 1000000) {
      errors.price = "1000000 max";
    }
    if (!input.price || input.price < 0) {
      errors.price = "Price must be > 0";
    }
    if (!input.price) {
      errors.price = "Price required";
    }
    // if (!input.calification || input.calification > 10) {
    //   errors.calification = "10 max";
    // }
    // if (!input.calification || input.calification < 0) {
    //   errors.calification = "Calification must be > 0";
    // }
    // if (!input.calification) {
    //   errors.calification = "Calification required";
    // }
    if (!input.quantity || input.quantity < 0) {
      errors.quantity = "Quantity must be > 0";
    }
    if (!input.quantity || input.quantity > 1000) {
      errors.quantity = "1000 max";
    }
    if (!input.quantity) {
      errors.quantity = "Quantity required";
    }
    if (!input.image.length) {
      errors.image = "Link image required";
    }
    if (!input.image) {
      errors.image = "Image required";
    }
    if (!input.categories) {
      errors.categories = "Category required";
    }
    return errors;
  }

  return (
    <div className={styles.productCreate}>
      <AdminNav />
      <AdminNav2 />
      <div className={styles.updateProductContainer}>
        <Box
          className={styles.form}
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "45ch",
              color: "white",
              display: "flex",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <h3 style={{ textAlign: "center" }}>Create Product:</h3>
            <TextField
              variant="filled"
              required
              id="outlined-required"
              label="Name"
              name="name"
              onChange={handleChange}
              error={errors.name ? true : false}
              helperText={errors.name}
              value={input.name}
            />
            <TextField
              variant="filled"
              required
              name="brand"
              onChange={handleChange}
              id="outlined-required"
              label="Brand"
              error={errors.brand ? true : false}
              value={input.brand}
              helperText={errors.brand}
            />
            {/* <TextField
            variant="filled"
            required
            name="calification" 
            onChange={handleChange} 
            error={errors.calification ? true : false}
            helperText={errors.calification}
            value={input.calification}
            id="outlined-number"
            type="number"
            label="Calification" // Tiene que ser 0 al principio...
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
            <TextField
              variant="filled"
              name="quantity"
              onChange={handleChange}
              id="outlined-number"
              label="Quantity"
              type="number"
              error={errors.quantity ? true : false}
              helperText={errors.quantity}
              value={input.quantity}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              variant="filled"
              required
              id="outlined-multiline-static"
              name="description"
              onChange={handleChange}
              label="Description"
              multiline
              rows={3}
              value={input.description}
              error={errors.description ? true : false}
              helperText={errors.description}
            />
            <TextField
              variant="filled"
              required
              id="outlined-multiline-static"
              name="image"
              onChange={handleChange}
              label="Image"
              rows={1}
              multiline
              value={input.image}
              error={errors.image ? true : false}
              helperText={errors.image}
            />
            <TextField
              variant="filled"
              id="filled-select-currency"
              name="categories"
              select
              label="Category"
              defaultValue=""
              value={input.categories}
              error={errors.categories ? true : false}
              helperText={errors.categories}
              onChange={handleChange}
            >
              {categories.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="filled"
              name="price"
              onChange={handleChange}
              id="outlined-number"
              label="Price"
              type="number"
              value={input.price}
              error={errors.price ? true : false}
              helperText={errors.price}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className={styles.createButton}>
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="outlined"
                disabled={
                  errors.name ||
                  errors.brand ||
                  errors.quantity ||
                  errors.description ||
                  errors.image ||
                  errors.categories ||
                  errors.price ||
                  input.name === ""
                    ? true
                    : false
                }
              >
                Create Product
              </Button>
            </div>
          </div>
        </Box>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <h3>New product Card</h3>
            <ProductCardAdmin
              name={input.name}
              price={input.price}
              image={input.image}
            />
          </div>
        </div>
      </div>
      <h3 style={{ textAlign: "center" }}>New product Detail</h3>
      <ProductDetailAdminCard
        nameD={input.name}
        image={input.image}
        price={input.price}
        brand={input.brand}
        quantity={input.quantity}
        description={input.description}
        calification={false}
        category={input.categories}
      />
      <Footer />
    </div>
  );
}

export default ProductCreate;
