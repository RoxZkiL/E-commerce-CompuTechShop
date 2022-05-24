import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByEmail, getUser } from "../../../../Redux/Actions";
import styles from "./MyOrdersTogether.module.css";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../../../NavBar/Navbar";
import Footer from "../../../Footer/Footer";
import { CircularProgress } from "@mui/material";


function MyOrdersTogether() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const {id} = useParams();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const orders = useSelector((state) => state.userOrders);

  useEffect(() => {
    dispatch(getOrdersByEmail(user?.email));
  }, [dispatch])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "userEmail", label: "Email", minWidth: 150 },
    {
      id: "name",
      label: "Name",
      minWidth: 200,
      align: "right",
      format: (value) => `$${value.toLocaleString("en-US")}`,
    },
    {
      id: "total_paid_amount",
      label: "Amount",
      minWidth: 200,
      align: "right",
      format: (value) => `$${value.toLocaleString("en-US")}`,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 250,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "state",
      label: "State",
      minWidth: 125,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  // const ordersFiltered = orders ? orders?.filter(e => e.idTogether == id)[0].payments : null
  const ordersFiltered = orders?.filter(e => e.idTogether == id)[0].payments

  const rows = ordersFiltered

  function handleDetail(e) {
    e.preventDefault();
    navigate(`/profile/order/${e.target.id}`);
  }

  const [load, setLoad] = useState(true)

  setTimeout(function () {
    setLoad(false)
  }, 1000)

  return (
    <div className={styles.myOrders}>
      <NavBar />
      <div>
      { load ?
          <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%' }} />
        :
        orders?.length > 0 ? (
          <div className={styles.tabla}>
            <Paper
              sx={{
                width: "100%",
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
                        My order #{id}
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
                                    id={row.id}
                                    onClick={handleDetail}
                                    style={{
                                      fontSize: "1rem",
                                      fontWeight: "600",
                                      color: "black",
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
        ) : null}
      </div>
      <Footer/>
    </div>
  );
}

export default MyOrdersTogether;
