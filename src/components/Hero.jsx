import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="carousel w-full h-[600px] md:h-[550px] dark:bg-gray-800 dark:rounded-3xl">
      {/* slide 1 starts  */}
      <div
        id="slide1"
        className="carousel-item relative w-full flex-col-reverse md:flex-row "
      >
        <div className="px-5 w-full md:w-1/2 h-full flex flex-col justify-center text-center  ">
          <h1 className="text-3xl md:text-4xl font-bold text-black  dark:text-gray-50 ">
            Innovate the future, elevate your experience{" "}
          </h1>
          <p className="text-lg md:text-xl text-black mt-6 mb-2  dark:text-gray-50 ">
            Simplify life and transform the way you connect with the world.{" "}
          </p>
          <div>
            <button className="btn btn-primary w-fit mt-5">
              Read More
              <span className="-rotate-45">
                <FaArrowRight />
              </span>
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 rounded-3xl dark:bg-gray-800">
          <img
            src="https://i.ibb.co.com/JsyVLrS/2.jpg"
            className="w-full h-[300px] md:h-full object-cover max-[768px]:rounded-t-3xl md:rounded-r-3xl"
          />
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      {/* slide 1 ends  */}

      {/* slide 2 starts  */}
      <div
        id="slide2"
        className="carousel-item relative w-full flex-col-reverse md:flex-row"
      >
        <div className="px-5 w-full md:w-1/2 h-full flex flex-col justify-center text-center">
          <h1 className=" text-3xl md:text-4xl font-bold text-black  dark:text-gray-50 ">
            Wander far and wide, discover the unseen
          </h1>
          <p className="text-lg md:text-xl text-black mt-6 mb-2  dark:text-gray-50 ">
            Embark on unforgettable journeys to hidden gems.
          </p>
          <div>
            <button className="btn btn-primary w-fit mt-5">
              Read More
              <span className="-rotate-45">
                <FaArrowRight />
              </span>
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 rounded-3xl">
          <img
            src="https://i.ibb.co.com/ctyPxk1/3.jpg"
            className="w-full h-[300px] md:h-full object-cover max-[768px]:rounded-t-3xl md:rounded-r-3xl"
          />
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      {/* slide 2 ends  */}

      {/* slide 3 starts  */}
      <div
        id="slide3"
        className="carousel-item relative w-full flex-col-reverse md:flex-row"
      >
        <div className="px-5 w-full md:w-1/2 h-full flex flex-col justify-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-black  dark:text-gray-50 ">
            Capture every moment, inspire the world around
          </h1>
          <p className="text-lg md:text-xl text-black mt-6 mb-2  dark:text-gray-50 ">
            Turn everyday moments into captivating stories.
          </p>
          <div>
            <button className="btn btn-primary w-fit mt-5">
              Read More
              <span className="-rotate-45">
                <FaArrowRight />
              </span>
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 rounded-3xl">
          <img
            src="https://i.ibb.co.com/RpXChpL/1.jpg"
            className="w-full h-[300px] md:h-full object-cover max-[768px]:rounded-t-3xl md:rounded-r-3xl"
          />
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      {/* slide 3 ends  */}
    </div>
  );
};

export default Hero;
