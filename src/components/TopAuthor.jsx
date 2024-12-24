// const authors = [
//   {
//     name: "Sarah Johnson",
//     image: "https://i.pravatar.cc/150?img=3",
//     role: "Tech Writer",
//     posts: 45,
//     followers: "12.5K",
//   },
//   {
//     name: "Michael Chen",
//     image: "https://i.pravatar.cc/150?img=4",
//     role: "Travel Blogger",
//     posts: 38,
//     followers: "8.2K",
//   },
//   {
//     name: "Emma Davis",
//     image: "https://i.pravatar.cc/150?img=5",
//     role: "Food Critic",
//     posts: 42,
//     followers: "10.1K",
//   },
// ];

// const TopAuthor = () => (
//   <section className="py-16 bg-gray-50 w-11/12 mx-auto">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Authors</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {authors.map((author) => (
//           <div
//             key={author.name}
//             className="bg-white rounded-lg p-6 text-center shadow-md"
//           >
//             <img
//               src={author.image}
//               alt={author.name}
//               className="w-24 h-24 rounded-full mx-auto mb-4"
//             />
//             <h3 className="text-xl font-semibold text-gray-900 mb-1">
//               {author.name}
//             </h3>
//             <p className="text-blue-600 mb-4">{author.role}</p>
//             <div className="flex justify-center space-x-6 text-gray-600">
//               <span>{author.posts} posts</span>
//               <span>{author.followers} followers</span>
//             </div>
//             <a
//               href={`/author/${author.name.toLowerCase().replace(/ /g, "-")}`}
//               className="mt-4 inline-block text-blue-600 hover:text-blue-800"
//             >
//               View Profile →
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// export default TopAuthor;

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const authors = [
  {
    name: "Sarah Johnson",
    image: "https://i.pravatar.cc/150?img=3",
    role: "Tech Writer",
    posts: 45,
    followers: "12.5K",
  },
  {
    name: "Michael Chen",
    image: "https://i.pravatar.cc/150?img=4",
    role: "Travel Blogger",
    posts: 38,
    followers: "8.2K",
  },
  {
    name: "Emma Davis",
    image: "https://i.pravatar.cc/150?img=5",
    role: "Food Critic",
    posts: 42,
    followers: "10.1K",
  },
];

const challenges = [
  {
    title: "30-Day Writing Challenge",
    description: "Write a short story each day for 30 days.",
  },
  {
    title: "Creative Poetry Sprint",
    description: "Compose 20 unique poems in one week.",
  },
  {
    title: "Blogging Marathon",
    description: "Publish a blog post daily for 15 days.",
  },
];

export default function ContentSections() {
  // Animation controls and refs for Popular Authors
  const authorsControls = useAnimation();
  const authorsRef = useRef(null);
  const isAuthorsInView = useInView(authorsRef, { once: false, amount: 0.3 });

  // Animation controls and refs for Writing Challenges
  const challengesControls = useAnimation();
  const challengesRef = useRef(null);
  const isChallengesInView = useInView(challengesRef, {
    once: false,
    amount: 0.3,
  });

  useEffect(() => {
    if (isAuthorsInView) authorsControls.start("visible");
    else authorsControls.start("hidden");
  }, [isAuthorsInView, authorsControls]);

  useEffect(() => {
    if (isChallengesInView) challengesControls.start("visible");
    else challengesControls.start("hidden");
  }, [isChallengesInView, challengesControls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <div>
      {/* Popular Authors Section */}
      <section className="py-16 bg-gray-50" ref={authorsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-8"
            initial="hidden"
            animate={authorsControls}
            variants={containerVariants}
          >
            Popular Authors
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {authors.map((author, index) => (
              <motion.div
                key={author.name}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
                custom={index}
                initial="hidden"
                animate={authorsControls}
                variants={cardVariants}
                whileHover={{ y: -5 }}
              >
                <motion.img
                  src={author.image}
                  alt={author.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {author.name}
                </h3>
                <p className="text-blue-600 mb-4">{author.role}</p>
                <div className="flex justify-center space-x-6 text-gray-600">
                  <span>{author.posts} posts</span>
                  <span>{author.followers} followers</span>
                </div>
                <motion.a
                  href={`/author/${author.name
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  View Profile →
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
