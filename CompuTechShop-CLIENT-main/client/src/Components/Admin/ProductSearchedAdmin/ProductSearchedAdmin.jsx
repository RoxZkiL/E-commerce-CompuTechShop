import React, { useEffect }  from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductsByName } from '../../../Redux/Actions'
import Filter from '../../Filter/Filter'
import ProductCardAdmin from '../Products/ProductCardAdmin/ProductCardAdmin'
import PaginationCAdmin from '../Products/Pagination/PaginationCAdmin'
import ProductNotFound from '../../ProductNotFound/ProductNotFound'
import styles from './ProductSearchedAdmin.module.css'
import CategoriesAdmin from '../Products/Categories/CategoriesAdmin'
import AdminNav from '../AdminNav/AdminNav'
import AdminNav2 from '../AdminNav/AdminNav2'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import Footer from '../../Footer/Footer'
import { useState } from "react";
import { CircularProgress } from "@mui/material";

function ProductSearched() {
  let products = useSelector((state) => state.allProducts); 
  const productsFilter = useSelector((state) => state.productsFilter);
  products = productsFilter.length > 0 ? productsFilter : products;
  const dispatch = useDispatch();
  const {search} = useParams();

  // Pagination Info //
  const currentPage = useSelector((state) => state.currentPage)
  const productsPerPage = 6;
  const indexLastProduct = currentPage * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const currentProducts = products.slice(indexFirstProduct, indexLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    dispatch(getProductsByName(search))
  }, [dispatch, search]);
 // End Pagination //

 const [load, setLoad] = useState(true)

 setTimeout(function () {
  setLoad(false)
}, 1000)

  
  return (
    <div className={styles.searched}>
      <AdminNav/>
      <AdminNav2/>
      <CategoriesAdmin />
      <Link to='/admin/products/createProduct'>
        <Button variant="outlined" className={styles.create}>Create Product</Button>
      </Link>
      {
        productsFilter.length > 0 ?
        <>
      <div className={styles.productsContainer}>
        <Filter />
        <div className={styles.productsCardsContainer}>
          {          
            load ? 
              <CircularProgress color="inherit" style={{position:'absolute', top:'50%', left:'50%'}}/>
          : productsFilter.length > 0 ?
            currentProducts.map((el) => {
            return (
                <ProductCardAdmin 
                    key={el.id}
                    name={el.name} 
                    price={el.price} 
                    image={el.image} 
                    id={el.id} 
                    brand={el.brand} 
                    description={el.description} 
                    calification={el.calification} 
                    quantity={el.quantity}
                    update={true}
                    delet={true}
                    />
              )
            })
            : <ProductNotFound />
          }
        </div>
      </div>
          {
            productsFilter.length > 0 && !load ?
              <PaginationCAdmin
                category={search}
                totalPages={totalPages}
              />
          : null
          }
        </>
          : 
          <div className={styles.productNotFoundContainer}>
            <ProductNotFound/>
          </div>
      }
      <Footer/>
    </div>
  )
}

export default ProductSearched