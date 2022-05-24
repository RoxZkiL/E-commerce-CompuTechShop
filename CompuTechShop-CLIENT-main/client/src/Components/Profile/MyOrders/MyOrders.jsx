import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByEmail, getUser } from "../../../Redux/Actions";
import styles from "./MyOrders.module.css";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../../NavBar/Navbar";
import Footer from "../../Footer/Footer";
import { CircularProgress } from "@mui/material";
import notOrders from '../../../Images/notOrders.png'
import { Link } from "react-router-dom";

function MyOrders() {
  const dispatch = useDispatch();
  // const users = useSelector((state) => (state.users))
  const orders = useSelector((state) => state.userOrders);
  const [watch, setWatch] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth0();

  // function watchOrders() {
  //   dispatch(getOrdersByEmail(user.email));
  //   setWatch(!watch);
  // }

  useEffect(() => {
    dispatch(getOrdersByEmail(user?.email));
  }, [dispatch])

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
    { id: "idTogether", label: "ID", minWidth: 200 },
    { id: "email", label: "Email", minWidth: 220 },
    {
      id: "totalCarrito",
      label: "Amount",
      minWidth: 220,
      align: "right",
      format: (value) => `$${value.toLocaleString("en-US")}`,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 220,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "state",
      label: "State",
      minWidth: 100,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  //   const thisUserOrders = orders.filter(e => e.userEmail === user.userEmail ? e : false)
  // console.log(orders.filter(e => e.idTogether))
  const rows = orders

  function handleDetail(e) {
    e.preventDefault();
    navigate(`/profile/cart/${e.target.id}`);
  }

  const [load, setLoad] = useState(true)

  setTimeout(function () {
    setLoad(false)
  }, 1000)

  return (
    <div className={styles.myOrders}>
      <NavBar />
      {/* {!watch ? (
        <div>
          <Button variant="outlined" style={{margin: '20px auto'}} onClick={watchOrders}>
            Watch orders
          </Button>
        </div>
      ) : (
        <div>
          <Button variant="outlined" style={{margin: '20px auto'}}  onClick={watchOrders}>
            Close orders
          </Button>
        </div>
      )} */}
      <div>
      {load ?
        <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%' }} />
        :
        orders?.length > 0 ? (
          <div className={styles.tabla}>
            <Paper
              sx={{
                width: "100%",
                background: "white",
                borderTop: "1px solid gray",
              }}
            >
              <TableContainer sx={{ maxHeight: '100%', backgroundColor:'gray'}}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={6}
                        style={{
                          color: "white",
                          background: "black",
                          fontSize: "2rem",
                        }}
                      >
                        My Orders
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
                  {orders.length ? (
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                              style={{ color: "white", background: "gray" }}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    id={row.idTogether}
                                    onClick={handleDetail}
                                    style={{
                                      fontSize: "1rem",
                                      fontWeight: "600",
                                      color: "white",
                                    }}
                                  >
                                    {column.format && typeof value === "number"
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
                  ) : null}
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
                style={{
                  color: "white",
                  background: "gray",
                  borderBottom: "1px solid gray",
                }}
              />
            </Paper>
          </div>
        ) : <div className={styles.notFound}>
              <h1>Not orders found</h1>
              <img src={notOrders} alt='' />
              <Link to="/profile">
                  <Button variant="outlined">Back to profile</Button>
              </Link>            
            </div>
            }
      </div>
      <Footer />
    </div>
  );
}

export default MyOrders;
