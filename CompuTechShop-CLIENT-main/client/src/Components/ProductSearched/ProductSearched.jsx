import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductsByName } from '../../Redux/Actions'
import Categories from '../Categories/Categories'
import Filter from '../Filter/Filter'
import ProductCard from '../ProductCard/ProductCard'
import PaginationC from '../Pagination/PaginationC.jsx'
import ProductNotFound from '../ProductNotFound/ProductNotFound'
import styles from './ProductSearched.module.css'
import NavBar from '../NavBar/Navbar'
import Footer from '../Footer/Footer'
import CircularProgress from '@mui/material/CircularProgress';
import { TYPES } from "../../Redux/Actions/shoppingCartActions";


function ProductSearched() {
  let products = useSelector((state) => state.allProducts);
  let productsFilter = useSelector((state) => state.productsFilter);
  const productsCart = useSelector((state) => state.cart)
  productsFilter = productsFilter.filter(e => e.quantity > 0)
  products = productsFilter.length > 0 ? productsFilter : products;
  const dispatch = useDispatch();
  const { search } = useParams();

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
  const addToCart = (id) => {
    let itemCarrito = productsCart.find(el => el.id === id)
    if (!itemCarrito) {
      dispatch({ type: TYPES.ADD_TO_CART, payload: id })
    }
  }

  return (
    <div className={styles.searched}>
      <NavBar />
      <Categories />
      {
        products.length > 0 ?
          <>
            <div className={styles.productsContainer}>
              <Filter />
              <div className={styles.productsCardsContainer}>
                {
                  load ?
                    <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%' }} />
                    :
                    productsFilter.length > 0 ?
                      currentProducts.map((el) => {
                        return (
                          <ProductCard
                            key={el.id}
                            name={el.name}
                            price={el.price}
                            image={el.image}
                            id={el.id}
                            brand={el.brand}
                            description={el.description}
                            calification={el.calification}
                            quantity={el.quantity}
                            wishlist={true}
                            addToCart={addToCart}
                          />
                        )
                      })
                      : <ProductNotFound />
                }
              </div>
            </div>
            {
              productsFilter.length > 0 && !load ?
                <PaginationC
                  category={search}
                  totalPages={totalPages}
                />
                : null
            }
          </>
          :
          load ?
            <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%' }} />
            :
            <div className={styles.productNotFoundContainer}>
              <ProductNotFound />
            </div>
      }
      <Footer />
    </div>
  )
}

export default ProductSearched