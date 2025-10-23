import React, { useMemo, useState } from "react";
import GalleryBG from "../components/GalleryBG"; // ✅ Animated background component
import manifest from "/public/assets/Gallery/gallery.json";

const images = import.meta.glob(
  "/public/assets/Gallery/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const Gallery = () => {
  // Normalize tag keys (lowercase + single spaces)
  const normalize = (s) =>
    s ? s.toString().toLowerCase().replace(/\s+/g, " ").trim() : "";

  // Build image map from import.meta.glob
  const imageMap = useMemo(() => {
    const map = {};
    Object.entries(images).forEach(([path, mod]) => {
      const file = path.split("/").pop();
      map[file] = mod && (mod.default ?? mod);
    });
    return map;
  }, []);

  const [filter, setFilter] = useState(null); // null = show category cards
  const [selectedImg, setSelectedImg] = useState(null);

  // Build items with normalized tags
  const items = useMemo(() => {
    return manifest
      .map((item) => {
        const src = imageMap[item.file];
        const tags = Array.isArray(item.tags)
          ? item.tags
          : item.tags
          ? [item.tags]
          : [];
        const normalizedTags = tags.map((t) => normalize(t));
        return { ...item, src, tags, normalizedTags };
      })
      .filter((i) => !!i.src);
  }, [imageMap]);

  // ✅ Define your 2 gallery categories
  const coverMapRaw = {
    "WILD LIFE": "/assets/Gallery/covers/wildlife-cover.jpg",
    "MEETINGS": "/assets/Gallery/gallery-21.png",
  };

  // Create normalized map for matching
  const coverMap = useMemo(() => {
    const m = {};
    Object.entries(coverMapRaw).forEach(([title, cover]) => {
      m[normalize(title)] = { title, cover };
    });
    return m;
  }, []);

  const categories = useMemo(() => Object.keys(coverMap), [coverMap]);

  // Filter images for the selected category
  const shown = useMemo(() => {
    if (!filter) return [];
    return items.filter((it) => it.normalizedTags.includes(filter));
  }, [items, filter]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ✅ Animated Background */}
      <GalleryBG />

      {/* 🔹 Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>

          {/* Back button when viewing a category */}
          {filter ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilter(null)}
                className="px-3 py-2 rounded border bg-white text-sm shadow hover:bg-gray-100 transition"
              >
                ← Back to Categories
              </button>
              <div className="text-sm text-gray-600 capitalize">
                {coverMap[filter] ? coverMap[filter].title : filter}
              </div>
            </div>
          ) : null}
        </div>

        {/* Category Cards */}
        {!filter && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {categories.map((catKey) => {
              const { title, cover } = coverMap[catKey];
              const count = items.filter((it) =>
                it.normalizedTags.includes(catKey)
              ).length;

              return (
                <div
                  key={catKey}
                  onClick={() => setFilter(catKey)}
                  role="button"
                  className="relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 group"
                  aria-label={`Open ${title} photos`}
                >
                  <img
                    src={cover}
                    alt={`${title} cover`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Text at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-black/30 backdrop-blur-sm">
                    <div className="text-white text-2xl font-bold">
                      {title}
                    </div>
                    <div className="text-gray-200 text-sm">{count} photos</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Filtered Images */}
        {filter && (
          <>
            {shown.length === 0 ? (
              <div className="py-16 text-center text-gray-600 text-lg">
                No photos found for{" "}
                <span className="font-semibold">
                  {coverMap[filter] ? coverMap[filter].title : filter}
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {shown.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImg(img.src)}
                    className="overflow-hidden rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={img.src}
                      alt={img.caption || `Gallery image ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="p-2 text-sm bg-white/80 backdrop-blur-sm">
                      {img.caption}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Full-Screen Lightbox */}
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
              className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-gray-300"
              onClick={() => setSelectedImg(null)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
