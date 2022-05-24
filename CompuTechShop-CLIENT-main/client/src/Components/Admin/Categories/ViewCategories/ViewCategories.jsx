import React, { useEffect } from 'react';
import styles from './ViewCategories.module.css';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { deleteCategory, getCategories } from '../../../../Redux/Actions';
import trash from '../../../../Images/trash.png'
import Swal from 'sweetalert2'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  display:'flex',
  justifyContent:'space-between' ,
  color: theme.palette.text.secondary,
}));

function ViewCategories() {
  const allCategories = useSelector((state) => state.categories)
  const dispatch = useDispatch();
  const Swal = require('sweetalert2')

  function handleDelete(e) {
      e.preventDefault();
      dispatch(deleteCategory(e.target.id))
      Swal.fire({
        title: 'Category deleted!',
        icon: 'success',
        confirmButtonText: 'Ok',
      })
      setTimeout(() => {
        dispatch(getCategories())
    }, 1000)
  }

  return (
    <div className={styles.viewCategoriesContainer}>
      {/* <div className={styles.viewCategories}>
        <div className={styles.categories}> */}
      <Box sx={{ maxWidth: '300px', margin: '20px auto' }}>
        <h1 style={{textAlign:'center'}}>Actual categories:</h1>
        <Stack spacing={2}>
          {
            allCategories?.map(el => { 
              return(
              <Item key={el.id} value={el.id} style={{background:'#0080006e'}}>
                {el.name}
                { el.id > 5 ? ( 
                      <button className={styles.button}>
                        <img src={trash} id={el.id} value={el.id} onClick={handleDelete}/>
                      </button>
                  )
                : null}
              </Item>
              )
            })
          }
        </Stack>
      </Box>
        {/* </div>
      </div> */}
    </div>
  )
}

export default ViewCategories