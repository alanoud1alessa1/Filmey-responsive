import React from "react";
import { Link } from "react-router-dom";
import "./genreTypePage.css";
import Header from "../header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import Footer from "../Footer";
import { Col, Container, Row } from "react-bootstrap";

const genreTypePage = (props) => {
  const runCallback = (cb) => {
    return cb();
  };
  const {} = props;

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });

  const [moviesId, setMoviesId] = useState([]);
  const [movieTitles, setmovieTitles] = useState([]);
  const [Allposters, setAllposters] = useState([]);
  const [totalRatings, settotalRatings] = useState([]);

  let { genre } = useParams();
  React.useEffect(() => {
    window.scrollTo(0, 0);

    var moviesIdArray = [...moviesId];
    var movieTitlesArray = [...movieTitles];
    var postersArray = [...Allposters];
    var ratingsArray = [...totalRatings];

    api.get(`/movies/genresFilter/${genre}/48`).then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        moviesIdArray[i] = response.data[i].movie_id;
        movieTitlesArray[i] = response.data[i].title;
        postersArray[i] = response.data[i].poster;
        ratingsArray[i] = response.data[i].total_rating;
      }

      //if finish getting all movies --> then set valuse
      if (moviesIdArray.length == response.data.length) {
        console.log(movieTitlesArray);
        setMoviesId(moviesIdArray);
        setmovieTitles(movieTitlesArray);
        setAllposters(postersArray);
        settotalRatings(ratingsArray);
      }
    });
  }, []);
  return (
    <div>
      {/* header  */}
      <Header />
      {/* main content  */}
      <Container className="pb-5">
        <div>
          <div className="page-title">{genre}</div>
        </div>
      </Container>
      <Container className="py-5">
        <Row className="g-4 cinema-movies">
          {runCallback(() => {
            const row = [];
            var count = 0;
            for (var i = 0; i < moviesId.length; i++) {
              const id = moviesId[count];
              const url = `/movieInfoPage/${id}`;
              const poster = Allposters[count];
              const title = movieTitles[count];
              const rating = totalRatings[count++];
              if (rating == "0.0") {
                rating = "No ratings yet.";
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
                            <h4 className="movieRating neuton-bold-white-20px">
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

export default genreTypePage;
