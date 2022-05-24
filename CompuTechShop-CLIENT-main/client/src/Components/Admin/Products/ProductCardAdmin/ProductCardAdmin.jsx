import React from "react";
import styles from "./ProductCardAdmin.module.css";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import trash from '../../../../Images/trash.png'
import edit from '../../../../Images/edit.png'
import { useDispatch } from "react-redux";
import { deleteProduct, getProducts } from "../../../../Redux/Actions";
import { useNavigate } from "react-router-dom";

function ProductCardAdmin({ name, price, image, calification, id, update, delet, stock }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Swal = require('sweetalert2')
  
  function handleDelete(e) {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(e.target.id))
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        )
        dispatch(getProducts())
      }
    })
  }

  function handleEdit(e) {
    e.preventDefault();
    navigate('/admin/product/update/' + e.target.name)
  }

  return (
    <div className={styles.productCardContainer}>
      <div className={styles.productCard}>
        <div className={styles.productCardImgContainer}>
          <Link to={"/admin/product/" + name.split("/").join("-")}>
            <img src={image} alt="" className={styles.productImg} />
          </Link>
        </div>
        <div className={styles.productCardInfo} >
          <Link to={"/admin/product/" + name.split("/").join("-")}>
            <h3 className={styles.productCardName}>{name}</h3>
          </Link>
          <h3 className={styles.productCardPrice}>{price ? `$` : null} {new Intl.NumberFormat().format(price)}</h3>
          <Rating
            name="half-rating-read"
            size="small"
            defaultValue={Number(calification)}
            precision={0.5}
            readOnly
            className={styles.productCardCalification}
          />
          { 
            stock <= 0 ?
              <button className={styles.noStock} disabled>NO STOCK</button>
            : null
          }
          <div className={styles.buttons}>
          {
          delet ?
            <button className={styles.button}>
              <img src={trash} onClick={handleDelete} id={id}/>
            </button>
          : null
          }
          {
          update ?
            <button className={styles.button}>
              <img src={edit} onClick={handleEdit} name={name}/>
            </button>
          : null
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardAdmin;
