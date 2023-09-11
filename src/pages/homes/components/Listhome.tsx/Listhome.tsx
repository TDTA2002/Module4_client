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
            <Banner />
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
                        <img style={{ width: "200px" }} src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5615e577-16eb-4e44-8c60-0fc968dd711d/gt-cut-2-mens-basketball-shoes-tmfmFl.png" alt="" />
                        <p>Nike G.T. Cut 2</p>
                    </div>
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8ab04295-402a-433c-a181-2973806a7c1f/gt-cut-2-womens-basketball-shoes-B31flV.png" alt="" />
                        <p>Nike G.T. Cut 1</p>
                    </div>
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5615d881-6725-422a-b97b-82835fa62411/ja-1-wet-cement-basketball-shoes-bCx2W3.png" alt="" />
                        <p>Ja 1 "Wet Cement"</p>
                    </div>
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9e68f2a5-adfe-4098-bb9c-fab78b2bec16/air-jordan-xxxviii-fundamental-basketball-shoes-7qLMW4.png" alt="" />
                        <p>Air Jordan XXXVIII "Fundamental"</p>
                    </div>
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ff0baa29-49d2-4594-91a6-b017864186c2/lebron-nxxt-gen-basketball-shoes-55g4w1.png" alt="" />
                        <p>LeBron 20</p>
                    </div>
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d77526da-7768-47b6-a268-7d6b6ce9fb02/gt-jump-2-mens-basketball-shoes-7Nc1N1.png" alt="" />
                        <p>Nike G.T.Jump 2</p>
                    </div>
                    <div className='product'>
                        <img style={{ width: "200px" }} src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ad357d4a-4616-4320-9317-0447727aba5e/freak-5-basketball-shoes-jZzrx4.png" alt="" />
                        <p>Freak 5 "Loyalty"</p>
                    </div>
                </Carousel>
            </div>
            <Services />
            <Gallery />

        </>

    )
}