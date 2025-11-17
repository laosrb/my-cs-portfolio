import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AboutSection from "@/components/about/AboutSection";
import BlogSection from "@/components/about/BlogSection";
import BucketListSection from "@/components/about/BucketListSection";
import ContactSection from "@/components/about/ContactSection";

export default function AboutMe() {
  const [expandedSection, setExpandedSection] = useState("about");

  const sections = [
    { id: "about", title: "About Me", component: AboutSection },
    { id: "blog", title: "Blog", component: BlogSection },
    { id: "bucket", title: "Bucket List", component: BucketListSection },
    { id: "contact", title: "Contact Me", component: ContactSection }
  ];

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-4">ryan</h1>
          <p className="text-xl text-gray-600 mb-12">
            Computer Science student, Python instructor, and aspiring full-stack developer 
            passionate about creating meaningful technology solutions.
          </p>

          {/* Collapsible Sections */}
          <div className="space-y-4">
            {sections.map((section) => {
              const SectionComponent = section.component;
              const isExpanded = expandedSection === section.id;

              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    </motion.div>
                  </button>

                  {/* Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8">
                          <SectionComponent />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

