import React from 'react'
import styles from './CategoriesAdmin.module.css'
import { Link } from 'react-router-dom'
import { getCategories } from '../../../../Redux/Actions'
import {Box, TextField, MenuItem, Button } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function CategoriesAdmin() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories)
    const navigate = useNavigate();
    const {Allproducts} = useParams();
    const {category} = useParams();
    const [categorySelect, setCategorySelect] = useState('Select')
    
    useEffect(() => {
        dispatch(getCategories());
        setCategorySelect(category ? category : 'Allproducts' ? 'Select' : '')
    }, [dispatch, Allproducts, category]);
    
    const setBrand = new Set();
    const unicBrand = categories.reduce((acc, category) => {
        if (!setBrand.has(category.name)) {
            setBrand.add(category.name, category);
            acc.push(category);
        }
        return acc;
    }, []);
    
    const brandMap = unicBrand.map((el) => el.name);
    
      function handleCategorySelect(e) {
        e.preventDefault();
        setCategorySelect(e.target.value)
        navigate(e.target.value === 'Allproducts' ? `/admin/products/Allproducts` : `/admin/products/${e.target.value}`)
      }

  return (
    <nav className={styles.navCategories}>
        <div className={styles.categories}>
            <div className={styles.category}>
                <Link to='/admin/products/Allproducts'>
                    <img src="https://img.icons8.com/ios-filled/100/ffffff/package-delivery-logistics.png" alt="categoryLogo"/>
                </Link>   
                <span>All Products</span>
            </div>
            <div className={styles.category}>
                <Link to='/admin/products/Laptops'>
                    <img src="https://img.icons8.com/ios-filled/100/ffffff/laptop.png" alt="categoryLogo"/>
                </Link>
                <span>Laptops</span>
            </div>
            <div className={styles.category}>
                <Link to='/admin/products/Monitors'>
                    <img src="https://img.icons8.com/ios-filled/100/ffffff/imac.png" alt="categoryLogo"/>
                </Link>
                <span>Monitors</span>
            </div>
            <div className={styles.category}>
                <Link to='/admin/products/Mouses'>
                    <img src="https://img.icons8.com/ios-filled/100/ffffff/generic-mouse.png" alt="categoryLogo"/>
                </Link>
                <span>Mouses</span>
            </div>
            <div className={styles.category}>
                <Link to='/admin/products/Headsets'>
                    <img src="https://img.icons8.com/ios-filled/100/ffffff/headset.png" alt="categoryLogo"/>
                </Link>
                <span>Headsets</span>
            </div>
            <div className={styles.category}>
                <Link to='/admin/products/Keyboards'>
                    <img src="https://img.icons8.com/ios/100/ffffff/keyboard.png" alt="categoryLogo"/>
                </Link>   
                <span>Keyboards</span>
            </div> 
            <div className={styles.filterByBrand}>
            <TextField
                    sx={{
                        '& > :not(style)': { m: 1, display: 'flex', width: '17ch', color:'white', position: 'absolute'},
                    }}
                    variant="standard"
                    id="outlined-select-currency"
                    name="categories"
                    select
                    value={categorySelect}
                    onChange={(e) => handleCategorySelect(e)}
                > 
                        <MenuItem disabled value='Select'>All Categories</MenuItem>
                        <MenuItem value='Allproducts'>All Products</MenuItem>
                    {brandMap.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
            </TextField>
            </div>  
        </div>
    </nav>
  )
}

export default CategoriesAdmin