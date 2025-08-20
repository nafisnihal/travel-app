import herobg from "@/assets/images/hero-bg.webp";
import BookingForm from "@/components/home/BookingForm";
import GlobeSection from "@/components/home/GlobeSection";
import SearchBox from "@/components/home/SearchBox";
import TrendingDestinations from "@/components/home/TrendingDestinations";
import { motion as m } from "motion/react";
import { useEffect, useState } from "react";

const Home = () => {
  const [selectedDstn, setSelectedDst] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isRestoringData, setIsRestoringData] = useState(true);

  const FORM_STORAGE_KEY = "travel-booking-form-data";

  // Check for saved form data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
      try {
        const { selectedDstn: savedDestination } = JSON.parse(savedData);
        if (savedDestination) {
          setSelectedDst(savedDestination);
        }
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }
    // delay to ensure everything is mounted
    setTimeout(() => setIsRestoringData(false), 200);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div
        className="w-full flex flex-col items-center justify-center gap-4 text-center py-8 px-4 rounded-lg text-white"
        style={{
          background: `url(${herobg}) no-repeat center center`,
          backgroundSize: "cover",
          minHeight: selectedDstn ? "auto" : "400px",
        }}
      >
        <m.div
          className="flex flex-col items-center gap-4"
          animate={{
            scale: selectedDstn ? 0.95 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <m.h1
            className="text-3xl md:text-5xl font-bold"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            Discover your travel destination
          </m.h1>
          <m.p
            className=" md:text-lg"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            Pack your bags and let your journey begin!
          </m.p>
          <m.div
            className="flex flex-col items-center gap-2 mt-6 bg-black/10 backdrop-blur-md p-4 rounded-lg shadow-md w-full md:w-[600px]"
            initial={{ y: 60, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          >
            <SearchBox
              selectedDstn={selectedDstn}
              setSelectedDst={setSelectedDst}
              submitted={submitted}
            />
          </m.div>
        </m.div>
        {!isRestoringData && (
          <BookingForm
            selectedDstn={selectedDstn}
            submitted={submitted}
            setSubmitted={setSubmitted}
          />
        )}
      </div>
      <TrendingDestinations />
      <GlobeSection />
    </div>
  );
};

export default Home;
