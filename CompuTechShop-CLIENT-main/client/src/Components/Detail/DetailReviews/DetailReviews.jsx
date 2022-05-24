import React from 'react'
import styles from './DetailReviews.module.css'
import { Rating } from '@mui/material'
import trash from './../../../Images/trash.png'
import { useDispatch } from 'react-redux'
import { deleteReview, getDetail } from '../../../Redux/Actions'

function DetailReviews({comment, user, calification, delet, id, productName}) {
  const dispatch = useDispatch();
  
  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteReview(id))
    dispatch(getDetail(productName))
  }

  return (
    <div className={styles.detailsReviews}>
      <div className={styles.detailsReviewsContainer}>
        <div>
            <Rating
              className={styles.productDetailRating}
              name="half-rating-read"
              size="small"
              defaultValue={Number(calification)}
              precision={0.5}
              readOnly
            />
        </div>
        <div>{comment}</div>
        <div style={{fontSize:'.8rem'}}>{user}</div>
      </div>
      { delet ? 
      <button className={styles.button}><img onClick={handleDelete} alt='trash' src={trash} /></button>
       : null
      }
    </div>
  )
}

export default DetailReviews