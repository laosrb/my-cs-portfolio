import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Linkedin, Github, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children, currentPageName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowMenu(window.scrollY < 50);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (e.clientX < 100 && e.clientY < 100) {
        setShowMenu(true);
      } else if (window.scrollY >= 50) {
        setShowMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const navItems = [
    { name: "Home", path: createPageUrl("Home") },
    { name: "Experience", path: createPageUrl("Experience") },
    { name: "Resume", path: createPageUrl("Resume") },
    { name: "About Me", path: createPageUrl("AboutMe") }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hamburger Menu Button */}
      <AnimatePresence>
        {(showMenu || isMenuOpen) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="fixed top-6 left-6 z-50 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-40 flex flex-col"
            >
              <div className="p-8 pt-24">
                <h2 className="text-2xl font-bold mb-8 text-gray-900">Navigation</h2>
                <nav className="space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-lg py-3 px-4 rounded-lg transition-all ${
                        location.pathname === item.path
                          ? "bg-gray-900 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center gap-8">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:your.email@example.com"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </footer>
    </div>
  );
}