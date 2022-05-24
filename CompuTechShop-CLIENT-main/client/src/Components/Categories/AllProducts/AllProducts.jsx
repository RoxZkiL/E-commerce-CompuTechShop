import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../Redux/Actions";
import Categories from "../Categories";
import ProductCard from "../../ProductCard/ProductCard";
import Filter from "../../Filter/Filter";
import PaginationC from "../../Pagination/PaginationC";
import Loader from "../../Loader/Loader";
import styles from "./AllProducts.module.css";
import { TYPES } from "../../../Redux/Actions/shoppingCartActions";
import ProductNotFound from "../../ProductNotFound/ProductNotFound";
import NavBar from "../../NavBar/Navbar";
import Footer from "../../Footer/Footer";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

function AllProducts() {
  let products = useSelector((state) => state.allProducts);
  const productsFilter = useSelector((state) => state.productsFilter);
  const productsCart = useSelector((state) => state.cart)
  // const userActive = useSelector((state) => state.userActive);
  products = productsFilter.length > 0 ? productsFilter.filter(e => e.quantity > 0) : products;
  const dispatch = useDispatch();
  // const category = "allproducts";
  const category = "Allproducts";
  // console.log(userActive);

  // Pagination Info //
  const currentPage = useSelector((state) => state.currentPage);
  const productsPerPage = 6;
  const indexLastProduct = currentPage * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const currentProducts =
    products.length > 0
      ? products.slice(indexFirstProduct, indexLastProduct)
      : null;
  const totalPages = Math.ceil(products.length / productsPerPage);
  // console.log(produtsCart)
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  // End Pagination Info //
  const addToCart = (id) => {
    let itemCarrito = productsCart.find(el => el.id === id)
    if (!itemCarrito) {
      dispatch({ type: TYPES.ADD_TO_CART, payload: id })
    }
  };
  // const addToCart = (id) => {
  //   let mapeo = produtsCart.find((el) => el.id === id)
  //   // console.log(mapeo.quantityCart)
  //   console.log(id)
  //   if (mapeo.quantity > 0) { dispatch({ type: TYPES.ADD_TO_CART, payload: id }) }
  // }
  const delFromCart = (id, all = false) => {
    all
      ? dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id })
      : dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
  };
  // console.log(products);

  const [load, setLoad] = useState(true)

  setTimeout(function () {
    setLoad(false)
  }, 1000)

  return (
    <div className={styles.allProducts}>
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
                  :
                  productsFilter.length > 0 ? (
                    currentProducts?.map((el) => {
                      return (
                        <ProductCard
                          name={el.name}
                          price={el.price}
                          image={el.image}
                          key={el.id}
                          id={el.id}
                          brand={el.brand}
                          description={el.description}
                          calification={el.calification}
                          quantity={el.quantity}
                          addToCart={addToCart}
                          wishlist={true}
                          btn={true}
                        />
                      );
                    })
                  ) : (
                    <ProductNotFound />
                  )
              }
            </div>
          </div>
          {productsFilter.length > 0 && !load ? (
            <PaginationC category={category} totalPages={totalPages} />
          ) : null}
        </>
      ) : (
        <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%' }} />
      )}
      <Footer />
    </div>
  );
}

export default AllProducts;
