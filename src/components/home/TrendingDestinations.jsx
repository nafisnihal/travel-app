import { destinations } from "@/data/destinations";
import { InfiniteSlider } from "../ui/infiniteSlider";

const TrendingDestinations = () => {
  return (
    <div className="pt-10 pb-5 max-w-6xl mx-auto w-full">
      <InfiniteSlider durationOnHover={200} gap={24} duration={150}>
        {destinations.map((destination) => (
          <img
            key={destination.value}
            src={destination.image}
            alt={destination.label}
            className="aspect-video w-[180px] rounded-[4px]"
          />
        ))}
      </InfiniteSlider>
    </div>
  );
};

export default TrendingDestinations;
