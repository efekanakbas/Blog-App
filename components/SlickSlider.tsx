"use client";
import React, { useState } from "react";
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import login1 from "../public/images/login1.svg";
import login2 from "../public/images/login2.svg";
import login3 from "../public/images/login3.svg";
import Image from "next/image";

const dummy = [login1, login2, login3];

interface SlickSliderProps {
  // Define props here
}

const SlickSlider: React.FC<SlickSliderProps> = () => {
  //! States
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const [grabbing, setGrabbing] = useState(false);
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Slider {...settings}>
      {dummy.map((item, i) => (
        <React.Fragment key={i}>
          <figure
            onPointerDown={() => {
              setGrabbing(true);
            }}
            onPointerUp={() => {
              setGrabbing(false);
            }}
            className={` h-screen  relative w-full  cursor-${
              !grabbing ? "grab" : "grabbing"
            }`}
          >
            <div className="absolute z-30 top-6 right-6 flex gap-2">

              <span className={` ${i === 0 ? 'bg-gray-500' : 'bg-gray-300'} p-1 rounded-full`}>
             
              </span>
              <span className={` ${i === 1 ? 'bg-gray-500' : 'bg-gray-300'} p-1 rounded-full`}>

              </span>
              <span className={` ${i === 2 ? 'bg-gray-500' : 'bg-gray-300'} p-1 rounded-full`}>

              </span>
            </div>
            <Image className="object-fill" src={item} alt="login image" fill />
          </figure>
        </React.Fragment>
      ))}
    </Slider>
  );
};

export default SlickSlider;
