import { FaShippingFast, FaRegPaperPlane } from "react-icons/fa";
import './scss/services.scss'
import { BsFillBoxSeamFill, BsFillGiftFill } from "react-icons/bs";

export default function Services() {

    return (
        <div className="features">
            <div className="feature">
                <FaShippingFast className="featureIcon" />
                <span className="featureTitle">FREE SHIPPING</span>
                <span className="featureDesc">Free worldwide shipping on all orders.</span>
            </div>
            <div className="feature">
                <BsFillBoxSeamFill className="featureIcon" />
                <span className="featureTitle">30 DAYS RETURN</span>
                <span className="featureDesc">
                    No question return and easy refund in 14 days.
                </span>
            </div>
            <div className="feature">
                <BsFillGiftFill className="featureIcon" />
                <span className="featureTitle">GIFT CARDS</span>
                <span className="featureDesc">
                    Buy gift cards and use coupon codes easily.
                </span>
            </div>
            <div className="feature">
                <FaRegPaperPlane className="featureIcon" />
                <span className="featureTitle">CONTACT US!</span>
                <span className="featureDesc">
                    Keep in touch via email and support system.
                </span>
            </div>
        </div>


    )
}
