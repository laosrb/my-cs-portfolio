import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Experience from "./Pages/Experience";
import Resume from "./Pages/Resume";
import AboutMe from "./Pages/AboutMe";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
          <Route path="/experience" element={<Layout currentPageName="Experience"><Experience /></Layout>} />
          <Route path="/resume" element={<Layout currentPageName="Resume"><Resume /></Layout>} />
          <Route path="/about-me" element={<Layout currentPageName="AboutMe"><AboutMe /></Layout>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

