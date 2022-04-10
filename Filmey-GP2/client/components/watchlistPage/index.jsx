import Popover from "@mui/material/Popover";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Footer from "../Footer";
import Header from "../header";
import "./watchlistPage.css";

const watchlistPage = (props) => {
  //remove from watchlist hover
  const [Operemoven, setremoveOpen] = React.useState(null);
  const removePopoverOpen = (event) => {
    setremoveOpen(event.currentTarget);
  };
  const removePopoverClose = () => {
    setremoveOpen(null);
  };
  const removeIsOpen = Boolean(Operemoven);

  const {} = props;

  var registered = false;
  var username = "";
  var user_id;
  var isAdmin;

  const cookies = new Cookies();
  try {
    const token = cookies.get("token");
    var decoded = jwt_decode(token);
    username = decoded.username;
    user_id = decoded.userID;
    isAdmin = decoded.isAdmin;
    registered = true;
  } catch {
    registered = false;
  }

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });

  const [listMovies, setListMovies] = useState([]);
  const [onWatchList, setOnWatchList] = useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    var listMoviesdArray = [...listMovies];
    var onWatchListArray = [...onWatchList];

    api
      .post(`Users/viewWatchList`, {
        user_id: user_id,
      })
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          listMoviesdArray[i] = response.data[i];
          onWatchListArray[i] = true;
        }

        //if finish getting all movies --> then set valuse
        if (listMoviesdArray.length == response.data.length) {
          console.log(listMoviesdArray);
          console.log("listMoviesdArray.indecies");
          console.log(listMoviesdArray.findIndex);
          setOnWatchList(onWatchListArray);
          setListMovies(listMoviesdArray);
        }
      });
  }, []);

  const removeFromWatchlist = (movie_id) => {
    console.log("remove");
    api
      .post(`Users/deleteWatchList`, {
        user_id: user_id,
        movie_id: movie_id,
      })
      .then((response) => {
        if (response) {
          setOnWatchList(false);
          console.log(onWatchList);
          window.location.reload();
        }
      });
  };
  return (
    <div>
      {/* header  */}
      <Header />
      {/* main content  */}
      <Container className="py-5">
        <div>
          <div className="page-title">{username}'s Watchlist</div>
        </div>
      </Container>
      <Container className="py-5">
        <Row className="g-4 cinema-movies">
          {listMovies.length > 0 ? (
            listMovies.map((x) => (
              <Col className="watch-list-box" sm={6} md={4} lg={3}>
                <div className="movie">
                  <Link to={`/movieInfoPage/${x.movie_id}`}>
                    <img className="moviePosterCarousel" src={x.poster} />
                    <div className="p-3">
                      <div className="movieRating">
                        <img className="movieStar" src="/img/star-2@2x.svg" />
                        <h4 className="movieRating neuton-bold-white-30px">
                          {x.total_rating}
                        </h4>
                      </div>
                      <h3 className="movieName neuton-bold-white-30px">
                        {x.title}
                      </h3>
                    </div>
                  </Link>
                </div>

                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: "none",
                  }}
                  open={removeIsOpen}
                  anchorEl={Operemoven}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  onClose={removePopoverClose}
                  disableRestoreFocus
                >
                  <div className="watchListHoverText" neuton-normal-white-30px>
                    {" "}
                    Remove from watchlist{" "}
                  </div>
                </Popover>

                <button
                  className="watch-list"
                  onClick={() => {
                    removeFromWatchlist(x.movie_id);
                  }}
                  aria-owns={removeIsOpen ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={removePopoverOpen}
                  onMouseLeave={removePopoverClose}
                >
                  <BsFillBookmarkCheckFill size={90} />{" "}
                </button>
              </Col>
            ))
          ) : (
            <div className="emptyWatchList neuton-bold-white-20px">
              No movies in your watch list
            </div>
          )}
        </Row>
      </Container>
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default watchlistPage;
