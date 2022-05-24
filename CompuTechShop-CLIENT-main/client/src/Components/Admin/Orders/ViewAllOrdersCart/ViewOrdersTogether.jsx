import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getShops, sortOrderByEmail, sortOrderByAmount, filterOrderByState, getTotalUserPayments, getOrders } from "../../../../Redux/Actions";
import styles from './ViewOrdersTogether.module.css';
import AdminNav from '../../AdminNav/AdminNav'
import AdminNav2 from '../../AdminNav/AdminNav2';
import { TextField, MenuItem } from '@mui/material/';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate, useParams } from 'react-router-dom';


function ViewOrdersTogether() {
  const dispatch = useDispatch();
  const [orderByEmail, setOrderByEmail] = useState('')
  const [orderByAmount, setOrderByAmount] = useState('')
  const [filterByState, setFilterByState] = useState('')
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getShops());
    // dispatch(getOrders())
    // console.log('shops',shops)
  }, [dispatch]);


  // const shops = useSelector((state) => state.shops);
  const shops = useSelector((state) => state.shopsFiltered);
  const orders = useSelector((state) => state.orders);

  function handleSortByEmail(e) {
    e.preventDefault()
    dispatch(sortOrderByEmail(e.target.value))
    setOrderByEmail(e.target.value)
  }

  function handleSortByAmount(e) {
    e.preventDefault()
    dispatch(sortOrderByAmount(e.target.value))
    setOrderByAmount(e.target.value)
  }

  function handleFilterByState(e){
    e.preventDefault()
    dispatch(filterOrderByState(e.target.value))
    setFilterByState(e.target.value)
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

const columns = [
  // { id: 'idTogether', label: 'Cart ID ', minWidth: 100 },
  { id: 'id', label: 'SHOP ID', minWidth: 100 },
  { id: 'userEmail', label: 'Email', minWidth: 220 },
  {
    id: 'total_paid_amount',
    label: 'Amount',
    minWidth: 220,
    align: 'right',
    format: (value) => `$${value.toLocaleString('en-US')}`,
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 220,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'state',
    label: 'State',
    minWidth: 220,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

const rows = shops.filter(e => e.idTogether == id)

function handleDetail(e) {
  e.preventDefault()
  navigate(`/admin/shop/${e.target.id}`)
}

  return (
    <div className={styles.viewAllOrders}>
      <AdminNav/>
      <AdminNav2 />
    <div className={styles.filterOrders}>
      <TextField
        sx={{
          '& > :not(style)': { m: 1, display: 'flex', width: '13ch',fontSize:'1rem', color:'white' },
        }}
        variant="outlined"
        id="outlined-select-currency"
        select
        label="State"
        value={filterByState}
        onChange={(e) => handleFilterByState(e)}
      > 
        <MenuItem value='All orders'>All orders</MenuItem>
        <MenuItem value='In process'>In process</MenuItem>
        <MenuItem value='Paid'>Paid</MenuItem>
        <MenuItem value='On its way'>On its way</MenuItem>
        <MenuItem value='Canceled'>Canceled</MenuItem>
        <MenuItem value='Received'>Received</MenuItem>
      </TextField>

      <TextField
        sx={{
          '& > :not(style)': { m: 1, display: 'flex', width: '13ch',fontSize:'1rem', color:'white' },
        }}
        variant="outlined"
        id="outlined-select-currency"
        select
        label="Email"
        value={orderByEmail}
        onChange={(e) => handleSortByEmail(e)}
      > 
        <MenuItem value='a-z'>A-Z</MenuItem>
        <MenuItem value='z-a'>Z-A</MenuItem>
      </TextField>

      <TextField
        sx={{
          '& > :not(style)': { m: 1, display: 'flex', width: '13ch',fontSize:'1rem', color:'white' },
        }}
        variant="outlined"
        id="outlined-select-currency"
        select
        label="Amount"
        value={orderByAmount}
        onChange={(e) => handleSortByAmount(e)}
      > 
        <MenuItem value='higher-amount'>Higher</MenuItem>
        <MenuItem value='lower-amount'>Lower</MenuItem>
      </TextField>
    </div>

    <div className={styles.tabla}>
      <Paper sx={{ width: '100%', background:'white'}}>
        <TableContainer sx={{ maxHeight: '100%', backgroundColor:'gray'}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={6} style={{color:'white', background:'black', fontSize:'2rem'}}>
                    Orders from cart #{id}
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              { 
              shops.length ? 
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code} style={{color:'white', background:'gray'}} >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} id={row.id} onClick={handleDetail} style={{fontSize:'1rem', fontWeight:'600', color:'black'}}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        {/* <Button variant="contained" className={styles.tableBtn} value={row.id} onClick={handleDetail}>Details</Button> */}
                      </TableRow>
                    );
                  })}
              </TableBody>
                  : null
              }
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{color:'white', background:'gray', borderBottom: '1px solid gray'}}
          />
        </Paper>
      </div>

    </div>
  )
}

export default ViewOrdersTogether