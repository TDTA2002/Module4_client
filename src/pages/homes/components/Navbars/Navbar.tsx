import './navbar.scss'; // Import stylesheet if needed
import React, { useEffect } from 'react';
import { gsap, Expo } from 'gsap';
import Runner from '../../../../public/imgs/Runner.png'
const App = () => {
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

        gsap.from(".cart", 2, {
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

    }, []);
    return (
        <div className="wrapper">
            <div className="pattern"></div>

            <div className="nav">
                <div className="logo"><img src="https://img.etimg.com/thumb/msid-59738997,width-480,height-360,imgsize-21421,resizemode-75/nike.jpg" alt="" /></div>
                <div className="menu">
                    <ul>
                        <li>Home</li>
                        <li>Products</li>
                        <li>Forum</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="cart"></div>
            </div>

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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nostrum itaque sequi similique, eius maxime porro tenetur magnam in officiis velit quisquam aspernatur voluptatum ab excepturi commodi suscipit id non quod dolores ad consequatur corporis nisi. Aperiam neque recusandae libero.
                </p>

                <button>Shop Now</button>
            </div>

            <div className="media">
                <ul>

                </ul>
            </div>
        </div>
    );
};

export default App;
