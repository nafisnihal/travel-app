import { Button } from "@/components/ui/button";
import { destinations } from "@/lib/destinations";
import { ArrowLeft, Calendar, Heart, MapPin, Users } from "lucide-react";
import { motion as m } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";

const FAVORITES_STORAGE_KEY = "travel-app-favorites";

const Destination = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the destination by matching the slug with the value field
  const destination = destinations.find((dest) => dest.value === slug);

  // Load favorites from localStorage
  const getFavorites = useCallback(() => {
    try {
      const favorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error("Error loading favorites:", error);
      return [];
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = useCallback((favorites) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, []);

  // Check if current destination is in favorites when component mounts
  useEffect(() => {
    if (destination) {
      const favorites = getFavorites();
      const isDestinationFavorite = favorites.some(
        (fav) => fav.id === destination.id
      );
      setIsFavorite(isDestinationFavorite);
    }
  }, [destination, getFavorites]);

  // Toggle favorite status
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

  // If destination not found, show 404
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
      <div className="flex items-center justify-between pb-4">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
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
      </div>

      <div className="relative md:h-[400px] py-10 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
          style={{
            backgroundImage: `url(${destination.image})`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
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
        <div className="max-w-4xl mx-auto">
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
                <img
                  src={destination.image}
                  alt={destination.label}
                  className="rounded-lg shadow-xl w-full h-80 object-cover"
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
