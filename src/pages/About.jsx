import { Camera, Globe, Heart, MapPin, Star, Users } from "lucide-react";
import { motion as m } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const About = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [setHoveredCard] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "50+", label: "Countries", icon: Globe },
    { number: "1M+", label: "Happy Travelers", icon: Users },
    { number: "5K+", label: "Destinations", icon: MapPin },
    { number: "4.9", label: "Average Rating", icon: Star },
  ];

  const features = [
    {
      icon: MapPin,
      title: "Discover Hidden Gems",
      description:
        "Uncover secret spots and local favorites that only insiders know about.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop&crop=center",
    },
    {
      icon: Camera,
      title: "Capture Memories",
      description:
        "Every journey tells a story. Create lasting memories with our curated experiences.",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop&crop=center",
    },
    {
      icon: Heart,
      title: "Travel with Purpose",
      description:
        "Connect with local communities and travel responsibly for a better world.",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop&crop=center",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Tokyo, Japan",
      text: "Travello helped me discover places I never knew existed. My trip to Iceland was absolutely magical!",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      location: "Bali, Indonesia",
      text: "The personalized recommendations were spot-on. I found hidden beaches that weren't in any guidebook.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Emma Rodriguez",
      location: "Santorini, Greece",
      text: "From planning to booking, everything was seamless. The local experiences were unforgettable!",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const heroImages = [
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&crop=center",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero  */}
      <m.section
        className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-center justify-center rounded-t-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <m.div
              key={index}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: activeSection === index ? 1 : 0,
                scale: activeSection === index ? 1 : 1.1,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/40" />

        <m.div
          className="relative z-10 text-center text-white px-4 max-w-4xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Journey Begins Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover the world with Travello - where every destination tells a
            story
          </p>
          <div className="flex justify-center gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </m.div>
      </m.section>

      {/* Stats */}
      <m.section
        className="py-16 bg-zinc-50 dark:bg-zinc-900/50 rounded-b-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <m.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-zinc-600 dark:text-zinc-400" />
                <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-600 dark:text-zinc-400">
                  {stat.label}
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </m.section>

      {/* Mission */}
      <m.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <m.h2
            className="text-3xl md:text-4xl font-bold mb-8 text-zinc-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Mission
          </m.h2>
          <m.p
            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            At Travello, we believe that travel is more than just visiting
            places—it's about creating connections, understanding cultures, and
            expanding perspectives. Our mission is to make extraordinary travel
            experiences accessible to everyone, while promoting sustainable and
            responsible tourism that benefits both travelers and local
            communities.
          </m.p>
        </div>
      </m.section>

      {/* Features */}
      <m.section
        className="py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <m.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-zinc-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose Travello?
          </m.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <m.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-800/90 p-3 rounded-full">
                      <feature.icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </m.section>

      {/* Testimonials */}
      <m.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <m.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-zinc-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Travelers Say
          </m.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <m.div
                key={index}
                className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </m.section>

      {/* Call to Action */}
      <m.section
        className="py-20 bg-zinc-900 text-white relative overflow-hidden rounded-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <m.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Start Your Adventure?
          </m.h2>
          <m.p
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join millions of travelers who trust Travello for their dream
            vacations
          </m.p>
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/">
              <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg cursor-pointer">
                Explore Destinations
              </button>
            </Link>
          </m.div>
        </div>
      </m.section>
    </div>
  );
};

export default About;
