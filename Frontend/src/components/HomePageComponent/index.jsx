import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom } from "react-slideshow-image";
import "./style.css";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const images = [
  "../../../public/pruebas/icono1.svg",
  "../../../public/pruebas/icono2.svg",
  "../../../public/pruebas/icono3.svg",
  "../../../public/pruebas/icono4.svg",
  "../../../public/pruebas/icono5.svg",
  "../../../public/pruebas/icono6.svg",
  "../../../public/pruebas/icono7.svg",
  "../../../public/pruebas/icono8.svg",
  "../../../public/pruebas/icono9.svg",
  "../../../public/pruebas/icono10.svg",
  "../../../public/pruebas/icono11.svg",
  "../../../public/pruebas/icono12.svg",
];

const arrow = "../../../public/icons/arrow-narrow-right.png";

function HomePageComponent() {
  const { isAuthenticated } = useAuth();
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "650px",
  };
  return (
    <main className="home-component-main">
      <div className="home-component">
        <h2>SkillVerse</h2>
        <div id="main-div">
          Conectamos a personas con profesionales talentosos de todo el mundo.
          <Link to="/services">
            <span id="div-container">
              Descubre más <img src={arrow} width={20} />
            </span>
          </Link>
        </div>
        <p></p>

        <div className="slide-container">
          {/* Si queremos que la transición sea con zoomout */}
          {/* <Zoom scale={0.4}></Zoom> */}

          {/* Si queremos que la transición sea fadeout */}
          <Fade arrows="" transitionDuration={1000} duration={2000}>
            {images.map((image, index) => (
              <div key={index} style={{ ...divStyle }}>
                <img style={{ width: "100%" }} src={image} />
              </div>
            ))}
          </Fade>
        </div>
      </div>
    </main>
  );
}

export default HomePageComponent;
