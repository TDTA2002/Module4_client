import './scss/gallery.scss'
import { useTranslation } from "react-i18next";
export default function Gallery() {
    const { t } = useTranslation();
    return (
        <>
            <div className="gallery">
                <div className="galleryItem">
                    <h1 className="galleryTitle" style={{ fontSize: "30px" }}>{t("BeYourself")}</h1>
                    <img
                        src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/99d933c5-7466-4c45-adb1-e499dbdc55a7/why-not-zer04-digital-poster.jpg"
                        alt=""
                        className="galleryImg"
                    />
                </div>
                <div className="galleryItem">
                    <img
                        src="https://cutewallpaper.org/21/jordan-1-wallpaper/Jordan-1-x-Off-White-Wallpaper-by-Cloudy2001-b6-Free-on-.jpg"
                        alt=""
                        className="galleryImg"
                    />
                    <h1 className="galleryTitle" style={{ fontSize: "30px" }}>{t("img2")}</h1>
                </div>
                <div className="galleryItem">
                    <h1 className="galleryTitle" style={{ fontSize: "30px" }}>{t("img3")}</h1>
                    <img
                        src="https://i.pinimg.com/originals/0b/a5/5c/0ba55c5276d236f237b6d60ad7951d73.jpg"
                        alt=""
                        className="galleryImg"
                    />
                </div>
            </div>


        </>


    )
}
