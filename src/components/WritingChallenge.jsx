import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const challenges = [
  {
    title: "30-Day Writing Sprint",
    description:
      "Write 500 words daily for 30 days. Build consistency and improve your craft.",
    participants: "2.5K",
    startDate: "Starts April 1st",
  },
  {
    title: "Poetry Challenge",
    description:
      "Create one poem daily using provided prompts. Explore different poetry styles.",
    participants: "1.8K",
    startDate: "Starts April 15th",
  },
  {
    title: "Flash Fiction Contest",
    description:
      "Write compelling stories in 100 words or less. Push your creativity.",
    participants: "3.2K",
    startDate: "Ongoing",
  },
];

export default function WritingChallenges() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Writing Challenges
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Push your boundaries and grow with our community challenges
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.title}
              className="relative bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              custom={index}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                {challenge.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {challenge.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{challenge.participants} participants</span>
                <span>{challenge.startDate}</span>
              </div>
              <motion.button
                className="mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Challenge
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
