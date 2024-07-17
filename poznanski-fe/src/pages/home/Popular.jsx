/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

const Popular = () => {
  const [devices, setDevices] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("https://poznanski.onrender.com/menu")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");

        // Log the fetched specials
        console.log("Fetched specials:", specials);

        // Check for duplicates
        const uniqueSpecials = specials.filter((item, index, self) =>
          index === self.findIndex((t) => t._id === item._id)
        );

        // Log the unique specials
        console.log("Unique specials:", uniqueSpecials);

        setDevices(uniqueSpecials);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-20 relative">
    <div className="text-left">
      <p className="subtitle">Customer Favorites</p>
      <h2 className="title">Popular devices</h2>
    </div>
    <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
      <button
        onClick={() => slider?.current?.slickPrev()}
        className="btn p-2 rounded-full ml-5"
      >
        <FaAngleLeft className="h-8 w-8 p-1" />
      </button>
      <button
        className="bg-red btn p-2 rounded-full ml-5"
        onClick={() => slider?.current?.slickNext()}
      >
        <FaAngleRight className="h-8 w-8 p-1" />
      </button>
    </div>

      <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
        {devices.map((item) => (
          <Cards item={item} key={item._id} /> // Ensure unique key based on item._id
        ))}
      </Slider>
    </div>
  );
};

export default Popular;
