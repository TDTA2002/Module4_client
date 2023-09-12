import React, { useEffect } from 'react'
import Runner from '../../../../public/imgs/Runner.png'
import { gsap, Expo } from 'gsap';
import '../Navbars/navbar.scss'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
export default function Banner() {
    const { t } = useTranslation();
    useEffect(() => {
        gsap.to(".title-1", 2, {
            x: 30,
            opacity: 1,
            ease: Expo.easeInOut
        });

        gsap.to(".title-2", 2, {
            delay: 0.2,
            x: -80,
            opacity: 1,
            ease: Expo.easeInOut
        });

        gsap.from(".runner", 2, {
            delay: 1.6,
            x: -80,
            opacity: 0,
            ease: Expo.easeInOut
        });

        gsap.from(".box-1", 4, {
            delay: 1,
            rotation: 200,
            transformOrigin: "50% 50%",
            opacity: 0,
            x: -180,
            ease: Expo.easeInOut
        });

        gsap.from(".box-2", 4, {
            delay: 1.2,
            rotation: 90,
            transformOrigin: "50% 50%",
            opacity: 0,
            x: -180,
            ease: Expo.easeInOut
        });

        gsap.from(".box-3", 4, {
            delay: 1,
            rotation: 180,
            transformOrigin: "50% 50%",
            opacity: 0,
            x: -180,
            ease: Expo.easeInOut
        });

        gsap.from(".pattern", 2, {
            delay: 0.8,
            width: 0,
            opacity: 0,
            ease: Expo.easeInOut
        });

        gsap.from(".logo", 2, {
            delay: 1.6,
            y: 20,
            opacity: 0,
            ease: Expo.easeInOut
        });

        gsap.from(".menu ul li", {
            duration: 2,
            delay: 1.6,
            y: 20,
            opacity: 0,
            ease: Expo.easeInOut,
            stagger: 0.1,
        });

        gsap.from(".right_content", 2, {
            delay: 1.7,
            y: 20,
            opacity: 0,
            ease: Expo.easeInOut
        });

        gsap.from(".media ul li", {
            duration: 2,
            delay: 2,
            y: 20,
            opacity: 0,
            ease: Expo.easeInOut,
            stagger: 0.1,
        });

        gsap.from(".content p", 2, {
            delay: 2.4,
            y: 20,
            opacity: 0,
            ease: Expo.easeInOut
        });

        gsap.from(".content button", 2, {
            delay: 2.6,
            y: 20,
            opacity: 0,
            ease: Expo.easeInOut
        });
        gsap.from(".feature_item", {
            duration: 1,
            opacity: 0,
            y: 20,
            ease: "expo.out",
            stagger: 0.2,
        });

        gsap.from(".brand_name", {
            duration: 1,
            opacity: 0,
            x: -30,
            ease: "expo.out",
        });
        gsap.from(".feature", {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "expo.out",
        });
        gsap.from(".link", {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "expo.out",
        });
    }, []);
    return (
        <>
            <div className="pattern"></div>
            <div className="box-1 box"></div>
            <div className="box-2 box"></div>
            <div className="box-3 box"></div>

            <div className="title-2">Everything</div>

            <div className="runner">
                <img src={Runner} alt="" />
            </div>

            <div className="title-1">Fast</div>

            <div className="content">
                <p>
                    {t("shopNow")}
                </p>

                <button ><Link to="products">  {t("Mua")}</Link></button>
            </div>

            <div className="media">
                <ul>

                </ul>
            </div>
        </>
    )
}
