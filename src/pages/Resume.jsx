import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Resume() {
  const resumeUrl = "https://laosrb.github.io/me/resume/Ryan_Bouapheng_Resume(CS).pdf"; // Update with actual resume URL

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-8">Resume</h1>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12 text-left">
            <p className="text-lg text-gray-700 leading-relaxed">
              As a Computer Science student at Georgia State University, I bring a unique blend 
              of technical expertise and teaching experience. My journey includes roles as a Python 
              instructor, where I've helped students master programming fundamentals, and as a 
              network engineer intern, where I've gained hands-on experience with enterprise systems. 
              I'm passionate about full-stack development, with strong skills in Python, JavaScript, 
              and Kotlin, and I thrive in collaborative environments where I can contribute to 
              innovative projects while continuously learning and growing.
            </p>
          </div>

          {/* Resume Download Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 shadow-2xl"
          >
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <FileText className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Download My Resume</h2>
              <p className="text-gray-300 mb-8">
                View my complete work history and qualifications
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => window.open(resumeUrl, "_blank")}
                  className="border-white text-gray-900 hover:bg-gray-100 gap-2"
                  size="lg"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open Resume
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 gap-2"
                  size="lg"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

