import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../Admin/AdminNav/AdminNav';
import { useDispatch } from 'react-redux';
import { getUser, handleSortUserByAmount, sortUsersByLastName } from '../../../Redux/Actions/index';
import styles from './Users.module.css'
import AdminNav2 from '../AdminNav/AdminNav2';
import { TextField, MenuItem, Button } from '@mui/material/';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';


function Users() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState('')
  const [orderAmount, setOrderAmount] = useState('')
  const navigate = useNavigate();
  const authenticated = useSelector((state) => state.authenticated)
  const isAdminPro = authenticated.is_admin_pro

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch]);

  const users = useSelector((state) => state.users)

  function handleSortByLastName(e) {
    e.preventDefault()
    dispatch(sortUsersByLastName(e.target.value))
    setOrder(e.target.value)
  }

  function handleSortByAmount(e) {
    e.preventDefault()
    dispatch(handleSortUserByAmount(e.target.value))
    setOrderAmount(e.target.value)
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
    { id: 'given_name', label: 'Name', minWidth: 150 },
    { id: 'family_name', label: 'Lastname', minWidth: 150 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 150,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'phone',
      label: 'Phone',
      minWidth: 150,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'totalAmount',
      label: 'Value',
      minWidth: 150,
      align: 'right',
      format: (value) => `$${value.toLocaleString('en-US')}`,
    },
    {
      id: 'is_admin',
      label: 'Admin',
      minWidth: 75,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'is_banned',
      label: 'Banned',
      minWidth: 75,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  users.map(e => e.is_banned ? e.is_banned = 'Banned' : null)
  users.map(e => e.is_admin ? e.is_admin = 'Yes' : null)
  // const rows = users.filter(user => !user.is_admin)
  const rows = users

  function handleAdmin(e) {
    e.preventDefault();
    if (isAdminPro) {
    navigate(`/admin/manager/${e.target.id}`)
    }
  }

  return (
    <div className={styles.users}>
      <AdminNav/>
      <AdminNav2/>

      <div style={{textAlign:'center', margin:'20px auto'}}>

        <TextField
          sx={{
            '& > :not(style)': { m: 1, display: 'flex', width: '20ch', color:'white' },
          }}
          variant="outlined"
          id="outlined-select-currency"
          select
          label="Purchase value"
          value={orderAmount}
          onChange={(e) => handleSortByAmount(e)}
        > 
          <MenuItem value='higher-amount'>Higher value</MenuItem>
          <MenuItem value='lower-amount'>Lower value</MenuItem>
        </TextField>

        <TextField
          sx={{
            '& > :not(style)': { m: 1, display: 'flex', width: '20ch', color:'white' },
          }}
          variant="outlined"
          id="outlined-select-currency"
          select
          label="Sort alphabetically"
          value={order}
          onChange={(e) => handleSortByLastName(e)}
        > 
          {/* <MenuItem value='Sort'>Sort</MenuItem> */}
          <MenuItem value='a-z'>A-Z</MenuItem>
          <MenuItem value='z-a'>Z-A</MenuItem>
        </TextField>

      </div>

      <div className={styles.tabla}>
      <Paper sx={{ width: '100%', background:'gray'}}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={7} style={{color:'white', background:'black', fontSize:'2rem'}}>
                    Users
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
              users.length ? 
              <TableBody >
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} id={row.email} onClick={handleAdmin} style={{fontSize:'1rem', fontWeight:'600', color:'white'}} >
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
                  : null
              }
            </Table>
          </TableContainer>
          <TablePagination
            style={{color:'white', background:'gray'}}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  )
}

export default Users