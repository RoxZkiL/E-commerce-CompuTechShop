import React, { useEffect, useState } from "react";
import {
  authenticate,
  getProducts,
  getUser,
  getUserDetail,
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import Categories from "../Categories/Categories";
import NavBar from "../NavBar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from '../Footer/Footer'
import ProductsHome from "./ProductsHome/ProductsHome";
import { CircularProgress } from "@mui/material";

function Home() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  // const { isAuthenticated } = useAuth0();
  // const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  // console.log("esto es el get access", getAccessTokenSilently(user))
  // console.log("esto es el get ID", getIdTokenClaims())

  // getAccessTokenSilently(user).then(console.log(user))

  // useEffect(() => {
  // if (user) dispatch(getUserDetail(user.email));
  // }, [dispatch, user]);
  // const userActive = useSelector((state) => state.userActive);
  // console.log(userActive)
  const [load, setLoad] = useState(true)

  setTimeout(function () {
    setLoad(false)
  }, 500)
  return (
    <div className={styles.home}>
      <NavBar />
      {
      load ?
          <CircularProgress color="inherit" style={{ position: 'absolute', top: '50%', left: '50%' }} />
      :
      <>
        <Categories />
        <div className={styles.homeContent}>
          <div
            className={styles.carouselContainer}
            style={{ display: "block", width: "auto", padding: 0 }}
          >

            <Carousel>
              <Carousel.Item interval={3000}>
                <img
                  className="d-block w-100"
                  src="https://cdn.mos.cms.futurecdn.net/xyiGWw8VkpBkeEXifog8Jh.jpg"
                  alt="Two"
                />
                <Carousel.Caption>
                  {/* <h3>Label for first slide</h3> */}
                  {/* <p>Sample Text for Image One</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  className="d-block w-100"
                  src="https://dlcdnrog.asus.com/rog/media/1640742394134.jpg"
                  alt="One"
                />
                <Carousel.Caption>
                  {/* <h3>Label for second slide</h3> */}
                  {/* <p>Sample Text for Image Two</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  className="d-block w-100"
                  src="https://www.redsharknews.com/hubfs/ASUS_14X_Space_Edition2-jpg.jpeg"
                  alt="Two"
                />
                <Carousel.Caption>
                  {/* <h3>Label for third slide</h3> */}
                  {/* <p>Sample Text for Image Three</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  className="d-block w-100"
                  src="https://lh5.googleusercontent.com/q6AUgZxJQSQzYNAdhzyMS8BltraiBJ1yKg8KZ09wiyi3NFTh5fbsgnRaBiYnVDbmnPyzOkPH2yTtzaQ2tLtKhur-0gxIY6SekLKB9oc12n0x2uAch95HiPo2jwyH6MgKlcTKuNTV"
                  alt="Two"
                />
                <Carousel.Caption>
                  {/* <h3>Label for forth slide</h3> */}
                  {/* <p>Sample Text for Image Four</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  className="d-block w-100"
                  src="https://lh6.googleusercontent.com/I7OoM5nqFl-O3AeONIFnoOGMxF5PWHRpnFcJ7mCQWotxV4pHD29XkxtleRqt0AIcfvNFpm9J8uGI-M8b87QokcmsEIyVY4jq0TC8koeyaHR0b9o1Hb1JocJrC3s-uNlYvtOd9k7G"
                  alt="Two"
                />
                <Carousel.Caption>
                  {/* <h3>Label for fifth slide</h3> */}
                  {/* <p>Sample Text for Image Five</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  className="d-block w-100"
                  src="https://lh5.googleusercontent.com/p3Iv2pJHbgBssB4_OOIlthO4KIQp9NKyDMHooUw4OC0IuBl3WWmFA3Q4e-BGiRIuwxh2XgpezBq1OmCbPNHxiFT30sXoj_KDOjXbPK4P5LzKzFM256lLINQ4UqtZzFtGJJ-dTZWF"
                  alt="Two"
                />
                <Carousel.Caption>
                  {/* <h3>Label for sixth slide</h3> */}
                  {/* <p>Sample Text for Image Six</p> */}
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          {/* <ProductsHome /> */}
        </div>
      </>
        }
      <Footer />
    </div>
  );
}

export default Home;
