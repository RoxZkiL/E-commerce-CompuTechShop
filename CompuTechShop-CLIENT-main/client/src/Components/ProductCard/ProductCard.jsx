import React from "react";
import styles from "./ProductCard.module.css";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import add from '../../Images/add.png'
import Wishlist from "../Wishlist/WishlistIcon/WishlistIcon";
import deleteOne from "../../Images/deleteOne.png"
import addmore from "../../Images/addmore.png"
import substractmore from "../../Images/substractmore.png"
import { useSnackbar } from 'notistack';
import { useSelector } from "react-redux";

function ProductCard({
  name,
  price,
  image,
  id,
  calification,
  addToCart,
  quantity,
  delFromCart,
  priceTotal,
  wishlist,
}) {
  const productsFilter = useSelector((state) => state.cart);
  const { enqueueSnackbar } = useSnackbar();

  const removedAlert = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Product removed from cart!', { variant });
  };
  const addedAlertfromProducts = (variant) => () => {
    // console.log(mapeo.quantityCart)
    let itemCarrito = productsFilter.find(el => el.id === id)
    if (!itemCarrito) {
      enqueueSnackbar('Product added to cart!', { variant });
    }
  };
  const addedAlert = (variant) => () => {
    let mapeo = productsFilter.find((el) => el.id === id)
    // console.log(mapeo.quantityCart)
    if (mapeo.quantity > 0) {
      enqueueSnackbar('Product added to cart!', { variant });
    }
  };

  return (
    <div className={styles.productCardContainer}>
      <div className={styles.productCard}>
        <div className={styles.productCardImgContainer}>
          <Link to={"/" + name}>
            <img src={image} alt="" className={styles.productImg} />
          </Link>
        </div>
        <div className={styles.productCardInfo}>
          <Link to={"/" + name}>
            <h3 className={styles.productCardName}>{name}</h3>
          </Link>
          {priceTotal && quantity > 1 ? <h3 className={styles.productCardPrice}>{quantity} x $ {new Intl.NumberFormat().format(price)}</h3> :
            <h3 className={styles.productCardPrice}>$ {new Intl.NumberFormat().format(price)}</h3>}

          <Rating
            name="half-rating"
            size="small"
            defaultValue={Number(calification)}
            precision={0.5}
            readOnly
            className={styles.productCardCalification}
          />
          <div className={styles.superBtnsContainer}>
            <div className={styles.wishAndCartBtns}>
              {delFromCart ?
                null
                :
                <button className={styles.addBtn} onClick={() => addToCart(id)}><img onClick={addedAlertfromProducts('success')} src={add} alt="add" /></button>
              }
              {
                wishlist ?
                  <Wishlist id={id} name={name} className={styles.wishlist} />
                  : null
              }
            </div>
            {
              delFromCart ?
                <div className={styles.cardsBtns}>
                  <button className={styles.addMore} onClick={() => addToCart(id)}><img onClick={addedAlert('success')} src={addmore} alt="add" /></button>
                  <button className={styles.subsBtn} onClick={() => delFromCart(id)}><img onClick={removedAlert('error')} src={substractmore} alt="substractmore" /></button>
                  <button className={styles.dltAll} onClick={() => delFromCart(id, true)}><img src={deleteOne} alt="removeAll" /></button>
                </div>
                : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
