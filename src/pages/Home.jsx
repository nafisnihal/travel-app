import herobg from "@/assets/images/hero-bg.webp";
import SearchBox from "@/components/home/searchBox";
import { motion as m } from "motion/react";
import { useState } from "react";

const Home = () => {
  const [selectedDstn, setSelectedDst] = useState("");
  return (
    <div className="flex flex-col items-center">
      <m.div
        className="w-full flex flex-col items-center gap-4 text-center pt-16 rounded-lg shadow-lg text-white"
        style={{
          background: `url(${herobg}) no-repeat center center`,
          backgroundSize: "cover",
          height: "400px",
        }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <m.h1
          className="text-5xl font-bold"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          Discover your travel destination
        </m.h1>
        <m.p
          className="text-lg"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          Pack your bags and let your journey begin!
        </m.p>
        <m.div
          className="flex flex-col items-center gap-2 mt-6 bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-md w-[600px]"
          initial={{ y: 60, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
        >
          <SearchBox
            selectedDstn={selectedDstn}
            setSelectedDst={setSelectedDst}
          />
        </m.div>
      </m.div>
    </div>
  );
};

export default Home;
