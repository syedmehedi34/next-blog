import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import styled, { keyframes } from "styled-components";

// Define the blob animation using styled-components keyframes
const blobAnimation = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

// Create a styled div with animation
const Blob = styled.div`
  position: absolute;
  width: 72px;
  height: 72px;
  background-color: rgba(128, 90, 213, 0.3);
  border-radius: 50%;
  animation: ${blobAnimation} 7s infinite;
`;

const Blob2 = styled(Blob)`
  background-color: rgba(255, 165, 0, 0.3);
  animation-delay: 2s;
`;

const Blob3 = styled(Blob)`
  background-color: rgba(255, 20, 147, 0.3);
  animation-delay: 4s;
`;

export default function NewsletterSection() {
  //
  const handleNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // console.log(email);

    if (!email) {
      return toast.error("Please enter a valid email address");
    }
    toast.success(`Subscribed with email: ${email}`, {
      autoClose: 1500,
      position: "top-left",
    });
    e.target.email.value = "";
  };
  //
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>

      {/* Floating shapes */}
      <Blob />
      <Blob2 />
      <Blob3 />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Creative Community
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get exclusive access to writing prompts, expert interviews, and
            weekly inspiration delivered to your inbox.
          </p>

          {/* Newsletter Form */}
          <motion.form
            onSubmit={handleNewsletter}
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/10 backdrop-blur-md text-white placeholder-purple-200 border border-white/20"
                />
              </motion.div>
              <motion.button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
            <p className="mt-4 text-sm text-purple-200">
              Join 50,000+ writers who already subscribed!
            </p>
          </motion.form>

          {/* Features */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-purple-100">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
              </svg>
              <span>Weekly Writing Prompts</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
              </svg>
              <span>Expert Interviews</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
              </svg>
              <span>Writing Resources</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
