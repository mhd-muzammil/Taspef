import React, { useMemo, useState } from "react";
import manifest from "/public/assets/Gallery/gallery.json";

const images = import.meta.glob(
  "/public/assets/Gallery/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const Gallery = () => {
  const imageMap = useMemo(() => {
    const map = {};
    Object.entries(images).forEach(([path, mod]) => {
      const file = path.split("/").pop();
      map[file] = mod && (mod.default ?? mod);
    });
    return map;
  }, []);

  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState(null);

  const items = useMemo(() => {
    return manifest
      .map((item) => ({ ...item, src: imageMap[item.file] }))
      .filter((i) => !!i.src);
  }, [imageMap]);

  const tags = useMemo(() => {
    const set = new Set(["All"]);
    items.forEach((i) => (i.tags || []).forEach((t) => set.add(t)));
    return Array.from(set);
  }, [items]);

  const shown = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((i) => (i.tags || []).includes(filter));
  }, [items, filter]);

  const tagCards = tags.filter((t) => t !== "All");

  // ✅ Custom cover images for each category
  const coverMap = {
    "wild Life": "/assets/Gallery/covers/wildlife-cover.jpg",
    meetings: "/assets/Gallery/gallery-21.png",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-center sm:text-left">Gallery</h1>
        <button
          onClick={() => setFilter("All")}
          className={`px-3 py-2 rounded border mt-3 sm:mt-0 ${
            filter === "All" ? "bg-gray-200" : ""
          }`}
        >
          Show All
        </button>
      </div>

      {/* ✅ Filter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {tagCards.map((t) => {
          const bgImg =
            coverMap[t] ||
            (() => {
              const match = items.find((it) => (it.tags || []).includes(t));
              return match ? match.src : "";
            })();

          return (
            <div
              key={t}
              onClick={() => setFilter(t)}
              className="relative h-40 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-200 hover:-translate-y-1"
            >
              {/* Card background */}
              <img
                src={bgImg}
                alt={`${t} cover`}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Text at bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-black/40 backdrop-blur-sm">
                <div className="text-white text-lg font-semibold capitalize">
                  {t}
                </div>
                <div className="text-gray-200 text-sm">
                  {items.filter((it) => (it.tags || []).includes(t)).length}{" "}
                  photos
                </div>
              </div>

              {/* Highlight border when active */}
              {filter === t && (
                <div className="pointer-events-none absolute inset-0 ring-4 ring-indigo-300 rounded-2xl" />
              )}
            </div>
          );
        })}
      </div>

      {/* ✅ Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shown.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImg(img.src)}
            className="overflow-hidden rounded-lg shadow cursor-pointer"
          >
            <img
              src={img.src}
              alt={img.caption || `Gallery image ${idx + 1}`}
              loading="lazy"
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-2 text-sm">{img.caption}</div>
          </div>
        ))}
      </div>

      {/* ✅ Full-screen Lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImg(null)}
        >
          <img
            src={selectedImg}
            alt="Full view"
            className="max-w-4xl max-h-[90vh] object-contain rounded-lg shadow-lg"
          />
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold"
            onClick={() => setSelectedImg(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
