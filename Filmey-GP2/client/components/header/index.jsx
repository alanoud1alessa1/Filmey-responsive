import Axios from "axios";
import { isEmptyObject } from "jquery";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  default as loginIcon,
  default as registerIcon,
} from "../../static/img/iconly-light-profile@2x.svg";
import logo from "../../static/img/loginPageLogo.png";
import regUser from "../../static/img/regUser.png";
import "./header.css";

function Header(props) {
  var registered = false;
  var username = "";
  var isAdmin = false;

  const cookies = new Cookies();
  try {
    const token = cookies.get("token");
    var decoded = jwt_decode(token);
    username = decoded.username;
    // userId = decoded.userID;
    // console.log(userId)
    isAdmin = decoded.isAdmin;
    registered = true;
  } catch {
    registered = false;
  }

  const logOut = () => {
    cookies.remove("token", { path: "/" });
    window.location = "/home-page";
  };

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });

  const [Allposters, setAllposters] = useState([]);

  React.useEffect(() => {
    let numOfTopMovies = 10;

    api.get(`/movies/topMovies/${numOfTopMovies}`).then((response) => {
      const postersArray = [...Allposters];

      for (var i = 0; i < numOfTopMovies; i++) {
        postersArray[i] = response.data[i].poster;
      }
      setAllposters(postersArray);
    });
  }, []);

  const refreashPage = () => {
    window.location = "/genresPage/1";
  };

  return (
    <div>
      <div className="mb-5">
        <Navbar
          id="nav-bar"
          className="shadow-lg"
          // fixed="top"
          // bg="dark"
          variant="dark"
          expand="lg"
        >
          <Container className="pe-md-5 d-flex align-items-center" fluid>
            <Navbar.Brand as={Link} to="/home-page">
              <img className="headerLogo" src={logo} />
            </Navbar.Brand>
            <div className="d-lg-none ms-auto">
              <div className=" d-flex align-items-center text-center">
                {/* unregisterd user */}
                {!registered && (
                  <Nav.Link
                    as={Link}
                    className="navbar-link p-1"
                    to="/login-page"
                  >
                    <div>
                      <img className="userIcon" src={loginIcon} alt="" />
                      <div>
                        <span>Login</span>
                      </div>
                    </div>
                  </Nav.Link>
                )}

                {!registered && (
                  <Nav.Link
                    as={Link}
                    className="navbar-link p-1"
                    to="/registerPage"
                  >
                    <div>
                      <img className="userIcon" src={registerIcon} alt="" />
                      <div>
                        <span>Register</span>
                      </div>
                    </div>
                  </Nav.Link>
                )}
              </div>
            </div>
            {registered && !isAdmin && (
              <div className="d-lg-none ms-auto me-2">
                <div className="d-flex gap-3 justify-content-center align-items-center flex-column flex-md-row text-center">
                  {registered && (
                    <div>
                      <div className="registeredUser d-flex align-items-center ms-3">
                        <img className="regUserIcon userIcon" src={regUser} />
                        <div className="dropdown">
                          <a className="dropbtn text-capitalize">{username}</a>
                          <div className="dropdownContent">
                            <a className="logout" onClick={logOut}>
                              Logout
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto d-flex align-items-center gap-md-4">
                <Nav.Link as={Link} className="navbar-link" to="/home-page">
                  Home
                </Nav.Link>
                <Nav.Link>
                  <div onClick={refreashPage}>
                    <div>
                      <div className="navbar-link">Genres</div>
                    </div>
                  </div>
                </Nav.Link>
                {isAdmin && (
                  <div>
                    <Nav.Link
                      as={Link}
                      className="navbar-link"
                      to="/movieForm/0"
                    >
                      Add movie
                    </Nav.Link>
                  </div>
                )}
                {/*Saudi Cinemas*/}
                <div>
                  {!isAdmin && (
                    <Nav.Link
                      as={Link}
                      className="navbar-link"
                      to="/cinemasPage"
                    >
                      {" "}
                      Saudi Cinemas
                    </Nav.Link>
                  )}
                </div>
              </Nav>
              {/* right part  */}
              <Nav className="ms-auto d-flex align-items-center">
                <div className="ms-5 d-none d-lg-flex gap-4 justify-content-center align-items-center flex-column flex-md-row text-center ">
                  {/* unregisterd user */}
                  {!registered && (
                    <Nav.Link
                      as={Link}
                      className="navbar-link"
                      to="/login-page"
                    >
                      <div>
                        <img src={loginIcon} alt="" />
                        <div>
                          <span>Login</span>
                        </div>
                      </div>
                    </Nav.Link>
                  )}

                  {!registered && (
                    <Nav.Link
                      as={Link}
                      className="navbar-link"
                      to="/registerPage"
                    >
                      <div>
                        <img src={registerIcon} alt="" />
                        <div>
                          <span>Register</span>
                        </div>
                      </div>
                    </Nav.Link>
                  )}
                </div>

                {/* registerd user */}
                <div className="d-none d-lg-flex gap-3 justify-content-center align-items-center flex-column flex-md-row text-center">
                  {/* registerd user and not admin */}

                  <div>
                    {registered && !isAdmin && (
                      <div>
                        <Link to="/watchlistPage">
                          <div>
                            <div className="navbar-link">Watchlist</div>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>

                  {registered && (
                    <div>
                      <div className="registeredUser d-flex align-items-center ms-3">
                        <img className="regUserIcon me-1" src={regUser} />
                        <div className="dropdown">
                          <a className="dropbtn text-capitalize">{username}</a>
                          <div className="dropdownContent">
                            <a className="logout" onClick={logOut}>
                              Logout
                            </a>
                          </div>
                        </div>
                        {/* <ul>
                              
                            </ul> */}
                      </div>
                    </div>
                  )}
                </div>
                {/* mobile version */}
                <div className="d-flex d-lg-none gap-2 mt-2 justify-content-center align-items-center flex-column flex-lg-row text-center">
                  {/* registerd user and not admin */}

                  <div>
                    {registered && !isAdmin && (
                      <div>
                        <Link to="/watchlistPage">
                          <div>
                            <div className="navbar-link">Watchlist</div>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>

                  {registered && (
                    <div>
                      <div className="registeredUser d-flex align-items-center">
                        <div>
                          <a className="text-white" onClick={logOut}>
                            Logout
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Nav>
              {/* </Nav> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
