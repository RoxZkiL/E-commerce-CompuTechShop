import React, { useEffect, useState} from 'react'
import styles from './ProductDetailAdmin.module.css'
import { deleteProduct, getDetail, getProducts, getReview } from '../../../../Redux/Actions/index.js'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import AdminNav from '../../AdminNav/AdminNav';
import trash from '../../../../Images/trash.png'
import edit from '../../../../Images/edit.png'
import AdminNav2 from '../../AdminNav/AdminNav2';
import CategoriesAdmin from '../Categories/CategoriesAdmin';
import DetailReviews from '../../../Detail/DetailReviews/DetailReviews';
import Swal from 'sweetalert2';
import { CircularProgress } from "@mui/material";

function ProductDetailAdmin (){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();
  const review = useSelector((state) => state.review);
  const Swal = require('sweetalert2')

  useEffect(() => {
    dispatch(getReview(name))
    dispatch(getDetail(name));
  }, [dispatch]);

  const product = useSelector ((state) => state.productDetail);

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
        e.preventDefault();
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

  const [load, setLoad] = useState(true)

  setTimeout(function () {
    setLoad(false)
  }, 1000)


  return (
  <div className={styles.productDetail}>
    <AdminNav/>
    <AdminNav2/>
    <CategoriesAdmin/>
    {
        load ? 
          <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%'}} />
        :
      product.length > 0 ?
        <div className={styles.productDetailContainer}>

          <div className={styles.productDetailContainerTwo}>
            <div className={styles.productDetailImgContainer}>
              <img className={styles.productDetailImg} src={product[0].image}/>
            </div>
            <div className={styles.productDetailInfo}>
                <h1 className={styles.productDetailName}>{product[0].name}</h1>
                <Rating className={styles.productDetailRating} name="half-rating-read" size="small" defaultValue={Number(product[0].calification)} precision={0.5} readOnly />
                <p className={styles.productDetailPrice}>$ {new Intl.NumberFormat().format(product[0].price)}</p>
            </div>
              <button className={styles.button}>
                <img src={trash} onClick={handleDelete} id={product[0].id}/>
              </button>
              <button className={styles.button}>
                <img src={edit} onClick={handleEdit} name={name}/>
              </button>
          </div>

          <div className={styles.allInfoDetail}>
            <div className={styles.characteristics}>
              <div className={styles.characteristicsContainer}>
                <h3 style={{textAlign:'center'}}>Characteristics:</h3>
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
            { review.length ?           
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
                          <DetailReviews key={e.id} comment={e.comment} user={e.user} calification={e.calification} delet={true} id={e.id} productName={name} />
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
      : null
    }
  </div>
)}

export default ProductDetailAdmin