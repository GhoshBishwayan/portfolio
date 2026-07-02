import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Portfolio",
    short_name: "Portfolio",
    description: "A premium portfolio showcasing engineering and design.",
    start_url: "/",
    display: "standalone",
    background_color: "#030303",
    theme_color: "#030303",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
