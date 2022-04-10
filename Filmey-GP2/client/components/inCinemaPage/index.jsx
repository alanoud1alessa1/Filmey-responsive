import Axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../header";

const inCinemaPage = (props) => {
  const runCallback = (cb) => {
    return cb();
  };
  const {} = props;

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });

  //   const [moviesId, setMoviesId] = useState([]);
  //   const [movieTitles, setmovieTitles] = useState([]);
  //   const [Allposters, setAllposters] = useState([]);
  //   const [totalRatings, settotalRatings] = useState([]);

  //Whats on Variables and constans
  const [whatsOnMovieIds, setWhatsOnMovieIds] = useState([]);
  const [whatsOnMovieTitles, setWhatsOnMovieTitles] = useState([]);
  const [whatsOnMoviePosters, setWhatsOnMoviePosters] = useState([]);
  const [numOfWhatsOnMovie, setNumOfWhatsOnMovie] = useState(0);
  const [whatsOnMovieRatings, setWhatsOnMovieRatings] = useState([]);

  // let {genre} = useParams();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    var numOfTopMovies = 10;

    api.get(`/movies/whatsOnMovies/${numOfTopMovies}`).then((response) => {
      console.log("whatsOnMovies");
      console.log(response.data);

      var whatsOnIdsArray = [...whatsOnMovieIds];
      var whatsOnTitlesArray = [...whatsOnMovieTitles];
      var whatsOnPostersArray = [...whatsOnMoviePosters];
      var whatsOnRatingsArray = [...whatsOnMovieRatings];

      setNumOfWhatsOnMovie(response.data.length);

      for (var i = 0; i < response.data.length; i++) {
        whatsOnIdsArray[i] = response.data[i].movie_id;
        whatsOnTitlesArray[i] = response.data[i].title;
        whatsOnPostersArray[i] = response.data[i].poster;
        whatsOnRatingsArray[i] = response.data[i].total_rating;
      }

      setWhatsOnMovieIds(whatsOnIdsArray);
      setWhatsOnMovieTitles(whatsOnTitlesArray);
      setWhatsOnMoviePosters(whatsOnPostersArray);
      setWhatsOnMovieRatings(whatsOnRatingsArray);
    });

    // var moviesIdArray = [...moviesId];
    // var movieTitlesArray = [...movieTitles];
    // var postersArray = [...Allposters];
    // var ratingsArray = [...totalRatings];

    //   api.get(`/movies/genresFilter/${genre}/48`).then((response) => {
    //     for (var i = 0; i < response.data.length; i++) {
    //       moviesIdArray[i] = response.data[i].movie_id;
    //       movieTitlesArray[i] = response.data[i].title;
    //       postersArray[i] = response.data[i].poster;
    //       ratingsArray[i] = response.data[i].total_rating;

    //     }

    //     //if finish getting all movies --> then set valuse
    //     if (moviesIdArray.length == response.data.length) {
    //       console.log(movieTitlesArray);
    //       setMoviesId(moviesIdArray);
    //       setmovieTitles(movieTitlesArray);
    //       setAllposters(postersArray);
    //       settotalRatings(ratingsArray);

    //     }
    //  });
  }, []);
  return (
    <div>
      {/* header  */}
      <Header />
      {/* main content  */}
      <Container className="py-5">
        <div>
          <div className="page-title">In Cinema</div>
        </div>
      </Container>
      <Container className="py-5">
        <Row className="g-4 cinema-movies">
          {runCallback(() => {
            const row = [];
            var count = 0;
            for (var i = 0; i < numOfWhatsOnMovie; i++) {
              const id = whatsOnMovieIds[i];
              const url = `/movieInfoPage/${id}`;
              const poster = whatsOnMoviePosters[i];
              const title = whatsOnMovieTitles[i];
              var rating = whatsOnMovieRatings[i];
              if (rating == 0 || rating == null) {
                rating = "No ratings yet.";
              } else {
                rating = whatsOnMovieRatings[i];
              }

              row.push(
                <Col sm={6} md={4} lg={3} key={i}>
                  {
                    <div className="movie">
                      <Link to={url}>
                        <img className="moviePosterCarousel" src={poster} />
                        <div className="p-3">
                          <div className="movieRating">
                            <img
                              className="movieStar"
                              src="/img/star-2@2x.svg"
                            />
                            <h4 className="movieRating neuton-bold-white-30px">
                              {rating}
                            </h4>
                          </div>
                          <h3 className="movieName neuton-bold-white-30px">
                            {title}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  }
                </Col>
              );
            }
            return row;
          })}
        </Row>
      </Container>
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default inCinemaPage;
