import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../header";
import "./cinemasPage.css";

const cinemasPage = (props) => {
  const { logo, footerText1, footerText2 } = props;

  const runCallback = (cb) => {
    return cb();
  };

  return (
    <div>
      {/* header  */}
      <Header />
      {/* main content  */}
      <div className="cinemas-page">
        <Container className="py-5">
          <Row className="g-4">
            <Col md={6} lg={4}>
              <div className="cinema-box">
                <div>
                  <a href="https://www.amctheatres.com/" target="_blank">
                    <img className="cinema-logo" src="/img/amcLogo.png" />
                  </a>
                </div>
                <div className="cinema-description p-2 my-3">
                  <p className="roboto-normal-white-20px">
                    <strong> AMC Cinemas </strong> is dedicated to innovating
                    the way you see movies. Don’t just visit a cinema;
                    experience the AMC difference of premium formats that bring
                    you superior acoustics, richer imagery, and a choice between
                    Real D® 3D, Dolby Cinema®, and IMAX® technologies. Taste our
                    special menu of elevated cinema favorites and enjoy bolder
                    flavors, wider variety, and superior quality movie snacks.
                    Reserve your seats when you purchase tickets online and on
                    our app and relax into the spacious comforts of our luxe
                    recliners. Come and enjoy the very best of cutting-edge
                    entertainment when you choose AMC Cinemas.
                  </p>
                </div>
                <div>
                  <Link className="read-more-btn" to="/cinemaInfoPage/amc">
                    Read more..
                  </Link>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="cinema-box">
                <div>
                  <a href="https://www.muvicinemas.com/en" target="_blank">
                    <img className="cinema-logo" src="/img/muviLogo.png" />
                  </a>
                </div>
                <div className="cinema-description p-2 my-3">
                  <p className="roboto-normal-white-20px">
                    <strong> uvi Cinemas </strong>is the first home-grown cinema
                    brand and the market leader in terms of screen count in the
                    Kingdom of Saudi Arabia. Established in 2019 with
                    headquarters in Riyadh, it is owned and operated by muvi
                    Cinemas Co. muvi continues its expansion plan in the
                    upcoming years across the kingdom offering state-of-the-art
                    technology, diverse and immersive experiences combined with
                    unlimited options from our delicious menu to give moviegoers
                    complete and exceptional cinema experience.
                  </p>
                </div>
                <div>
                  <Link className="read-more-btn" to="/cinemaInfoPage/muvi">
                    Read more..
                  </Link>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="cinema-box">
                <div>
                  <a href="https://ksa.voxcinemas.com/" target="_blank">
                    <img className="cinema-logo-vox" src="/img/voxwhite.png" />
                  </a>
                </div>
                <div className="cinema-description p-2 my-3">
                  <p className="roboto-normal-white-20px">
                    <strong> VOX Cinemas </strong> the MENA region’s largest
                    cinema operator, is honoured to be awarded one of the first
                    licenses to operate cinemas in Saudi Arabia. Its brand-new
                    cinema, which will be the first multiplex in Saudi Arabia
                    will open at Riyadh Park Mall. VOX Cinemas will start
                    delivering on an ambitious plan to bring its world-class
                    cinema entertainment portfolio to Saudi Arabia and support
                    the growth of audio-visual and creative talent across the
                    Kingdom. VOX Cinemas parent company Majid Al Futtaim, the
                    leading shopping mall, communities, retail and leisure
                    pioneer across the Middle East...
                  </p>
                </div>
                <div>
                  <Link className="read-more-btn" to="/cinemaInfoPage/vox">
                    Read more..
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* main content  */}
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default cinemasPage;
