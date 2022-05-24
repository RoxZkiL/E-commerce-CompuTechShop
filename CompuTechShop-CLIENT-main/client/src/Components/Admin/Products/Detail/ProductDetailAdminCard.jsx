import React, { useEffect} from 'react'
import styles from './ProductDetailAdminCard.module.css'
import { deleteProduct, getDetail, getProducts } from '../../../../Redux/Actions/index.js'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Rating } from '@mui/material';

function ProductDetailAdmin ({nameD, image, price, brand, quantity, description, calification, category}) {
  const dispatch = useDispatch();
  const { name } = useParams();

  useEffect(() => {
    dispatch(getDetail(name));
  }, [dispatch]);


  return (
        <div className={styles.productDetailContainer}>

          <div className={styles.productDetailContainerTwo}>
            <div className={styles.productDetailImgContainer}>
              <img className={styles.productDetailImg} src={image}/>
            </div>
            <div className={styles.productDetailInfo}>
                <h1 className={styles.productDetailName}>{nameD}</h1>
                {   calification ? 
                    <Rating className={styles.productDetailRating} name="half-rating-read" size="small" defaultValue={Number(calification)} precision={0.5} readOnly />
                    : null
                }
                <p className={styles.productDetailPrice}>$ {new Intl.NumberFormat().format(price)}</p>
            </div>
          </div>

          <div className={styles.allInfoDetail}>
            <div className={styles.characteristics}>
              <div className={styles.characteristicsContainer}>
                <h3 style={{textAlign:'center'}}>Characteristics:</h3>
                <h5>Brand: <span>{brand}</span></h5>
                <h5>Category: <span>{category ? category : ''}</span></h5>
                <h5>Stock: <span>{quantity}</span></h5>
              </div>
            </div>
            <div className={styles.productDetailDescription}>
              <div className={styles.productDetailDescriptionContainer}>
                <h3>Description:</h3>
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
)}

export default ProductDetailAdmin