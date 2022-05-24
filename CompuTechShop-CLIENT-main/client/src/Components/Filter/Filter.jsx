import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByBrand, filterByPrice, orderProducts, setCurrentPage} from "../../Redux/Actions";
import {Box, TextField, MenuItem, Button } from '@mui/material/';
import play from '../../Images/play.png'
import styles from "./Filter.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import filterOn from '../../Images/filterOn.png'
import filterOff from '../../Images/filterOff.png'

function Filter() {
  let products = useSelector((state) => state.products);
  products = products.filter(e => e.quantity > 0)
  const dispatch = useDispatch();

  const location = useLocation();
  const query = new URLSearchParams(location.pathname);

  const setBrand = new Set();
  const unicBrand = products.reduce((acc, marca) => {
    if (!setBrand.has(marca.brand)) {
      setBrand.add(marca.brand, marca);
      acc.push(marca);
    }
    return acc;
  }, []);

  let brandMap = unicBrand.map((el) => el.brand);
  // console.log(brandMap)

  const [input, setInput] = useState({
    min: '',
    max: ''
  })
  
  const [brandSelect, setbrandSelect] = useState('')
  const [order, setOrder] = useState('more-relevants')
  const navigate = useNavigate();

  function handleFilterByBrand(e) {
    e.preventDefault();
    dispatch(filterByBrand(e.target.value));
    dispatch(filterByPrice(input))
    dispatch(orderProducts('more-relevants'))
    dispatch(orderProducts(order))
    setbrandSelect(e.target.value)
    dispatch(setCurrentPage(1))
    navigate(query)
  }
  
  function handleFilterPrice(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  }

  function handleFilterPriceSubmit(e) {
    e.preventDefault();
    dispatch(filterByPrice(input))
    dispatch(setCurrentPage(1))
    navigate(query)
  }

  function handleOrder(e) {
    dispatch(filterByPrice(input))
    e.preventDefault()
    dispatch(orderProducts(e.target.value))
    setOrder(e.target.value)  
  }

  function handleRestart(e) {
    e.preventDefault();
    setInput({
      min: '',
      max: '',
    })
    dispatch(filterByBrand('all'))
    setbrandSelect('all')
    setOrder('more-relevants')
    dispatch(orderProducts('more-relevants'))
  }

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 768;

  useEffect(() => {
    dispatch(filterByBrand('all'))
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [dispatch]);

  const [show, setShow] = useState(false);


  return (
    <div className={styles.filter}>

      <div className={styles.toggleFilters}>
        { width < breakpoint ?
            show ?
              <img onClick={() => setShow(!show)} alt="filter" src={filterOn}/>
              : 
              <img onClick={() => setShow(!show)} alt="filter" src={filterOff}/>
            : null
        }
      </div>
      <div className={styles.filterContainer}>
      { 
        width > breakpoint || width < breakpoint && show ?
          <div className={styles.filterFixed}>
            <div style={{
            margin: 'auto',
            display: 'block',
            width: 'fit-content',
            minWidth: '200px',
          }}>
              <TextField
                    sx={{
                      '& > :not(style)': { m: .1, display: 'flex', width: '18ch', color:'white' },
                    }}
                    className={styles.filterByBrand}
                    variant="outlined"
                    id="outlined-select-currency"
                    name="brandMap"
                    select
                    label="Brand"
                    value={brandSelect}
                    onChange={(e) => handleFilterByBrand(e)}
                > 
                      <MenuItem value='all'>All</MenuItem>
                    {brandMap.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
            </TextField>
            <Box
              className={styles.filterByPrice}
              component="form"
              sx={{ '& > :not(style)': { m: .1, width: '14ch', display: 'inline-block', color:'white' }}}
              noValidate
              autoComplete="off"
            >
              <TextField sx={{ '& > :not(style)': { m: .1, height: '6ch'}}}
                value={input.min}
                id="outlined-basic" className="inputTag" label="Min Price" variant="outlined" onChange={handleFilterPrice} name='min'/>
                -
              <TextField sx={{ '& > :not(style)': { m: .1, height: '6ch'}}}
                value={input.max}
                id="outlined-basic" className="inputTag" label="Max Price" variant="outlined" onChange={handleFilterPrice} name='max'/>
              <div className={styles.filterButton}>
                <button className={styles.play} onClick={handleFilterPriceSubmit}><img src={play}/></button>
              </div>
            </Box>

            <TextField
                    sx={{
                      '& > :not(style)': { m: .1, display: 'flex', width: '18ch', color:'white' },
                    }}
                    variant="outlined"
                    id="outlined-select-currency"
                    select
                    label="Order by"
                    value={order}
                    onChange={(e) => handleOrder(e)}
                > 
                      <MenuItem value='more-relevants'>More relevants</MenuItem>
                      <MenuItem value='higher-price'>Higher price</MenuItem>
                      <MenuItem value='lower-price'>Lower price</MenuItem>
            </TextField>

            <div style={{margin:'20px auto'}}>
              <Button onClick={handleRestart} variant="outlined">Restart filters</Button>
            </div>
          </div>
          </div>
        : null 
      }
      </div>
    </div>
  );
}

export default Filter;