import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Target } from "lucide-react";

export default function AboutSection() {
  return (
    <div className="space-y-8">
      {/* Bio */}
      <div>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          I'm a passionate Computer Science student at Georgia State University, driven by 
          curiosity and a love for problem-solving. My journey in tech has been shaped by 
          diverse experiences—from teaching Python to future programmers to building network 
          infrastructure as an intern.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Beyond coding, I believe in the power of continuous learning and meaningful connections. 
          I'm constantly exploring new technologies, frameworks, and methodologies to stay at the 
          forefront of software development.
        </p>
      </div>

      {/* Aspirations */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          Aspirations
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <Target className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
            <span>
              Build impactful applications that solve real-world problems and improve people's lives
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Target className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
            <span>
              Contribute to open-source projects and give back to the developer community
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Target className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
            <span>
              Master full-stack development and become proficient in cloud architecture
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Target className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
            <span>
              Inspire and mentor the next generation of programmers and engineers
            </span>
          </li>
        </ul>
      </div>

      {/* Photos Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400"
        >
          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
            R
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-green-400 to-blue-400"
        >
          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
            J
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400"
        >
          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
            B
          </div>
        </motion.div>
      </div>
    </div>
  );
}

