import React, { useEffect } from "react";
import styles from "./PaginationC.module.css";
import { useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../Redux/Actions";

function PaginationC({ category, totalPages  }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const {search} = useParams();
  // const {category} = useParams();
  // const {allproducts} = useParams();
  const currentPage = useSelector((state) => state.currentPage)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(page))
  }, [dispatch, page])

  return (
    <div className={styles.pagination}>
      <Pagination
        color="primary"
        size="medium"
        variant="outlined"
        shape="circular"
        // shape="rounded"
        page={currentPage}
        count={totalPages}
        sx={{
          color: 'white',
          "& .MuiPaginationItem-root": {
            color:"white",
          },
        }}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={
              search ? 
              `/search/${category}${item.page === 1 ? '' : `?page=${item.page}`}`
              :
              category === 'Allproducts' ?
              `/Allproducts${item.page === 1 ? '' : `?page=${item.page}`}` 
              :
              category ? 
              `/category/${category}${item.page === 1 ? '' : `?page=${item.page}`}`
              : null
            }
            {...item}
          />
        )}
      />
    </div>
  )
}

export default PaginationC