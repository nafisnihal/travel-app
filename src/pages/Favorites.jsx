import { Button } from "@/components/ui/button";
import { Heart, MapPin, Trash2 } from "lucide-react";
import { motion as m } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const FAVORITES_STORAGE_KEY = "travel-app-favorites";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

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

  // Load favorites
  useEffect(() => {
    const loadedFavorites = getFavorites();
    setFavorites(loadedFavorites);
  }, [getFavorites]);

  // Remove from favorites
  const removeFavorite = useCallback(
    (destinationId, destinationLabel) => {
      const updatedFavorites = favorites.filter(
        (fav) => fav.id !== destinationId
      );
      setFavorites(updatedFavorites);
      saveFavorites(updatedFavorites);
      toast.success(`${destinationLabel} removed from favorites`);
    },
    [favorites, saveFavorites]
  );

  // Clear all
  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
    saveFavorites([]);
    toast.success("All favorites cleared");
  }, [saveFavorites]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                My Favorite Destinations
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {favorites.length} destination
                {favorites.length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>
          {favorites.length > 0 && (
            <Button
              onClick={clearAllFavorites}
              className="flex items-center gap-2 hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {favorites.length === 0 ? (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Heart className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No favorites yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Start exploring destinations and save your favorites by clicking
              the heart icon
            </p>
            <Link to="/">
              <Button className="">
                <MapPin className="mr-1 h-4 w-4" />
                Explore Destinations
              </Button>
            </Link>
          </m.div>
        ) : (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {favorites.map((destination, index) => (
              <m.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.label}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {destination.label}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Added on{" "}
                    {new Date(destination.addedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  <div className="flex gap-2">
                    <Link
                      to={`/destination/${destination.value}`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-black text-white hover:bg-black">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      onClick={() =>
                        removeFavorite(destination.id, destination.label)
                      }
                      className="flex items-center gap-2 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
