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
  const [selectedImg, setSelectedImg] = useState(null); // 👈 track full-screen image

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-center sm:text-left">Gallery</h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded mt-3 sm:mt-0"
        >
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shown.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImg(img.src)} // 👈 open full-screen
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

      {/* Full-screen lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImg(null)} // 👈 close on click outside
        >
          <img
            src={selectedImg}
            alt="Full view"
            className="max-w-4xl max-h-[90vh] object-contain rounded-lg shadow-lg"
          />
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold"
            onClick={() => setSelectedImg(null)} // 👈 close button
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
