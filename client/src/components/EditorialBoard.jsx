import React from "react";

const members = [
  { name: "Thiru V. Prabhakaran IFS.,", role: " APCCF Retd.", title: "Editor" },
  { name: "Thiru D. Arun, IFS., ", role: "CF Retd.", title: "Member" },
  { name: "Thiru Dr. S. Paulraj, IFS.,", role: "CF Retd.", title: "Member" },
  {
    name: "Thiru G. Ramprasad, AD",
    role: "(Statistics) Retd.",
    title: "Member",
  },
  { name: "Thiru G. Sivagurunathan, ACF ", role: "Retd.", title: "Member" },
];

export default function EditorialBoard() {
  return (
    <aside className="hidden lg:block w-88 mr-8 ">
      <div className="bg-green-50 border border-green-100 rounded-md p-5 shadow-sm sticky top-20 h-screen">
        <h4 className="text-lg font-semibold text-green-800 mb-4 ">
          Editorial Board
        </h4>

        <ul className="space-y-4 text-sm">
          {members.map((m, idx) => (
            <li key={idx} className="text-left">
              <div className="text-green-700 text-xs mt-1">{m.title}</div>
              <div className="text-green-700 font-medium">{m.name}</div>
              <div className="text-gray-600 text-xs">{m.role}</div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
