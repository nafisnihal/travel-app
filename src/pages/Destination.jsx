import VideoCard from "@/components/destination/VideoCard";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/destinations";
import { ArrowLeft, Calendar, Heart, MapPin, Users } from "lucide-react";
import { motion as m } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router";

const FAVORITES_STORAGE_KEY = "travel-app-favorites";

const Destination = () => {
  const { slug } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the destination by matching the slug
  const destination = destinations.find((dest) => dest.value === slug);

  // Load favorites
  const getFavorites = useCallback(() => {
    try {
      const favorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error("Error loading favorites:", error);
      return [];
    }
  }, []);

  // Save favorites
  const saveFavorites = useCallback((favorites) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, []);

  // Check destination is in favorites
  useEffect(() => {
    if (destination) {
      const favorites = getFavorites();
      const isDestinationFavorite = favorites.some(
        (fav) => fav.id === destination.id
      );
      setIsFavorite(isDestinationFavorite);
    }
  }, [destination, getFavorites]);

  // Toggle favorite
  const toggleFavorite = useCallback(() => {
    if (!destination) return;

    const favorites = getFavorites();
    const isCurrentlyFavorite = favorites.some(
      (fav) => fav.id === destination.id
    );

    let updatedFavorites;
    let toastMessage;

    if (isCurrentlyFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter((fav) => fav.id !== destination.id);
      toastMessage = `${destination.label} removed from favorites`;
      setIsFavorite(false);
    } else {
      // Add to favorites
      updatedFavorites = [
        ...favorites,
        {
          id: destination.id,
          value: destination.value,
          label: destination.label,
          image: destination.image,
          addedAt: new Date().toISOString(),
        },
      ];
      toastMessage = `${destination.label} added to favorites`;
      setIsFavorite(true);
    }

    saveFavorites(updatedFavorites);
    toast.success(toastMessage);
  }, [destination, getFavorites, saveFavorites]);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
          <p className="mb-6">
            The destination you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button className="">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative md:h-[400px] py-10 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
          style={{
            backgroundImage: `url(${destination.image})`,
          }}
        />
        <div className="absolute inset-0 bg-black/40 rounded-lg" />
        <Button
          variant="ghost"
          className="p-2 absolute top-2 right-2 z-10 hover:bg-transparent"
          onClick={toggleFavorite}
        >
          <Heart
            className={`h-8 w-8 transition-colors duration-200 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-white hover:text-red-500"
            }`}
          />
        </Button>
        <div className="relative z-10 flex items-center justify-center h-full">
          <m.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              {destination.label}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Discover the beauty and wonder of this amazing destination
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <MapPin className="mr-2 h-5 w-5" />
                <span>Explore Location</span>
              </div>
              <div className="flex items-center text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <Calendar className="mr-2 h-5 w-5" />
                <span>Plan Your Trip</span>
              </div>
              <div className="flex items-center text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <Users className="mr-2 h-5 w-5" />
                <span>Join Community</span>
              </div>
            </div>
          </m.div>
        </div>
      </div>

      <div className="relative z-10 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <m.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">
              About {destination.label}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {destination.label} is one of the world's most sought-after
                  travel destinations, offering breathtaking landscapes, rich
                  culture, and unforgettable experiences that will create
                  memories to last a lifetime.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Whether you're seeking adventure, relaxation, or cultural
                  immersion,
                  {destination.label} has something special to offer every type
                  of traveler.
                </p>
                <Link to="/">
                  <Button className="">Book Another Trip</Button>
                </Link>
              </div>
              <div className="relative order-1 md:order-2">
                <VideoCard
                  thumbnailSrc={destination?.image}
                  thumbnailAlt={destination.label}
                  videoSrc={destination?.videoSrc}
                />
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
