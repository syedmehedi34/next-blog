import DonateNow from "../components/DonateNow";
import FeaturedCategory from "../components/FeaturedCategory";
import Hero from "../components/Hero";
import NewsLetter from "../components/NewsLetter";
import RecentBlogs from "../components/RecentBlogs";
import TopAuthor from "../components/TopAuthor";
import WritingChallenge from "../components/WritingChallenge";

const Home = () => {
  return (
    <div>
      <div>
        <div className="w-11/12 mx-auto mt-10 border border-black">
          <Hero />
        </div>

        <div className="">
          <RecentBlogs />
          <FeaturedCategory />
        </div>
        <div>
          <TopAuthor />
        </div>

        <div>{/* <DonateNow /> */}</div>
        <WritingChallenge />
        <NewsLetter></NewsLetter>
      </div>
    </div>
  );
};

export default Home;
