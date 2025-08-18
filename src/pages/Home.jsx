import herobg from "@/assets/images/hero-bg1.jpg";
import SearchBox from "@/components/home/searchBox";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col items-center">
      <div
        className="w-full flex flex-col items-center gap-4 text-center pt-20 rounded-lg shadow-lg text-white"
        style={{
          background: `url(${herobg}) no-repeat center center`,
          backgroundSize: "cover",
          height: "400px",
        }}
      >
        <h1 className="text-5xl font-bold">Discover your travel destination</h1>
        <p className="text-lg">Pack your bags and let your journey begin!</p>
        <div className="flex flex-col items-center gap-2 mt-6 bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-md w-[600px]">
          {/* <p className="text-md text-black/70">Find you destination here</p> */}
          <SearchBox />
        </div>
      </div>
    </div>
  );
};

export default Home;
