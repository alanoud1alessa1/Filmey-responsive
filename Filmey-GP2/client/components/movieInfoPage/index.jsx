import Popover from "@mui/material/Popover";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  BsFillBookmarkCheckFill,
  BsFillBookmarkPlusFill,
} from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { GiTicket } from "react-icons/gi";
import { RiDeleteBin2Line } from "react-icons/ri";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Cookies from "universal-cookie";
import leftArrow from "../../static/img/left-arrow.svg";
import line from "../../static/img/line-5@1x.svg";
import rightArrow from "../../static/img/right-arrow.svg";
import star from "../../static/img/star-2@2x.svg";
import Footer from "../Footer";
import Header from "../header";
import "./movieInfoPage.css";

// slider next prev
const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={"PreviousArrow"} onClick={onClick}>
      <img src={leftArrow} alt="" />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={"NextArrow"} onClick={onClick}>
      <img src={rightArrow} alt="" />
    </div>
  );
};

const MovieInfo = (props) => {
  // slider
  const settings = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextBtn />,
    prevArrow: <PreviousBtn />,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const bookTicket = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextBtn />,
    prevArrow: <PreviousBtn />,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const review = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextBtn />,
    prevArrow: <PreviousBtn />,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //add to watchlist hover
  const [addOpen, setaddOpen] = React.useState(null);
  const addPopoverOpen = (event) => {
    setaddOpen(event.currentTarget);
  };
  const addPopoverClose = () => {
    setaddOpen(null);
  };
  const addIsOpen = Boolean(addOpen);

  //remove from watchlist hover
  const [Operemoven, setremoveOpen] = React.useState(null);
  const removePopoverOpen = (event) => {
    setremoveOpen(event.currentTarget);
  };
  const removePopoverClose = () => {
    setremoveOpen(null);
  };
  const removeIsOpen = Boolean(Operemoven);

  const runCallback = (cb) => {
    return cb();
  };

  const {
    movieRating,
    directorText,
    writersText,
    descriptionText,
    topCastText,
    reviewsText,
    reviewItText,
    logo,
    languageText2,
    footerText1,
    footerText2,
    playTrailerText,
    genreText,
    yourRatingText,
  } = props;

  var registered = false;
  var username = "";
  var isAdmin = false;

  const cookies = new Cookies();
  try {
    const token = cookies.get("token");
    var decoded = jwt_decode(token);
    username = decoded.username;
    isAdmin = decoded.isAdmin;
    registered = true;
  } catch {
    registered = false;
  }

  const logOut = () => {
    cookies.remove("token", { path: "/" });
    window.location.reload();
  };

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
    // headers :{
    //  // 'authorization' : token
  });

  const [mid, setMid] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [length, setLength] = useState("");
  const [age_guide, setAge_guide] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [trailer_url, setTrailer_url] = useState("");

  const [genre, setGenre] = useState([""]);
  const [directors, setDirectors] = useState([""]);
  const [writers, setWriters] = useState([""]);
  const [languages, setLanguages] = useState([""]);
  const [castNames, setCastNames] = useState([""]);
  const [castImgs, setCastImgs] = useState([""]);
  const [castRoles, setCastRoles] = useState([""]);
  const [numOfCasts, setNumOfCasts] = useState(0);

  const [reviews, setReviews] = useState([]);
  const [EReviews, setEReviews] = useState([]);

  const [totalRating, setTotalRating] = useState();
  const [totalUsersRating, setTotalUsersRating] = useState();
  var totalUsers;

  const [movieTitles, setmovieTitles] = useState([]);
  const [totalRatings, settotalRatings] = useState([]);
  const [additionalState, setAdditionalState] = useState([]);
  const [onWatchList, setOnWatchList] = useState(false);

  //InCinema Location Variables and constans
  const [cinemaIds, setCinemaIds] = useState([]);
  const [cinemaNames, setCinemaNames] = useState([]);
  const [cinemaCity, setCinemaCity] = useState([]);
  const [cinemaLocation, setcinemaLocation] = useState([]);
  const [cinemaBookingLink, setCinemaBookingLink] = useState([]);
  const [cinemasOptions, setCinemasOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [allcinemaInfo, setallCinemaInfo] = useState([]);
  const [cinemaInfo, setCinemaInfo] = useState([]);
  const [, forceRender] = useState({});
  const [selectedCinemasState, setSelectedCinemasState] = useState([
    "vox",
    "amc",
    "muvi",
  ]);
  const [selectedCityState, setSelectedCityState] = useState([]);

  var selectedCity = [];
  //default value
  for (var i = 0; i < cityOptions.length; i++) {
    selectedCity.push(cityOptions[i].value);
  }

  var selectedCinemas = [];
  //default value
  for (var i = 0; i < cinemasOptions.length; i++) {
    selectedCinemas.push(cinemasOptions[i].value);
  }

  const filterCinemasName = (e) => {
    for (var i = 0; i < e.length; i++) {
      selectedCinemas[i] = e[i].value;
    }

    var length = e.length;
    if (length != 0) {
      for (var i = length; i < selectedCinemas.length; i++) {
        selectedCinemas[i] = "";
      }
    }
    setSelectedCinemasState(selectedCinemas);
    var cinemasNameArray = allcinemaInfo.filter(
      (x) => selectedCinemas.includes(x.name) == true
    );
    var cinemasCityArray = cinemasNameArray.filter(
      (x) => selectedCityState.includes(x.city.toLowerCase()) == true
    );
    setCinemaInfo(cinemasCityArray);
  };

  const filterCinemasCity = (e) => {
    for (var i = 0; i < e.length; i++) {
      selectedCity[i] = e[i].value;
    }

    var length = e.length;
    if (length != 0) {
      for (var i = length; i < selectedCity.length; i++) {
        selectedCity[i] = "";
      }
    }
    setSelectedCityState(selectedCity);
    var cinemasNameArray = allcinemaInfo.filter(
      (x) => selectedCinemasState.includes(x.name) == true
    );
    var cinemasCityArray = cinemasNameArray.filter(
      (x) => selectedCity.includes(x.city.toLowerCase()) == true
    );
    setCinemaInfo(cinemasCityArray);
  };

  //Movie Status
  const [isInCinema, setIsInCinema] = useState();
  const [isComingSoon, setIsComingSoon] = useState();

  //Release date
  const [releaseDate, setReleaseDate] = useState([]);
  const [numOfReleaseDate, setNumOfReleaseDate] = useState([]);
  const [releaseDateCinemaName, setReleaseDateCinemaName] = useState([]);

  let { id } = useParams();
  id = parseInt(id);

  const addToWatchlist = () => {
    setaddOpen(null);
    if (!registered || isAdmin) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="customconfirmAlert">
              <h1>Sorry!</h1>
              <h5>You have to login</h5>
              <button
                className="yesButton"
                onClick={() => {
                  onClose();
                }}
              >
                OK
              </button>
            </div>
          );
        },
      });
      return;
    }

    api
      .post(`Users/addToWatchList`, {
        user_id: decoded.userID,
        movie_id: id,
      })
      .then((response) => {
        if (response) {
          setOnWatchList(true);
          console.log(onWatchList);
        }
      });
  };
  const removeFromWatchlist = () => {
    setremoveOpen(null);
    setOnWatchList(false);
    api
      .post(`Users/deleteWatchList`, {
        user_id: decoded.userID,
        movie_id: id,
      })
      .then((response) => {
        if (response) {
          setOnWatchList(false);
        }
      });
  };

  var isEdit;
  const [hasReviewed, setHasReviewed] = useState();
  const [userReviewID, setUserReviewID] = useState();

  const addReview = () => {
    isEdit = 0;
    if (!registered) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="customconfirmAlert">
              <h1>Sorry!</h1>
              <h5>You have to login</h5>
              <button
                className="yesButton"
                onClick={() => {
                  onClose();
                }}
              >
                OK
              </button>
            </div>
          );
        },
      });
      return;
    }
    window.location.href = `/reviewPage/${id}/${isEdit}`;
  };

  const editReview = () => {
    isEdit = 1;
    window.location.href = `/reviewPage/${id}/${isEdit}`;
  };

  const confirmDeleteReview = (isUser, review_id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="customconfirmAlert">
            <h1>Are you sure</h1>
            <h5>You want to delete this review?</h5>
            <button className="noButton" onClick={onClose}>
              Cancel
            </button>
            <button
              className="yesButton"
              onClick={() => {
                deleteReview(isUser, review_id);
                {
                  /* newHere   */
                }
                if (isUser) {
                  setHasReviewed(false);
                }
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const updateReviews = () => {
    const updateReviews = api.get(`/movies/review/${id}`).then((response) => {
      const numOfReviews = response.data.length;
      const reviewsArray = [...reviews];

      for (var i = 0; i < numOfReviews; i++) {
        reviewsArray[i] = response.data[i];
      }
      setReviews(reviewsArray);
      setEReviews(reviewsArray);
    });
  };

  //Rating function
  //var userRating;
  const [haveRated, sethaveRated] = useState(false);
  const [userRating, setuserRating] = useState();
  const [ratedMovie, setratedMovie] = useState(false);
  var rating;

  const updateMovieRating = () => {
    api.get(`/movies/rating/${id}`).then((response) => {
      if (response.data.length == 0) {
        setTotalUsersRating(0);
        totalUsers = 0;
      } else {
        setTotalRating(response.data[0].total_rating);
        setTotalUsersRating(response.data[0].total_users);
        totalUsers = response.data[0].total_users;
      }
      if (Number(totalUsers) > 0) {
        setratedMovie(true);
      } else {
        setratedMovie(false);
      }
    });
  };

  const deleteMovie = () => {
    const res = Axios.post("http://localhost:3000/api/v1/movies/delete", {
      movie_id: id,
      admin_id: decoded.userID,
    }).then((res) => {
      if (res.data) {
        window.location = "/home-page";
      } else {
        alert("Sorry, an error occured. Please try again");
      }
    });
  };

  const confirmDeleteMovie = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="customconfirmAlert">
            <h1>Are you sure</h1>
            <h5>You want to delete this movie?</h5>
            <button className="noButton" onClick={onClose}>
              Cancel
            </button>
            <button
              className="yesButton"
              onClick={() => {
                deleteMovie();
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const addRating = (value) => {
    if (!registered) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="customconfirmAlert">
              <h1>Sorry!</h1>
              <h5>You have to login</h5>
              <button
                className="yesButton"
                onClick={() => {
                  onClose();
                }}
              >
                OK
              </button>
            </div>
          );
        },
      });
      return;
    }
    rating = value;

    setuserRating(value);
    sethaveRated(true);
    const res = Axios.post("http://localhost:3000/api/v1/users/rating", {
      userID: decoded.userID,
      movieID: id,
      rating: parseInt(value),
    }).then((res) => {});
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="customconfirmAlert">
            <h1>Thank u!</h1>
            <h5>Your rating has been saved successfully.</h5>
            <button
              className="yesButton"
              onClick={() => {
                updateMovieRating();
                onClose();
              }}
            >
              OK
            </button>
          </div>
        );
      },
    });
  };

  const deleteRating = () => {
    const res = Axios.post("http://localhost:3000/api/v1/users/deleteRating", {
      userID: decoded.userID,
      movieID: id,
    }).then((res) => {
      if (res.data) {
        sethaveRated(false);
      }
      updateMovieRating();
    });
  };

  const confirmDeleteRating = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="customconfirmAlert">
            <h1>Are you sure</h1>
            <h5>You want to delete your rating?</h5>
            <button className="noButton" onClick={onClose}>
              Cancel
            </button>
            <button
              className="yesButton"
              onClick={() => {
                deleteRating();
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const deleteReview = (isUser, review_id) => {
    if (isUser) {
      const res = Axios.post(
        "http://localhost:3000/api/v1/users/deleteReview",
        {
          review_id: review_id,
        }
      ).then((res) => {
        window.location.reload(true);
      });
    } else {
      const res = Axios.post(
        "http://localhost:3000/api/v1/admins/deleteReview",
        {
          admin_id: decoded.userID,
          review_id: review_id,
        }
      ).then((res) => {
        window.location.reload(true);
      });
    }
  };
  const [similarMoviesPostersState, setSimilarMoviesPostersState] = useState(
    []
  );
  var similarMoviesPosters = [];
  const [movieIds, setMovieIds] = useState([]);
  const [Allposters, setAllposters] = useState([]);
  const [moviesRatingState, setMoviesRatingState] = useState([]);
  var ratings = [];

  React.useEffect(() => {
    if (registered) {
      api
        .post(`Users/isOnWatchList`, {
          user_id: decoded.userID,
          movie_id: id,
        })
        .then((response) => {
          if (response.data) {
            setOnWatchList(true);
          }
        });
    }

    Axios.post("http://localhost:5000/contentBased", {
      movieID: id,
    }).then((res) => {
      var IdsArray = [...movieIds];
      var postersArray = [...Allposters];
      var movieTitlesArray = [...movieTitles];
      var ratingsArray = [...totalRatings];
      var additionalState = [...additionalState];

      for (var i = 0; i < 20; i++) {
        IdsArray[i] = res.data[i][0];
        postersArray[i] = res.data[i][1];
        movieTitlesArray[i] = res.data[i][2];
        ratingsArray[i] = res.data[i][3];
        additionalState[i] = res.data[i][3];
      }

      setMovieIds(IdsArray);
      setAllposters(postersArray);
      setSimilarMoviesPostersState(similarMoviesPosters);
      setmovieTitles(movieTitlesArray);
      settotalRatings(ratingsArray);
      setAdditionalState(additionalState);
    });

    //Check if user has reviewed movie
    if (registered && !isAdmin) {
      var userID = decoded.userID;
      api.get(`users/ifReview/${id}/${userID}`).then((response) => {
        if (response.data[0]) {
          setHasReviewed(true);
          setUserReviewID(response.data[0].review_id);
        } else {
          setHasReviewed(false);
        }
      });
    }

    window.scrollTo(0, 0);
    if (registered && !isAdmin) {
      const res = Axios.post("http://localhost:3000/api/v1/users/getRating", {
        userID: decoded.userID,
        movieID: id,
      }).then((res) => {
        if (res.data[0]) {
          sethaveRated(true);
          setuserRating(res.data[0]);
        }
      });
    }

    // }

    //Get movie info
    api.get(`/movies/${id}`).then((response) => {
      setMid(response.data[0].movie_id);
      setTitle(response.data[0].title);
      setYear(response.data[0].year);
      setLength(response.data[0].length);
      setAge_guide(response.data[0].age_guide);
      setDescription(response.data[0].description);
      setPoster(response.data[0].poster);
      setTrailer_url(response.data[0].trailer_url);
    });

    //Get Genres
    api.get(`/movies/genre/${id}`).then((response) => {
      const numOfGenres = response.data.length;
      const newArr = [...genre];

      for (var i = 0; i < numOfGenres; i++) {
        if (i < numOfGenres - 1) {
          newArr[i] = response.data[i].genre + ", ";
        } else {
          newArr[i] = response.data[i].genre;
        }
      }

      setGenre(newArr);
    });

    //Get Directors
    api.get(`/movies/directors/${id}`).then((response) => {
      const numOfDirectors = response.data.length;
      const newArr = [...directors];

      for (var i = 0; i < numOfDirectors; i++) {
        if (i < numOfDirectors - 1) {
          newArr[i] = response.data[i].director + ", ";
        } else {
          newArr[i] = response.data[i].director;
        }
      }

      setDirectors(newArr);
    });

    //Get Writers
    api.get(`/movies/writers/${id}`).then((response) => {
      const numOfWriters = response.data.length;
      const newArr = [...writers];

      for (var i = 0; i < numOfWriters; i++) {
        if (i < numOfWriters - 1) {
          newArr[i] = response.data[i].writer + ", ";
        } else {
          newArr[i] = response.data[i].writer;
        }
      }

      setWriters(newArr);
    });

    //Get Languages
    api.get(`/movies/languages/${id}`).then((response) => {
      const numOfLanguages = response.data.length;
      const newArr = [...languages];

      for (var i = 0; i < numOfLanguages; i++) {
        if (i < numOfLanguages - 1) {
          newArr[i] = response.data[i].language + ", ";
        } else {
          newArr[i] = response.data[i].language;
        }
      }

      setLanguages(newArr);
    });

    //Get Casts
    api.get(`/movies/casts/${id}`).then((response) => {
      setNumOfCasts(response.data.length);

      const numCasts = response.data.length;
      const newArr1 = [...castNames];
      const newArr2 = [...castImgs];
      const newArr3 = [...castRoles];

      for (var i = 0; i < numCasts; i++) {
        newArr1[i] = response.data[i].actor;
        newArr2[i] = response.data[i].actor_image_url;
        newArr3[i] = response.data[i].role;
      }
      setCastNames(newArr1);
      setCastImgs(newArr2);
      setCastRoles(newArr3);
    });

    //Get Rating
    api.get(`/movies/rating/${id}`).then((response) => {
      if (response.data.length == 0) {
        setTotalUsersRating(0);
        totalUsers = 0;
      } else {
        setTotalRating(response.data[0].total_rating);
        setTotalUsersRating(response.data[0].total_users);
        totalUsers = response.data[0].total_users;
      }
      if (Number(totalUsers) > 0) {
        setratedMovie(true);
      }
    });

    //Get Reviews
    var i = 0;
    var reviewsArray = [...reviews];
    var userID = 0;
    if (registered && !isAdmin) {
      userID = decoded.userID;

      api.get(`movies/ifReview/${id}/${userID}`).then((response) => {
        if (response.data.result[0]) {
          reviewsArray[0] = response.data.result[0];
          const numOfReviews = response.data.reviews.length;
          var j = 1;
          for (var i = 0; i < numOfReviews; i++) {
            reviewsArray[j] = response.data.reviews[i];
            j = j + 1;
          }
        } else {
          const numOfReviews = response.data.reviews.length;
          for (var i = 0; i < numOfReviews; i++) {
            reviewsArray[i] = response.data.reviews[i];
          }
        }

        setReviews(reviewsArray);
        setEReviews(reviewsArray);
      });
    } else {
      const updateReviews = api.get(`/movies/review/${id}`).then((response) => {
        const numOfReviews = response.data.length;
        var reviewsArray = [...reviews];

        for (var i = 0; i < numOfReviews; i++) {
          reviewsArray[i] = response.data[i];
        }

        setReviews(reviewsArray);
        setEReviews(reviewsArray);
      });
    }

    //Get movie status
    api.get(`/movies/movieStatus/${id}`).then((response) => {
      setIsComingSoon(response.data[0].is_coming_soon);
      setIsInCinema(response.data[0].is_in_cinema);
    });

    //Get cinema info
    console.log("inCinmas");
    api.get(`/movies/inCinemas/${id}`).then((response) => {
      console.log(response.data);
      setallCinemaInfo(response.data);
      setCinemaInfo(response.data);
      var cinemaIdsArray = [...cinemaIds];
      var cinemaCitysArrays = [...cinemaCity];
      var cinemaLocationsArray = [...cinemaLocation];
      var cinemaNamesArray = [...cinemaNames];
      var cinemaBookingLinksArray = [...cinemaBookingLink];

      for (var i = 0; i < response.data.length; i++) {
        cinemaIdsArray[i] = response.data[i].cinema_id;
        cinemaCitysArrays[i] = response.data[i].city;
        cinemaLocationsArray[i] = response.data[i].location;
        cinemaNamesArray[i] = response.data[i].name;
        cinemaBookingLinksArray[i] = response.data[i].booking_link;
      }
      setCinemaBookingLink(cinemaBookingLinksArray);
      setCinemaIds(cinemaIdsArray);
      setCinemaCity(cinemaCitysArrays);
      setcinemaLocation(cinemaLocationsArray);
      setCinemaNames(cinemaNamesArray);

      cinemaNamesArray = cinemaNamesArray.filter(
        (value, index, self) => self.indexOf(value) === index
      );
      for (var i = 0; i < cinemaNamesArray.length; i++) {
        cinemaNamesArray[i] = {
          label: cinemaNamesArray[i].toUpperCase(),
          value: cinemaNamesArray[i],
        };
      }
      setCinemasOptions(cinemaNamesArray);

      for (var i = 0; i < cinemaCitysArrays.length; i++) {
        cinemaCitysArrays[i] = cinemaCitysArrays[i].toLowerCase();
      }
      cinemaCitysArrays = cinemaCitysArrays.filter(
        (value, index, self) => self.indexOf(value) === index
      );

      for (var i = 0; i < cinemaCitysArrays.length; i++) {
        cinemaCitysArrays[i] = {
          label:
            cinemaCitysArrays[i].charAt(0).toUpperCase() +
            cinemaCitysArrays[i].slice(1),
          value: cinemaCitysArrays[i],
        };
      }
      setCityOptions(cinemaCitysArrays);

      var cinemaCityArray = [];
      for (var i = 0; i < cinemaCitysArrays.length; i++) {
        cinemaCityArray[i] = cinemaCitysArrays[i].value;
      }
      setSelectedCityState(cinemaCityArray);
    });

    //Get movie status
    api.get(`/movies/movieStatus/${id}`).then((response) => {
      setIsComingSoon(response.data[0].is_coming_soon);
      setIsInCinema(response.data[0].is_in_cinema);
    });

    //Get release date for coming soon movie
    api.get(`/movies/getReleaseDate/${id}`).then((response) => {
      var releaseDateArray = [...releaseDate];
      var releaseDateCinemaNameArray = [...releaseDateCinemaName];

      setNumOfReleaseDate(response.data.length);

      for (var i = 0; i < response.data.length; i++) {
        var date = response.data[i].release_date;
        releaseDateArray[i] = date.substring(0, date.indexOf("T"));
        releaseDateCinemaNameArray[i] = response.data[i].cinema_name;
      }

      setReleaseDate(releaseDateArray);
      setReleaseDateCinemaName(releaseDateCinemaNameArray);
    });
  }, []);
  return (
    <div>
      {/* header  */}
      <Header />
      {/* popups */}
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={addIsOpen}
        anchorEl={addOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={addPopoverClose}
        disableRestoreFocus
      >
        <div className="watchListHoverText" neuton-normal-white-30px>
          {" "}
          Add to watchlist{" "}
        </div>
      </Popover>
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
      {/* popups  */}

      {/* main content  */}
      {/* movie info section  */}
      <div fluid className="py-5 overflow-hidden movieInformationSection">
        <Row className="g-4">
          <Col sm={12} md={3}>
            <div className="moviePosterBox">
              <div className="w-100">
                <img className="img-fluid movie-info-poster" src={poster} />
              </div>
              {onWatchList && !isAdmin && (
                <button
                  className="watchList"
                  onClick={removeFromWatchlist}
                  aria-owns={removeIsOpen ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={removePopoverOpen}
                  onMouseLeave={removePopoverClose}
                >
                  <BsFillBookmarkCheckFill size={90} />{" "}
                </button>
              )}

              {!onWatchList && !isAdmin && (
                <button
                  className="addBookMark"
                  onClick={addToWatchlist}
                  aria-owns={addIsOpen ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={addPopoverOpen}
                  onMouseLeave={addPopoverClose}
                >
                  <BsFillBookmarkPlusFill size={90} />{" "}
                </button>
              )}
              <div className="mt-4 text-center">
                <a className="trailer" href={trailer_url} target="_blank">
                  <i className="fa fa-play-circle me-2"> </i>
                  {playTrailerText}{" "}
                </a>
              </div>
            </div>
          </Col>
          <Col className="overflow-hidden" sm={12} md={9}>
            {/* movie information */}
            <div>
              {/* basic info  */}
              <div className="">
                <div>
                  <h4 className="title">
                    {" "}
                    {title} <span className="year ms-1"> ({year})</span>{" "}
                  </h4>{" "}
                </div>
                <div className="d-flex align-items-center gap-4 my-2">
                  <img className="" src={star} />
                  {ratedMovie && (
                    <div className="mt-2">
                      <h5>
                        {totalRating} / 5. {totalUsersRating} ratings{" "}
                      </h5>
                    </div>
                  )}
                  {!ratedMovie && (
                    <div className="mt-2">
                      <h5>The movie has no ratings yet.</h5>
                    </div>
                  )}
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="pg">
                    <div className="moviepg neuton-bold-white-20px">
                      {age_guide}
                    </div>
                  </div>
                  <div className="time">
                    <div className="movieTime neuton-bold-white-20px">
                      ( {length} )
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 mt-4">
                <h3 className="neuton-bold-white-24px">{genreText}</h3>
                <div className="roboto-normal-baby-powder-25px">{genre}</div>
              </div>
              {/* line  */}
              <div className="my-2">
                <img className="" src={line} />
              </div>
              {/* line  */}
              <div className="">
                <h3 className="desText neuton-bold-white-24px">
                  {descriptionText}
                </h3>
                <p className="movieDesCription roboto-normal-baby-powder-25px">
                  {description}
                </p>
              </div>
              {/* line  */}
              <div className="my-2">
                <img className="" src={line} />
              </div>
              {/* line  */}
              <div className="d-flex gap-5">
                <h3 className="neuton-bold-white-24px">{directorText}</h3>
                <h4 className="roboto-normal-baby-powder-25px">{directors}</h4>
              </div>
              {/* line  */}
              <div className="my-2">
                <img className="" src={line} />
              </div>

              <div className="d-flex gap-5">
                <h3 className="neuton-bold-white-24px">{writersText}</h3>
                <h4 className="roboto-normal-baby-powder-25px">{writers}</h4>
              </div>

              {/* line  */}
              <div className="my-2">
                <img className="" src={line} />
              </div>

              <div className="d-flex gap-5">
                <h3 className="neuton-bold-white-24px">{languageText2}</h3>
                <h4 className="roboto-normal-baby-powder-25px">{languages}</h4>
              </div>
              {/* coming soon  */}
              {isComingSoon && (
                <div>
                  <div className="my-2">
                    <img className="" src={line} />
                  </div>
                  <div className="d-flex gap-5">
                    <div className="neuton-bold-white-24px">Release Date</div>

                    <div className="d-flex gap-5 roboto-normal-baby-powder-25px">
                      {runCallback(() => {
                        const row = [];

                        for (var i = 0; i < numOfReleaseDate; i++) {
                          var date = releaseDate[i];
                          var cinemaName = releaseDateCinemaName[i];

                          row.push(
                            <div key={i}>
                              {
                                <div>
                                  {cinemaName == "vox" && (
                                    <div className="movieCinemaReleaseDate">
                                      <img
                                        src="/img/voxWhite.png"
                                        height="40"
                                        width="30"
                                      />
                                      <div>{date}</div>
                                    </div>
                                  )}

                                  {cinemaName == "amc" && (
                                    <div className="movieCinemaReleaseDate">
                                      <img
                                        src="/img/amcLogo.png"
                                        height="40"
                                        width="60"
                                      />
                                      <div>{date}</div>
                                    </div>
                                  )}

                                  {cinemaName == "muvi" && (
                                    <div className="movieCinemaReleaseDate">
                                      <img
                                        src="/img/muviLogo.png"
                                        height="35"
                                        width="60"
                                      />
                                      <div>{date}</div>
                                    </div>
                                  )}
                                </div>
                              }
                            </div>
                          );
                        }
                        return row;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <div className="ratingBox">
          {/*  add rating */}
          {!haveRated && !isAdmin && (
            <div className="addRating">
              <h4 className="rateItText neuton-normal-white-30px">Rate it !</h4>
              <div class="rating-css">
                <div
                  class="star-icon"
                  onChange={(e) => {
                    addRating(e.target.value);
                  }}
                >
                  <input type="radio" name="rating1" id="rating1" value="5" />
                  <label
                    for="rating1"
                    className="fas fa-star star-icon"
                  ></label>
                  <input type="radio" name="rating1" id="rating2" value="4" />
                  <label
                    for="rating2"
                    className="fas fa-star star-icon"
                  ></label>
                  <input type="radio" name="rating1" id="rating3" value="3" />
                  <label
                    for="rating3"
                    className="fas fa-star star-icon"
                  ></label>
                  <input type="radio" name="rating1" id="rating4" value="2" />
                  <label
                    for="rating4"
                    className="fas fa-star star-icon"
                  ></label>
                  <input type="radio" name="rating1" id="rating5" value="1" />
                  <label
                    for="rating5"
                    className="fas fa-star star-icon"
                  ></label>
                </div>
              </div>
            </div>
          )}
          {/* after add rating */}
          {haveRated && (
            <div className="d-flex align-items-center gap-4 my-2">
              <div className="neuton-normal-white-30px">{yourRatingText}</div>
              <div className="d-flex align-items-center gap-4 mt-2">
                <img className="" src={star} />
                <div className="mt-2">
                  <h5>{userRating} / 5</h5>
                </div>
              </div>
            </div>
          )}
          {/* remove rating */}
          {haveRated && (
            <button
              className="removeRating neuton-normal-white-20px"
              onClick={confirmDeleteRating}
            >
              Remove Rating
            </button>
          )}
        </div>
        {/* edit movie */}
        {isAdmin && (
          <div className="d-flex align-items-center gap-2 edit-delete-btn">
            <button className="edit-movie-btn">
              <Link to={`/movieForm/${id}`}>
                <FiEdit className="me-1" size={30} />
                <span> Edit</span>
              </Link>
            </button>

            {/* delete movie */}
            <button className="delete-movie-btn" onClick={confirmDeleteMovie}>
              <RiDeleteBin2Line className="me-1" size={35} />{" "}
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
      {/* top cast section  */}
      <Container className="py-5">
        {/* top cast section */}
        <div>
          <h3 className="section-title neuton-normal-white-60px5">
            {topCastText}
          </h3>
        </div>
        <div className="mt-5">
          <Slider {...settings}>
            {/* casts loop	 */}
            {runCallback(() => {
              const row = [];
              for (var i = 0; i < numOfCasts; i++) {
                const castImg = castImgs[i];
                const castName = castNames[i];
                const castRole = castRoles[i];

                row.push(
                  <div key={i}>
                    {
                      <div className="movie shadow-lg text-center">
                        <div>
                          <img
                            className="moviePosterCarousel img-fluid"
                            src={castImg}
                          />
                          <div className="p-4">
                            <div className="castName neuton-bold-white-20px">
                              {castName}
                            </div>
                            <div className="castRole roboto-normal-white-15px">
                              as {castRole}
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                );
              }
              return row;
            })}
          </Slider>
        </div>
      </Container>
      {/* book ticket section  */}
      {isInCinema && (
        <Container className="py-5">
          <div className="d-flex align-items-center gap-5 flex-wrap">
            <div>
              <h3 className="section-title neuton-normal-white-60px5">
                Book Ticket
              </h3>
            </div>
            {!isInCinema && (
              <div className="neuton-bold-white-20px">
                The movie not shown in cinemas now.
              </div>
            )}
            {isInCinema && (
              <div className="">
                <ReactMultiSelectCheckboxes
                  className="cinemaFilter"
                  onInputChange={() => forceRender({})}
                  options={cinemasOptions}
                  placeholderButtonLabel="Select Cinema"
                  onChange={(e) => {
                    filterCinemasName(e);
                  }}
                  styles={{
                    dropdownButton: (provided, state) => ({
                      ...provided,
                      minHeight: "56",
                      minWidth: "200",
                      background: "#fcfcfc",
                      outline: "none",
                      border: "0px solid black",
                      fontSize: "16px",
                      boxShadow: state.isOpen
                        ? "0px 4px 4px var(--cardinal)"
                        : "0px 4px 4px #00000040",
                      borderRadius: "50",
                      padding: "10px 10px 10px 20px",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: state.isSelected ? "var(--cardinal)" : "black",
                      background: "white",
                    }),
                  }}
                />
              </div>
            )}
            {isInCinema && (
              <div className="">
                <ReactMultiSelectCheckboxes
                  className="cityFilter"
                  onInputChange={() => forceRender({})}
                  options={cityOptions}
                  onChange={(e) => {
                    filterCinemasCity(e);
                  }}
                  placeholderButtonLabel="Select City"
                  styles={{
                    dropdownButton: (provided, state) => ({
                      ...provided,
                      minHeight: "56",
                      minWidth: "200",
                      background: "#fcfcfc",
                      outline: "none",
                      border: "0px solid black",
                      fontSize: "16px",
                      boxShadow: state.isOpen
                        ? "0px 4px 4px var(--cardinal)"
                        : "0px 4px 4px #00000040",
                      borderRadius: "50",
                      padding: "10px 10px 10px 20px",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: state.isSelected ? "var(--cardinal)" : "black",
                      background: "white",
                    }),
                  }}
                />
              </div>
            )}
          </div>
          {/* carousel  */}
          {isInCinema && (
            <div className="mt-5">
              <Slider {...bookTicket}>
                {cinemaInfo.length != 0 ? (
                  cinemaInfo.map((x) => (
                    <div className="movieInfoBox">
                      <div className="bookingBox">
                        <div className="w-100">
                          <img
                            className="img-fluid movie-ticket"
                            src="/img/ticket2.png"
                          />
                        </div>

                        {x.name == "vox" && (
                          <div className="voxLogo">
                            <img
                              src="/img/voxLogo.png"
                              height="40"
                              width="100"
                            />
                          </div>
                        )}

                        {x.name == "amc" && (
                          <div className="amcLogo">
                            <img
                              src="/img/amcLogo.png"
                              height="95"
                              width="95"
                            />
                          </div>
                        )}

                        {x.name == "muvi" && (
                          <div className="muviLogo">
                            <img
                              src="/img/muviLogo.png"
                              height="90"
                              width="90"
                            />
                          </div>
                        )}

                        <div className="cinema-des">
                          <div className="cinemaLocationName">
                            {x.location.charAt(0).toUpperCase() +
                              x.location.slice(1)}
                          </div>

                          <div className="cityName">
                            <strong>
                              {" "}
                              {x.city.charAt(0).toUpperCase() +
                                x.city.slice(1)}{" "}
                            </strong>
                          </div>
                        </div>

                        <div>
                          <a
                            className="cenima-show-time"
                            href={x.booking_link}
                            target="_blank"
                          >
                            <GiTicket size={40} />
                            Show Times
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="emptyCinemasResult neuton-bold-white-20px">
                    The movie not shown in the selected cinema and city.
                  </div>
                )}
              </Slider>
            </div>
          )}
          {/* carousel  */}
        </Container>
      )}
      {/* review section  */}
      <Container className="py-5">
        {/* reviews section  */}
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="section-title neuton-normal-white-60px5">
              {reviewsText}
            </h3>
            {!isAdmin && !hasReviewed && (
              <div>
                <button className="addReviewBtn" onClick={addReview}>
                  <FiEdit className="reviewIcon" size={30} />{" "}
                  <span className="neuton-normal-white-30px">
                    {" "}
                    {reviewItText}
                  </span>
                </button>
              </div>
            )}
            {!isAdmin && hasReviewed && (
              <div>
                <button className="addReviewBtn" onClick={editReview}>
                  {" "}
                  <FiEdit className="reviewIcon" size={30} />{" "}
                  <span className="neuton-normal-white-30px"> Edit Review</span>
                </button>
              </div>
            )}
          </div>
          {/* reviews  */}
          <div className="mt-5">
            <div className="review-section">
              <Slider {...review}>
                {reviews.length > 0 ? (
                  reviews.map((x) => (
                    <div className="user-review-container p-4">
                      <div className="reviewer-username neuton-bold-white-20px d-flex justify-content-between">
                        <div className="d-flex align-items-center flex-wrap gap-1">
                          <img
                            src={"/img/regUser.png"}
                            width="40"
                            // height="30"
                          />
                          <h3>{x.username}</h3>
                        </div>

                        <div>
                          {hasReviewed && x.review_id == userReviewID ? (
                            <button
                              className="delete-review-icon"
                              onClick={() => {
                                confirmDeleteReview(true, x.review_id);
                              }}
                            >
                              {" "}
                              <RiDeleteBin2Line size={35} />{" "}
                            </button>
                          ) : (
                            <h1></h1>
                          )}

                          {isAdmin && (
                            <button
                              className="delete-review-icon"
                              onClick={() => {
                                confirmDeleteReview(false, x.review_id);
                              }}
                            >
                              {" "}
                              <RiDeleteBin2Line size={35} />{" "}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="user-review roboto-normal-white-20px">
                          {" "}
                          {x.review}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="neuton-bold-white-20px">
                    The movie has no reviews yet.
                  </div>
                )}
              </Slider>
            </div>
          </div>
        </div>
      </Container>
      {/* similar movies section  */}
      <Container className="py-5">
        <div>
          <h3 className="link-title neuton-normal-white-60px5">
            Similar Movies
          </h3>
        </div>
        <div className="mt-5">
          <Slider {...settings}>
            {runCallback(() => {
              const row = [];

              for (var i = 0; i < 21; i++) {
                const id = movieIds[i];
                const url = `/movieInfoPage/${id}`;
                // const poster = Allposters[i];
                const poster = "/img/moviePoster.jpg";
                const title = movieTitles[i];
                const rating = totalRatings[i];
                if (rating == 0) {
                  rating = "No ratings yet.";
                }

                row.push(
                  <div key={i}>
                    {
                      <div className="movie">
                        <a href={url}>
                          <img className="moviePosterCarousel" src={poster} />
                          <div className="p-3">
                            <div className="movieRating">
                              <img
                                className="movieStar"
                                src="/img/star-2@2x.svg"
                              />
                              <div className="movieRating neuton-bold-white-30px">
                                {rating} 5/10
                              </div>
                            </div>
                            <div className="movieName neuton-bold-white-30px">
                              {title} movie name
                            </div>
                          </div>
                        </a>
                      </div>
                    }
                  </div>
                );
              }
              return row;
            })}
          </Slider>
        </div>
      </Container>
      {/* main content  */}

      {/* footer  */}
      <Footer />
    </div>
  );
};

export default MovieInfo;
