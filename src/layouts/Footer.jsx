import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import { motion as m } from "motion/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("Thanks for subscribing! Welcome to Travello 🎉");
    setEmail("");
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Favorites", href: "/favorites" },
  ];

  const supportLinks = [
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  return (
    <footer className="border-t mt-6">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-3xl font-bold">Travello</h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                Your trusted companion for discovering the world. Making travel
                planning effortless, inspiring, and accessible for everyone.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">
                    123 Travel Street, Adventure City
                  </span>
                </div>
                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">hello@travello.com</span>
                </div>
              </div>
            </m.div>
          </div>

          {/* Quick Links */}
          <div>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          </div>

          {/* Support */}
          <div>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </m.div>
          </div>

          {/* Newsletter */}
          <div>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm leading-relaxed">
                Subscribe to our newsletter for travel tips, destination guides,
                and exclusive deals.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                  />
                  <Button
                    type="submit"
                    className="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="text-sm font-medium mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="p-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition-colors duration-200 group"
                    >
                      <social.icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </m.div>
          </div>
        </div>

        {/* Bottom */}
        <m.div
          className="border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            © 2025 Travello. All rights reserved. Made with ❤️ for travelers
            worldwide.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
            >
              Cookies
            </a>
          </div>
        </m.div>
      </div>
    </footer>
  );
};

export default Footer;
