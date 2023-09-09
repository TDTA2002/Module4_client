import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './scss/multiCarousel.scss';
import Services from "./Services";
import Gallery from "./Gallery";
import Banner from "./Banner";

export default function New_product() {
    // const responsive = {
    //     desktop: {
    //         breakpoint: { max: 3000, min: 1024 },
    //         items: 3,
    //         slidesToSlide: 3
    //     },
    //     tablet: {
    //         breakpoint: { max: 1024, min: 464 },
    //         items: 2,
    //         slidesToSlide: 2
    //     },
    //     mobile: {
    //         breakpoint: { max: 464, min: 0 },
    //         items: 1,
    //         slidesToSlide: 1
    //     }
    // };

    return (
        <>
        <Banner/>
            <div className='multicarousel-container'>
                <div className="list_new_title">
                    <h2>Our <span style={{ color: "rgb(255 100 82)" }}>Popular</span> Products
                    </h2>
                    Experience top-notch quality and style with our sought-after selections. Discover a world of comfort, design, and value
                </div>

                <Carousel
                    autoPlay={true}
                    // autoPlaySpeed={1000}
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={1500}
                    centerMode={false}
                    className="list_new_product"
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 5,
                            partialVisibilityGutter: 50
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 2,
                            partialVisibilityGutter: 30
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzL-gRXRwYKvbwHdX3s2iEh7J-6KoGFtu6A&usqp=CAU" alt="" />
                        <p>Product1</p>
                    </div>
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzL-gRXRwYKvbwHdX3s2iEh7J-6KoGFtu6A&usqp=CAU" alt="" />
                        <p>Product2</p>
                    </div>
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzL-gRXRwYKvbwHdX3s2iEh7J-6KoGFtu6A&usqp=CAU" alt="" />
                        <p>Product3</p>
                    </div>
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzL-gRXRwYKvbwHdX3s2iEh7J-6KoGFtu6A&usqp=CAU" alt="" />
                        <p>Product4</p>
                    </div>
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzL-gRXRwYKvbwHdX3s2iEh7J-6KoGFtu6A&usqp=CAU" alt="" />
                        <p>Product5</p>
                    </div>
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzL-gRXRwYKvbwHdX3s2iEh7J-6KoGFtu6A&usqp=CAU" alt="" />
                        <p>Product6</p>
                    </div>
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzL-gRXRwYKvbwHdX3s2iEh7J-6KoGFtu6A&usqp=CAU" alt="" />
                        <p>Product7</p>
                    </div>
                </Carousel>
            </div>
            <Services />
            <Gallery/>
            
        </>

    )
}