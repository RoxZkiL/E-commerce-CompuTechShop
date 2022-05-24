import React from 'react'
import styles from './UserAdmins.module.css'
import { useSelector } from 'react-redux'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';


function UserAdmins() {
  const users = useSelector((state) => state.users);
  const admins = users.filter(e => e.is_admin)
  const navigate = useNavigate();

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
    { id: 'given_name', label: 'Name', minWidth: 200 },
    { id: 'family_name', label: 'Lastname', minWidth: 200 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 200,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'nickname',
      label: 'Nickname',
      minWidth: 200,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'is_admin_pro',
      label: 'Admin Pro',
      minWidth: 75,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  admins.map(e => e.is_admin_pro ? e.is_admin_pro = 'Yes' : null)
  // console.log(admins);

  const rows = admins

  function handleAdmin(e) {
    e.preventDefault();
    navigate(`/admin/manager/${e.target.id}`)
  }

  return (
    <div>
    <div className={styles.tabla}>
      <Paper sx={{ width: '100%', background:'gray', borderTop: '1px solid gray'}}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={6} style={{color:'white', background:'black', fontSize:'2rem'}}>
                    Admins
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

export default UserAdmins