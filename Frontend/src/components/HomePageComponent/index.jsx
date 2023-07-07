import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom } from "react-slideshow-image";

const images = [
  "../../../public/pruebas/foto_1.jpg",
  "../../../public/pruebas/foto_2.jpg",
  "../../../public/pruebas/foto_3.jpg",
  "../../../public/pruebas/foto_4.png",
];

function HomePageComponent() {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "600px",
  };
  return (
    <>
      <div className="slide-container">
        {/* Si queremos que la transición sea con zoomout */}
        {/* <Zoom scale={0.4}></Zoom> */}

        {/* Si queremos que la transición sea fadeout */}
        <Fade arrows="" transitionDuration={1000} duration={5000}>
          {images.map((each, index) => (
            <div key={index} style={{ ...divStyle }}>
              <img style={{ width: "100%" }} src={each} />
            </div>
          ))}
        </Fade>
      </div>
    </>
  );
}

export default HomePageComponent;
