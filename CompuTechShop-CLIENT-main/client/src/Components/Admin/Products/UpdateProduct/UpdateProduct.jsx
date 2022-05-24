import React, { useState, useEffect } from 'react';
import { updateProduct, getCategories, getDetail } from '../../../../Redux/Actions'
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import styles from './UpdateProduct.module.css'
import AdminNav from '../../AdminNav/AdminNav';
import ProductCardAdmin from '../ProductCardAdmin/ProductCardAdmin';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNav2 from '../../AdminNav/AdminNav2';
import ProductDetailAdminCard from '../Detail/ProductDetailAdminCard'
import Swal from 'sweetalert2'
import Footer from '../../../Footer/Footer';



function UpdateProduct() {
  const dispatch = useDispatch();
  const {name} = useParams();
  const product = useSelector ((state) => state.productDetail);
  const categories = useSelector((state) => state.categories)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  const Swal = require('sweetalert2')



  useEffect(() => {
    dispatch(getCategories());
    dispatch(getDetail(name))
  }, [dispatch, name]);

  const [input, setInput] = useState({
    name: '',
    price: '', 
    quantity: '',
    brand: '',
    // calification: '',
    image: '',
    description: '',
    categories: ''
  })



  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value,
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value,
  }));
  }

  function handleChangeSelect(e) {
    setInput({
      ...input,
      [e.target.name] : [e.target.value]
    })
  }

  function handleCopy(e) {
    e.preventDefault()
    setInput({
      name: product[0].name,
      price: product[0].price, 
      quantity: product[0].quantity,
      brand: product[0].brand,
      calification: product[0].calification,
      image: product[0].image,
      description: product[0].description,
      categories: product[0].category,
    })
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateProduct(product[0].id, input));
    setErrors({});
    Swal.fire({
      title: 'Product Updated!',
      icon: 'success',
      confirmButtonText: 'Ok',
    })
    dispatch(getDetail(input.name))
    setInput({
      name: '',
      price: '', 
      quantity: '',
      brand: '',
      calification: '',
      image: '',
      description: '',
      categories: '',
    })
  }

  function validate(input) {
    let errors = {};
     if (!/^[A-Z]/.test(input.name)) {
        errors.name = 'First letter must be uppercase';
    } if (input.name.length > 130) {
        errors.name = 'Max 130 characters'; 
    } if (!input.name) {
        errors.name = 'Name required';
    } if (input.brand.length > 20) {
        errors.brand = 'Max 20 characters'; 
    } if (!input.brand) {
        errors.brand = 'Brand required';
    } if (!/^[A-Z]/.test(input.description)) {
      errors.description = 'First letter must be uppercase';
    } if (input.description.length > 5000) {
        errors.description = 'Max 5000 characters'; 
    } if (!input.description) {
        errors.description = 'Description required';
    } if (!input.price || input.price > 1000000) {
        errors.price = '1000000 max';
    } if (!input.price || input.price < 0) {
        errors.price = 'Price must be > 0';
    } if (!input.price) {
        errors.price = 'Price required';
    // } if (!input.calification || input.calification > 10) {
    //     errors.calification = '10 max';
    // } if (!input.calification || input.calification < 0) {
    //     errors.calification = 'Calification must be > 0';
    // } if (!input.calification) {
    //     errors.calification = 'Calification required';
    }  if (!input.quantity || input.quantity < 0) {
        errors.quantity = 'Quantity must be > 0';
    }  if (!input.quantity || input.quantity > 1000) {
        errors.quantity = '1000 max';
    } if (!input.quantity) {
        errors.quantity = 'Quantity required';
    } if (!input.image.length) {
        errors.image = 'Link image required';
    } if (!input.image) {
        errors.image = 'Image required'
    } if (!input.categories) {
        errors.categories = 'Category required'
    }
    return errors;
}

  return (
    <div className={styles.updateProduct}>
      <AdminNav/>
      <AdminNav2/>
    {      
        product[0] ? 

    <div className={styles.updateProductContainer}>
        <Box
          className={styles.form}
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '45ch', color: "white", display: "flex" },
          }}
          noValidate
          autoComplete="off"
        >
        <div>
        <h3 style={{textAlign:'center'}}>Update Product:</h3>
          <TextField
            variant="filled"
            required
            id="outlined-required"
            label="Name"
            name="name" 
            onChange={(e) => handleChange(e)} 
            error={errors.name ? true : false}
            helperText={errors.name}
            value={input.name}
          />
          <TextField
            variant="filled"
            required
            name="brand" 
            onChange={(e) => handleChange(e)}  
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
            onChange={(e) => handleChange(e)}  
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
            onChange={(e) => handleChange(e)}  
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
            name="description" onChange={(e) => handleChange(e)}  
            label="Description"
            rows={3}
            multiline
            value={input.description}
            error={errors.description ? true : false}
            helperText={errors.description}
          />
          <TextField
            variant="filled"
            required
            id="outlined-multiline-static"
            name="image" 
            onChange={(e) => handleChange(e)}  
            label="Image"
            rows={1}
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
            value={[input.categories]}
            error={errors.categories ? true : false}
            helperText={errors.categories}
            onChange={(e) => handleChangeSelect(e)} 
          >
            {categories.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
            <TextField
              variant="filled"
              name="price" onChange={(e) => handleChange(e)}  
              id="outlined-number"
              label="Price"
              type="number"
              value={input.price}
              error={errors.price ? true : false}
              helperText={errors.price}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className={styles.coypyButton} >
              <Button type="submit" onClick={(e) => handleCopy(e)} variant="outlined">
                Copy actual product
              </Button>
            </div>
            <div className={styles.createButton} >
              <Button type="submit" onClick={handleSubmit} variant="outlined" disabled={errors.name || errors.brand  || errors.quantity || errors.description || errors.image || errors.categories || errors.price || input.name === '' ? true : false}>
                Update Product
              </Button>
            </div>
        </div>
      </Box>
          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <h3>Product Card updated</h3>
              <ProductCardAdmin name={input.name} price={input.price} image={input.image} calification={product[0].calification} style={{borderRadius:'50px'}}/>
            </div>
            </div>
        </div>
        : null
        }
        <h3 style={{textAlign:'center'}}>Product Detail updated</h3>
        <ProductDetailAdminCard nameD={input.name} image={input.image} price={input.price} brand={input.brand} quantity={input.quantity} description={input.description} category={input.categories} calification={input.calification} />
        <Footer />
    </div>
  )
}

export default UpdateProduct