import Axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../header";
import "./comingSoonPage.css";

const ComingSoonPage = (props) => {
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

  //Coming Soon Variables and constans
  const [comingSoonMovieIds, setComingSoonMovieIds] = useState([]);
  const [comingSoonMovieTitles, setComingSoonMovieTitles] = useState([]);
  const [comingSoonMoviePosters, setComingSoonMoviePosters] = useState([]);
  const [numOfComingSoonMovie, setNumOfComingSoonMovie] = useState(0);
  const [comingSoonMovieRatings, setComingSoonMovieRatings] = useState([]);

  // let {genre} = useParams();
  React.useEffect(() => {
    window.scrollTo(0, 0);

    var numOfTopMovies = 10;

    //Get coming soon
    api.get(`/movies/comingSoonMovies/${numOfTopMovies}`).then((response) => {
      var comingSoonIdsArray = [...comingSoonMovieIds];
      var comingSoonTitlesArray = [...comingSoonMovieTitles];
      var comingSoonPostersArray = [...comingSoonMoviePosters];
      var comingSoonRatingsArray = [...comingSoonMovieRatings];
      setNumOfComingSoonMovie(response.data.movies.length);

      for (var i = 0; i < response.data.movies.length; i++) {
        comingSoonIdsArray[i] = response.data.movies[i].movie_id;
        comingSoonTitlesArray[i] = response.data.movies[i].title;
        comingSoonPostersArray[i] = response.data.movies[i].poster;
        console.log(response.data.movies[i].total_rating);
        comingSoonRatingsArray[i] = response.data.movies[i].total_rating;
      }

      setComingSoonMovieIds(comingSoonIdsArray);
      setComingSoonMovieTitles(comingSoonTitlesArray);
      setComingSoonMoviePosters(comingSoonPostersArray);
      setComingSoonMovieRatings(comingSoonRatingsArray);
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
          <div className="page-title">Coming Soon to Cinemas</div>
        </div>
      </Container>
      <Container className="py-5">
        <Row className="g-4 cinema-movies">
          {runCallback(() => {
            const row = [];
            var count = 0;
            for (var i = 0; i < numOfComingSoonMovie; i++) {
              const id = comingSoonMovieIds[i];
              const url = `/movieInfoPage/${id}`;
              const poster = comingSoonMoviePosters[i];
              const title = comingSoonMovieTitles[i];
              var rating = comingSoonMovieRatings[i];
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

export default ComingSoonPage;
