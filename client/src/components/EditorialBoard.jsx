import React from "react";

const members = [
  { name: "V. Prabhakaran", role: "IFS (Retd), APCCF", title: "Editor" },
  { name: "P. Jeyabalan", role: "IFS (Retd), DCF", title: "Member" },
  { name: "C. Badrasamy", role: "DCF (Retd)", title: "Member" },
  { name: "G. Ramprasath", role: "AD, Statistics (Retd)", title: "Member" },
  { name: "K. Arumugam", role: "ACF (Retd)", title: "Member" },
  { name: "G. Sivagurunathan", role: "ACF (Retd)", title: "Member" },
];

export default function EditorialBoard() {
  return (
    <aside className="hidden lg:block w-64 mr-8 ">
      <div className="bg-green-50 border border-green-100 rounded-md p-5 shadow-sm sticky top-20 h-screen">
        <h4 className="text-lg font-semibold text-green-800 mb-4 ">
          Editorial Board
        </h4>

        <ul className="space-y-4 text-sm">
          {members.map((m, idx) => (
            <li key={idx} className="text-left">
              <div className="text-green-700 font-medium">{m.name}</div>
              <div className="text-gray-600 text-xs">{m.role}</div>
              <div className="text-green-700 text-xs mt-1">{m.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
