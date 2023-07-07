import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom } from "react-slideshow-image";

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

function HomePageComponent() {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "650px",
  };
  return (
    <>
      <div className="slide-container">
        {/* Si queremos que la transición sea con zoomout */}
        {/* <Zoom scale={0.4}></Zoom> */}

        {/* Si queremos que la transición sea fadeout */}
        <Fade arrows="" transitionDuration={1000} duration={1000}>
          {images.map((image, index) => (
            <div key={index} style={{ ...divStyle }}>
              <img style={{ width: "50%" }} src={image} />
            </div>
          ))}
        </Fade>
      </div>
    </>
  );
}

export default HomePageComponent;
