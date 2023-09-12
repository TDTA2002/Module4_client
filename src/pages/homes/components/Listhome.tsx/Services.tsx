import { FaShippingFast, FaRegPaperPlane } from "react-icons/fa";
import './scss/services.scss'
import { BsFillBoxSeamFill, BsFillGiftFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
export default function Services() {
    const { t } = useTranslation();

    return (
        <div className="features">
            <div className="feature">
                <FaShippingFast className="featureIcon" />
                <span className="featureTitle">{t("free")}</span>
                <span className="featureDesc">{t("desc")}</span>
            </div>
            <div className="feature">
                <BsFillBoxSeamFill className="featureIcon" />
                <span className="featureTitle">{t("t30")}</span>
                <span className="featureDesc">
                    {t("desc1")}
                </span>
            </div>
            <div className="feature">
                <BsFillGiftFill className="featureIcon" />
                <span className="featureTitle">{t("title1")}</span>
                <span className="featureDesc">
                   {t("desc2")}
                </span>
            </div>
            <div className="feature">
                <FaRegPaperPlane className="featureIcon" />
                <span className="featureTitle">{t("title2")}</span>
                <span className="featureDesc">
                    {t("desc3")}
                </span>
            </div>
        </div>


    )
}
