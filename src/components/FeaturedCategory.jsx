import React from "react";

const categories = [
  { name: "Technology", icon: "💻", count: 125, color: "bg-blue-100" },
  { name: "Lifestyle", icon: "🌟", count: 98, color: "bg-green-100" },
  { name: "Travel", icon: "✈️", count: 84, color: "bg-yellow-100" },
  { name: "Food", icon: "🍳", count: 76, color: "bg-red-100" },
  { name: "Health", icon: "🏥", count: 92, color: "bg-purple-100" },
  { name: "Finance", icon: "💰", count: 67, color: "bg-green-100" },
];

// Duplicate categories for seamless loop
const allCategories = [...categories, ...categories];

const FeaturedCategory = () => {
  return (
    <section className="py-16 bg-white overflow-hidden w-11/12 mx-auto ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Categories
        </h2>
        <div className="marquee-container">
          <div className="marquee">
            {allCategories.map((category, index) => (
              <a
                key={index}
                href={`/category/${category.name.toLowerCase()}`}
                className={`${category.color} rounded-lg p-6 text-center hover:shadow-md transition group min-w-[250px] mx-4`}
              >
                <span className="text-4xl mb-4 block">{category.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  {category.name}
                </h3>
                <p className="text-gray-600">{category.count} posts</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .marquee-container {
            width: 100%;
            overflow: hidden;
            position: relative;
            mask-image: linear-gradient(
              to right,
              transparent,
              black 10%,
              black 90%,
              transparent
            );
            -webkit-mask-image: linear-gradient(
              to right,
              transparent,
              black 10%,
              black 90%,
              transparent
            );
          }

          .marquee {
            display: flex;
            width: max-content;
            animation: scroll 40s linear infinite;
          }

          .marquee:hover {
            animation-play-state: paused;
          }

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </section>
  );
};

export default FeaturedCategory;
