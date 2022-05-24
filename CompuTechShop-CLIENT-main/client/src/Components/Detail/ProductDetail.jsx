import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import { getDetail, getReview } from "../../Redux/Actions/index.js";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import Categories from "../Categories/Categories";
import { TYPES } from "../../Redux/Actions/shoppingCartActions";
import NavBar from "../NavBar/Navbar";
import add from '../../Images/add.png'
import DetailReviews from "./DetailReviews/DetailReviews";
import Footer from "../Footer/Footer";
import Wishlist from "../Wishlist/WishlistIcon/WishlistIcon";
import { CircularProgress } from "@mui/material";

function ProductDetail() {
  const dispatch = useDispatch();
  const { name } = useParams();
  const product = useSelector((state) => state.productDetail);
  const review = useSelector((state) => state.review);
  const productsCart = useSelector((state) => state.cart)
  useEffect(() => {
    dispatch(getReview(name))
    dispatch(getDetail(name));
  }, [dispatch]);

  const delFromCart = (id, all = false) => {
    all
      ? dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id })
      : dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
  };


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
    <div className={styles.productDetail}>
      <NavBar />
      <Categories />
      {
        load ?
          <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%' }} />
          :
          product.length > 0 ? (
            <div className={styles.productDetailContainer}>
              <div className={styles.productDetailContainerTwo}>
                <div className={styles.productDetailImgContainer}>
                  <img className={styles.productDetailImg} src={product[0].image} />
                </div>
                <div className={styles.productDetailInfo}>
                  <h1 className={styles.productDetailName}>{product[0].name}</h1>
                  <Rating
                    className={styles.productDetailRating}
                    name="half-rating-read"
                    size="small"
                    defaultValue={Number(product[0].calification)}
                    precision={0.5}
                    readOnly
                  />
                  <p className={styles.productDetailPrice}>$ {new Intl.NumberFormat().format(product[0].price)}</p>
                  <div className={styles.wishAndCartContainer}>
                    <button className={styles.addBtn} onClick={() => addToCart(product[0].id)}><img src={add} alt="" /></button>
                    <div className={styles.wishlist}>
                      <Wishlist id={product[0].id} name={product[0].name} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.allInfoDetail}>
                <div className={styles.characteristics}>
                  <div className={styles.characteristicsContainer}>
                    <h3 style={{ textAlign: 'center' }}>Characteristics:</h3>
                    <h5>Brand: <span>{product[0].brand}</span></h5>
                    <h5>Category: <span>{product[0].category[0]}</span></h5>
                    <h5>Stock: <span>{product[0].quantity}</span></h5>
                  </div>
                </div>
                <div className={styles.productDetailDescription}>
                  <div className={styles.productDetailDescriptionContainer}>
                    <h3>Description:</h3>
                    <p>{product[0].description}</p>
                  </div>
                </div>
                <div className={styles.reviewContainer}>
                  {review.length ?
                    <div className={styles.reviewsContainer}>
                      <h3>Opinions about {product[0].name}</h3>
                      <div>
                        <div className={styles.opinionsPromedy}>
                          <h5>{product[0].calification}</h5>
                          <Rating
                            size="small"
                            defaultValue={Number(product[0].calification)}
                            precision={0.5}
                            readOnly
                          />
                          <p>Promedy between {review.length} opinions</p>
                        </div>
                      </div>
                      <div>
                        {
                          review.map(e => {
                            return (
                              e.comment ?
                                <DetailReviews key={e.id} comment={e.comment} user={e.user} calification={e.calification} />
                                : null
                            )
                          })
                        }
                      </div>
                    </div>
                    : null
                  }
                </div>
              </div>
            </div>
          ) : null}
      <Footer />
    </div>
  );
}

export default ProductDetail;
