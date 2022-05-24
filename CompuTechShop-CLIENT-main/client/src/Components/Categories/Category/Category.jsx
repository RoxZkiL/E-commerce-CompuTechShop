import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, getProducts } from "../../../Redux/Actions";
import Categories from "../Categories";
import ProductCard from "../../ProductCard/ProductCard";
import Filter from "../../Filter/Filter";
import PaginationC from "../../Pagination/PaginationC";
import Loader from "../../Loader/Loader";
import styles from "./Category.module.css";
import ProductNotFound from "../../ProductNotFound/ProductNotFound";
import { useParams } from "react-router-dom";
import { TYPES } from "../../../Redux/Actions/shoppingCartActions";
import NavBar from "../../NavBar/Navbar";
import Footer from "../../Footer/Footer";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

function Category() {
  const { category } = useParams();
  const dispatch = useDispatch();
  let products = useSelector((state) => state.products);
  const productsCart = useSelector((state) => state.cart)
  let productsFilter = useSelector((state) => state.productsFilter);
  productsFilter = productsFilter.filter(e => e.quantity > 0)
  // products = productsFilter.length > 0 ? productsFilter : products;
  const currentPage = useSelector((state) => state.currentPage);
  const productsPerPage = 6;
  const indexLastProduct = currentPage * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const currentProducts =
    productsFilter?.length > 0
      ? productsFilter.slice(indexFirstProduct, indexLastProduct)
      : null;
  const totalPages = Math.ceil(productsFilter.length / productsPerPage);

  useEffect(() => {
    dispatch(filterByCategory(category));
  }, [dispatch, category]);

  const addToCart = (id) => {
    let itemCarrito = productsCart.find(el => el.id === id)
    if (!itemCarrito) {
      dispatch({ type: TYPES.ADD_TO_CART, payload: id })
    }
  }

  const [load, setLoad] = useState(true)

  setTimeout(function () {
    setLoad(false)
  }, 1000)

  return (
    <div className={styles.category}>
      <NavBar />
      <Categories />
      {products.length > 0 ? (
        <>
          <div className={styles.productsContainer}>
            <Filter />
            <div className={styles.productsCardsContainer}>
              {
                load ?
                  <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%' }} />
                  : productsFilter.length > 0 ? (
                    currentProducts.map((el) => {
                      return (
                        <ProductCard
                          name={el.name}
                          price={el.price}
                          image={el.image}
                          id={el.id}
                          key={el.id}
                          brand={el.brand}
                          description={el.description}
                          calification={el.calification}
                          quantity={el.quantity}
                          addToCart={addToCart}
                          wishlist={true}
                        />
                      );
                    })
                  ) :
                    load ?
                      <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%' }} />
                      :
                      <ProductNotFound />
              }
            </div>
          </div>
          {productsFilter.length > 0 && !load ? (
            <PaginationC category={category} totalPages={totalPages} />
          ) : null}
        </>
      ) : load ?
        <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%' }} />
        :
        <ProductNotFound />
      }
      <Footer />
    </div>
  );
}

export default Category;
