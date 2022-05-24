import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Categories from '../../Categories/Categories'
import Footer from '../../Footer/Footer'
import NavBar from '../../NavBar/Navbar'
import ProductCard from '../../ProductCard/ProductCard'
import styles from './MyFavorites.module.css'
import NoFavoritesFound from './NoFavoritesFound/NoFavoritesFound'
import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { TYPES } from "../../../Redux/Actions/shoppingCartActions";
import Swal from 'sweetalert2'
import { getProducts } from '../../../Redux/Actions'

function MyFavorites() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myFavorites = useSelector((state) => state.wishlist)
    const [load, setLoad] = useState(true)
    const productsCart = useSelector((state) => state.cart)

    setTimeout(function () {
        setLoad(false)
    }, 1000)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const addToCart = (id) => {
        let itemCarrito = productsCart.find(el => el.id === id)
        if (!itemCarrito) {
          dispatch({ type: TYPES.ADD_TO_CART, payload: id })
        }
      };

    // const delFromCart = (id, all = false) => {
    //     all
    //         ?
    //         Swal.fire({
    //             title: 'Are you sure?',
    //             text: "Do you want to delete all products?",
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonColor: '#3085d6',
    //             cancelButtonColor: '#d33',
    //             confirmButtonText: 'Yes, delete them!'
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id })
    //                 Swal.fire(
    //                     'Cleaned!',
    //                     'Your products has been deleted.',
    //                     'success'
    //                 )
    //             }
    //         })
    //         : dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    // };
    return (
        <div className={styles.myFavorites}>
            <NavBar />
            <Button variant='outlined' style={{ margin: '10px auto 0 auto', display: 'flex' }} onClick={() => navigate("/Allproducts")}>Back to Products</Button>
            <div className={styles.favTitle}>
                <h1>My favorites:</h1>
            </div>
            <div className={styles.myFavoritesContainer}>
                {
                    load ?
                        <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%' }} />
                        :
                        myFavorites.length > 0 ?
                            <div className={styles.cardsContainer}>
                                {myFavorites.length > 0 ?
                                    myFavorites.map(e => {
                                        return (
                                            <ProductCard
                                                key={e.id}
                                                id={e.productId[0]}
                                                name={e.product[0]}
                                                price={e.price[0]}
                                                image={e.image[0]}
                                                calification={e.calification[0]}
                                                addToCart={addToCart}
                                                wishlist={true}
                                                delFromCart={false}
                                                whish={true}
                                            />
                                        )
                                    })
                                    : <NoFavoritesFound />
                                }
                            </div>
                            : <NoFavoritesFound />
                }
            </div>
            <Footer />
        </div>
    )
}

export default MyFavorites