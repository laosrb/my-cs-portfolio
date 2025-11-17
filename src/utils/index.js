export function createPageUrl(pageName) {
  const pageMap = {
    Home: "/",
    Experience: "/experience",
    Resume: "/resume",
    AboutMe: "/about-me",
  };
  return pageMap[pageName] || "/";
}

