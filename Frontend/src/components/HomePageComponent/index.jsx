import image1 from "../../../public/pruebas/foto_1.jpg";
import image2 from "../../../public/pruebas/foto_2.jpg";
import image3 from "../../../public/pruebas/foto_3.jpg";
import image4 from "../../../public/pruebas/foto_4.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function HomePageComponent() {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 900 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 900, min: 0 },
      items: 1,
    },
  };

  <Carousel
    swipeable={true}
    draggable={false}
    showDots={false}
    responsive={responsive}
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={5000}
    keyBoardControl={true}
    customTransition="all .5"
    transitionDuration={500}
    containerClass="carousel-container"
    removeArrowOnDeviceType={["tablet", "mobile"]}
    // deviceType={this.props.deviceType}
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
    className="Carrusel"
  >
    <div>
      <img src={image1} height={300} width={300} />
    </div>
    <div>
      <img src={image2} height={300} width={300} />
    </div>
    <div>
      <img src={image3} height={300} width={300} />
    </div>
    <div>
      <img src={image4} height={300} width={300} />
    </div>
  </Carousel>;
}

export default HomePageComponent;
