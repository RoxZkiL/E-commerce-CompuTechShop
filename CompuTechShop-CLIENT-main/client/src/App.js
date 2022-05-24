import Home from "./Components/Home/Home";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import ProductDetail from "./Components/Detail/ProductDetail";
import NotFound404 from "./Components/NotFound404/NotFound404";
import AllProducts from "./Components/Categories/AllProducts/AllProducts";
import ProfileForm from "./Components/Profile/ProfileForm";
import ProductSearched from "./Components/ProductSearched/ProductSearched";
import FAQ from "./Components/Footer/FAQ";
import FAQ2 from "./Components/Footer/FAQ2";
import WorkWithUs from "./Components/Footer/WorkWithUs";
import About from "./Components/Footer/About";
import ProfileInfo from "./Components/Profile/ProfileInfo";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber, deepOrange, grey } from "@mui/material/colors";
import FormUser from "./Components/Auth0/FormUser";
import Category from "../src/Components/Categories/Category/Category";
import ViewAllOrders from "./Components/Admin/Orders/ViewAllOrders/ViewAllOreders";
import ProductCreate from "./Components/Admin/Products/ProductCreate/ProductCreate";
import AdminCategories from "./Components/Admin/Categories/AdminCategories";
import AdminProducts from "./Components/Admin/Products/AdminProducts";
import ShopDetails from "./Components/Admin/Orders/ShopDetails/ShopDetails";
import ProductDetailAdmin from "./Components/Admin/Products/Detail/ProductDetailAdmin";
import CategoryAdmin from "./Components/Admin/Products/Categories/Category/CategoryAdmin";
import Users from "./Components/Admin/Users/Users";
import UpdateProduct from "./Components/Admin/Products/UpdateProduct/UpdateProduct";
import ProductSearchedAdmin from "./Components/Admin/ProductSearchedAdmin/ProductSearchedAdmin";
import PurchaseSummary from "./Components/Cart/PurchaseSummary";
import { PurchaseConfirm } from "./Components/Cart/PurchaseConfirm";
import { PurchaseResult } from "./Components/Cart/PurchaseResult";
import { Navigate, Outlet } from "react-router-dom";
import UpdateProfile from "./Components/Profile/UpdateProfile";
import Autentication from "./Components/Autenticacion/Autentication";
import AdminManager from "./Components/Admin/Users/AdminManager/AdminManager";
import AdminUpdate from "./Components/Admin/Users/AdminManager/AdminUpdate/AdminUpdate";
import AutenticationUpdate from "./Components/Autenticacion/AutenticationUpdate";
import MyOrderDetail from "./Components/Profile/MyOrders/MyOrderDetail/MyOrderDetail";
import MyFavorites from "./Components/Wishlist/MyFavorites/MyFavorites";
import Banned from "./Components/Banned/Banned";
import Welcome from "./Components/Welcome/Welcome";
import { SnackbarProvider } from "notistack";
import Help from "./Components/Footer/Help";
import ViewOrdersTogether from "./Components/Admin/Orders/ViewAllOrdersCart/ViewOrdersTogether";
import MyOrdersTogether from "./Components/Profile/MyOrders/MyOrdersTogether/MyOrdersTogether";
import MyOrders from "./Components/Profile/MyOrders/MyOrders.jsx";
import CartSend from "./Components/Cart/CartSend"
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === "dark" && {
        main: "#463dd5",
      }),
    },
    ...(mode === "dark" && {
      background: {
        default: "#000000",
        paper: "#000000",
      },
    }),
    ...(mode === "light" && {
      background: {
        default: "#495464",
        paper: deepOrange[900],
      },
    }),
    text: {
      ...(mode === "light"
        ? {
          primary: "#000000",
          secondary: "#000000",
        }
        : {
          primary: "#ffffff",
          secondary: grey[500],
        }),
    },
  },
});

function App() {
  const isDarkTheme = useSelector((state) => state.darkMode);
  const darkModeTheme = createTheme(
    isDarkTheme ? getDesignTokens("dark") : getDesignTokens("light")
  );

  const ProtectedRouteBan = ({
    isAllowed,
    redirectPath = "/banned",
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
  };

  const ProtectedRoute = ({ isAllowed, redirectPath = "/admin", children }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
  };

  const userAuthenticated = useSelector((state) => state.authenticated);
  // console.log(user?.length)

  return (
    <ThemeProvider theme={isDarkTheme ? darkModeTheme : darkModeTheme}>
      <SnackbarProvider maxSnack={2}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRouteBan
                  isAllowed={!userAuthenticated || !userAuthenticated.is_banned}
                />
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/Allproducts" element={<AllProducts />} />
              <Route path="/profile" element={<ProfileInfo />} />
              <Route path="/profile/myorders" element={<MyOrders />} />
              <Route path="/profile/order/:id" element={<MyOrderDetail />} />
              <Route path="/profile/cart/:id" element={<MyOrdersTogether />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/:name" element={<ProductDetail />} />
              <Route path="/search/:search" element={<ProductSearched />} />
              <Route path="*" element={<NotFound404 />} />
              <Route path="/user" element={<ProfileForm />} />
              <Route path="/form" element={<FormUser />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/autentication" element={<Autentication />} />
              <Route path="/UpdateProfile" element={<UpdateProfile />} />
              <Route path="/myfavorites" element={<MyFavorites />} />
              <Route
                path="/AutenticationUpdate"
                element={<AutenticationUpdate />}
              />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/FAQ2" element={<FAQ2 />} />
              <Route path="/WorkWithUs" element={<WorkWithUs />} />
              <Route path="/About" element={<About />} />
              <Route path="/Help" element={<Help />} />

              <Route path="/purchaseSummary" element={<PurchaseSummary />} />
              <Route path="/purchaseConfirm" element={<PurchaseConfirm />} />
              <Route path="/purchaseResult" element={<PurchaseResult />} />
              <Route path="/CartSend" element={<CartSend />} />

            </Route>

            <Route
              path="/banned"
              element={
                <ProtectedRoute
                  redirectPath="/"
                  isAllowed={!!userAuthenticated && userAuthenticated.is_banned}
                >
                  <Banned />
                </ProtectedRoute>
              }
            />

            <Route
              element={
                <ProtectedRoute
                  isAllowed={!!userAuthenticated && userAuthenticated.is_admin}
                />
              }
            >
              <Route
                path="/admin/products/Allproducts"
                element={<AdminProducts />}
              />
              <Route
                path="/admin/products/:category"
                element={<CategoryAdmin />}
              />
              <Route
                path="/admin/products/createProduct"
                element={<ProductCreate />}
              />
              <Route
                path="/admin/product/:name"
                element={<ProductDetailAdmin />}
              />
              <Route
                path="/admin/product/update/:name"
                element={<UpdateProduct />}
              />
              <Route
                path="/admin/search/:search"
                element={<ProductSearchedAdmin />}
              />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/shop/:id" element={<ShopDetails />} />
              <Route path="/admin/allorders" element={<ViewAllOrders />} />
              <Route
                path="/admin/orderstogether/:id"
                element={<ViewOrdersTogether />}
              />
              <Route path="/admin/users" element={<Users />} />
            </Route>

            <Route
              element={
                <ProtectedRoute
                  isAllowed={
                    !!userAuthenticated && userAuthenticated.is_admin_pro
                  }
                />
              }
            >
              <Route path="/admin/manager" element={<AdminManager />} />
              <Route
                path="/admin/manager/:email"
                element={<AdminUpdate />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
