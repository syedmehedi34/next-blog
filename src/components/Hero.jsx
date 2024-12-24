import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselData = [
  {
    title: "Transform Your Business",
    description:
      "Empower your team with cutting-edge solutions that drive growth and innovation.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
  },
  {
    title: "Scale With Confidence",
    description:
      "Build and deploy applications that scale with your business needs.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2340",
  },
  {
    title: "Secure By Design",
    description:
      "Enterprise-grade security that protects your data and your customers.",
    image:
      "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80&w=2340",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="h-full transition-transform duration-500 ease-out flex"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${carouselData.length * 100}%`,
        }}
      >
        {carouselData.map((slide, index) => (
          <div
            key={index}
            className="relative w-full h-full flex flex-col md:flex-row items-center justify-center px-4 md:px-16"
          >
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left z-10">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                {slide.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-xl">
                {slide.description}
              </p>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
            </div>
            <div className="w-full md:w-1/2 h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? "bg-indigo-600 w-4" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
