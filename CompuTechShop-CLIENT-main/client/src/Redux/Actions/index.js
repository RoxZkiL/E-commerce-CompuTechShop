import axios from "axios";

export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const getUserDetail = (email) => {
  return async (dispatch) => {
    var json = await axios.get("/users/" + email);
    return dispatch({
      type: "GET_USER_DETAIL",
      payload: json.data,
    });
  };
};

export const GET_USER = "GET_USER";
export const getUser = () => {
  return async (dispatch) => {
    var json = await axios.get("/users");
    return dispatch({
      type: "GET_USER",
      payload: json.data,
    });
  };
};

export const GET_ACTIVE_USER = "GET_ACTIVE_USER";
export const getActiveUser = () => {
  return async (dispatch) => {
    var json = await axios.get("/users");
    return dispatch({
      type: "GET_ACTIVE_USER",
      payload: json.data,
    });
  };
};

export function getProducts() {
  return async function (dispatch) {
    var json = await axios.get("/products");

    return dispatch({
      type: "GET_PRODUCTS",
      payload: json.data,
    });
  };
}
export const CLEAN_FILTER = "CLEAN_FILTER";
export function cleanFilter() {
  return {
    type: "CLEAN_FILTER",
    payload: {},
  };
}

export function getDetail(name) {
  // console.log('name ', name)
  return async function (dispatch) {
    try {
      var json = await axios.get("/products?name=" + name);

      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCategories() {
  return async function (dispatch) {
    try {
      var json = await axios.get("/categories");
      return dispatch({
        type: "GET_CATEGORIES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postProducts(payload) {
  return async function () {
    const response = await axios.post("/postProduct", payload);
    return response;
  };
}

export function postUser(payload) {
  return async function () {
    let postUser = await axios.post("/postUser", payload);
    return postUser;
  };
}

export const filterByCategory = (category) => {
  return async (dispatch) => {
    var json = await axios.get("/productCategory?category=" + category);
    return dispatch({
      type: "FILTER_BY_CATEGORY",
      payload: json.data,
    });
  };
};

export function getProductsByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/products?name=" + name);
      return dispatch({
        type: "GET_PRODUCTS_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByBrand(payload) {
  return {
    type: "FILTER_BY_BRAND",
    payload,
  };
}
export function filterByPrice(payload) {
  return {
    type: "FILTER_BY_PRICE",
    payload,
  };
}
export const FILTER_BY_BRANDFILTER = "FILTER_BY_BRANDFILTER";
export function filterByBrandCategoriesFilter(payload) {
  return {
    type: FILTER_BY_BRANDFILTER,
    payload,
  };
}

export function cleanDog() {
  return {
    type: "CLEAN_DOGS",
    payload: {},
  };
}

export function orderProducts(payload) {
  return {
    type: "ORDER_PRODUCTS",
    payload,
  };
}

export function darkMode(payload) {
  return {
    type: "DARKMODE",
    payload: payload,
  };
}

export function getShops() {
  return async function (dispatch) {
    try {
      var json = await axios.get("/getPayments");
      return dispatch({
        type: "GET_SHOPS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
// export function getShops() {
//   return async function (dispatch) {
//     try {
//       var json = await axios.get("/getPayments");
//       return dispatch({
//         type: "GET_SHOPS",
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export function getShopById(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/getPayments?id=" + id);
      return dispatch({
        type: "GET_SHOP_BY_ID",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function setCurrentPage(payload) {
  return {
    type: "SET_CURRENT_PAGE",
    payload: payload,
  };
}

export function postCategory(payload) {
  return async function () {
    const response = await axios.post("/postCategory", payload);
    return response;
  };
}
export function postBuyCart(payload) {
  // console.log(payload)
  return async function (dispatch) {
    const response = await axios.post("/checkout", payload);

    return dispatch({
      type: "BUY_CART",
      payload: response.data,
    });
  };
}

export function deleteCategory(id) {
  return async function (dispatch) {
    try {
      const json = await axios.delete("/deleteCategory/" + id);
      return dispatch({
        type: "DELETE_CATEGORY",
        payload: json.data,
      });
    } catch (error) {
      console.log("catch: " + error);
    }
  };
}

export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      const json = await axios.delete("/deleteProduct/" + id);
      return dispatch({
        type: "DELETE_PRODUCT",
        payload: json.data,
      });
    } catch (error) {
      console.log("catch: " + error);
    }
  };
}

export function updateProduct(id, payload) {
  // console.log(id)
  // console.log(payload)
  return async function (dispatch) {
    try {
      const json = await axios.put("/updateProduct/" + id, payload);
      return dispatch({
        type: "UPDATE_PRODUCT",
        payload: json.data,
      });
    } catch (error) {
      console.log("catch: " + error);
    }
  };
}

export function sortUsersByLastName(payload) {
  return {
    type: "SORT_USER_BY_LASTNAME",
    payload,
  };
}

export function filterOrderByState(payload) {
  return {
    type: "FILTER_ORDER_BY_STATE",
    payload,
  };
}

export function sortOrderByEmail(payload) {
  return {
    type: "SORT_ORDER_BY_EMAIL",
    payload,
  };
}

export function sortOrderByAmount(payload) {
  return {
    type: "SORT_ORDER_BY_AMOUNT",
    payload,
  };
}

export function handleSortUserByAmount(payload) {
  return {
    type: "SORT_USER_BY_AMOUNT",
    payload,
  };
}

export function updateShop(id, payload) {
  return async function (dispatch) {
    try {
      const json = await axios.put("/updatePayment/" + id, payload);
      return dispatch({
        type: "UPDATE_SHOP",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export const getPayment = (payload) => {
  // console.log(payload);

  const { payment, email, extraEmail, extraAddress } = payload;
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `/success?id=${payment}&successEmail=${email}&extraEmail=${extraEmail}&extraAddress=${extraAddress}`
      );
      return dispatch({
        type: "GET_PAYMENT",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTotalUserPayments = (email) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/getPaymentAcount/${email}`);
      return dispatch({
        type: "GET_TOTAL_USER_PAYMENTS",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export function authenticate(payload) {
  return {
    type: "AUTHENTICATE",
    payload,
  };
}

export function updateUser(id, payload) {
  // console.log(id)
  // console.log(payload)
  return async function (dispatch) {
    try {
      var json = await axios.put("/updateUser/" + id, payload);
      return dispatch({
        type: "UPDATE_USER",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getOrders = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/getOrders`);
      return dispatch({
        type: "GET_ORDERS",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOrdersByEmail = (email) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/getOrders?userEmail=${email}`);
      return dispatch({
        type: "GET_ORDERS_BY_EMAIL",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export function postReview(payload) {
  return async function () {
    let postReview = await axios.post("/reviews", payload);
    return postReview;
  };
}

export function getReview(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get("/reviews?productName=" + name);
      return dispatch({
        type: "GET_REVIEW",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteReview(id) {
  // console.log(id)
  return async function (dispatch) {
    try {
      const json = await axios.delete("/reviews/" + id);
      return dispatch({
        type: "DELETE_REVIEW",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getWishlist(id) {
  // console.log('getWhishlist: ', id)
  return async function (dispatch) {
    try {
      const json = await axios.get("/wishlist?userId=" + id);
      return dispatch({
        type: "GET_WISHLIST",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postWishlist(wishlist) {
  // console.log(wishlist)
  return async function (dispatch) {
    try {
      const json = await axios.post("/wishlist", wishlist);
      return dispatch({
        type: "POST_WISHLIST",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteWishlist(id) {
  // console.log('deleteWishlist: ', id)
  return async function (dispatch) {
    try {
      const json = await axios.delete("/wishlist/" + id);
      return dispatch({
        type: "DELETE_WISHLIST",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProductsSearchbar() {
  return async function (dispatch) {
    var json = await axios.get("/products");

    return dispatch({
      type: "GET_PRODUCTS_SEARCHBAR",
      payload: json.data,
    });
  };
}
