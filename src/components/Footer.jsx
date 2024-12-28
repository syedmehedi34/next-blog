import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-[#243642] text-base-content p-10 *:text-white">
      <aside>
        <div>
          <p className="text-4xl font-bold mb-3">
            Next <span className="text-red-700">Blog</span>
          </p>
        </div>
        <p>
          Next Blog is a next generation blogging website
          <br />
          Providing reliable blogs and news since 2024
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Blogs</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Posts</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Collaborate</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
