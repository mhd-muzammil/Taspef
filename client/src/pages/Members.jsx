// client/src/pages/Members.jsx
import React, { useMemo } from "react";
import membersData from "../data/members.json";

/**
 * Helper to format dates from common variants (e.g. "6/5/2023" or "2023-06-05")
 * Returns date as "dd/mm/yyyy" or original string if parsing fails.
 */
function formatDate(raw) {
  if (!raw) return "";
  // try Date parsing safely
  const d = new Date(raw);
  if (!isNaN(d)) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
  // fallback: try split for MM/DD/YYYY or M/D/YYYY
  const parts = raw.split(/[\/\-\.]/).map((p) => p.trim());
  if (parts.length === 3) {
    // if first part > 12 assume yyyy-mm-dd
    if (parts[0].length === 4) {
      // yyyy-mm-dd
      return `${parts[2].padStart(2, "0")}/${parts[1].padStart(2, "0")}/${
        parts[0]
      }`;
    }
    // mm/dd/yyyy -> convert to dd/mm/yyyy
    return `${String(parts[1]).padStart(2, "0")}/${String(parts[0]).padStart(
      2,
      "0"
    )}/${parts[2]}`;
  }
  return raw;
}

/** small CSV export utility */
function exportCSV(rows, filename = "members.csv") {
  if (!rows || !rows.length) return;
  const header = Object.keys(rows[0]);
  const csv = [
    header.join(","),
    ...rows.map((r) =>
      header
        .map((h) => {
          const v = r[h] ?? "";
          const safe = String(v).replace(/"/g, '""');
          return `"${safe}"`;
        })
        .join(",")
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Members() {
  // sort by id ascending
  const members = useMemo(() => {
    const arr = Array.isArray(membersData) ? [...membersData] : [];
    arr.sort((a, b) => Number(a.id ?? a._id ?? 0) - Number(b.id ?? b._id ?? 0));
    return arr;
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-12 py-8">
      {/* Scrolling announcement bar */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          FORM NO VI - Register of members to be maintained under sub-section
          (1) of section 14 of the Tamilnadu Societies Registration Act, 1975
          (Tamil Nadu Act 27 of 1975)
        </div>
      </div>

      {/* Blue banner/header */}
      <div className="bg-[#062a63] text-white rounded-sm p-6 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          REGISTER OF MEMBERS
        </h1>
        <div className="text-center text-sm md:text-base mt-3 max-w-3xl mx-auto">
          <div>
            <strong>Name and address of the society:</strong> Tamil Nadu
            Association of Senior Professionals of Environment and Forests
          </div>
          <div className="mt-1">
            <strong>Date of Registration:</strong>{" "}
            <span className="font-medium">10.09.2007</span>
          </div>
          <div className="mt-1 text-xs md:text-sm">
            LIST OF LIFE MEMBERS AS ON <strong>22.09.2024</strong>
          </div>
        </div>
      </div>

      {/* Title + export */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Our Members</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportCSV(members, "members.csv")}
            className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y table-auto">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  S.No.
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Joining Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Contact Number
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y">
              {members.map((m, idx) => (
                <tr key={m.id ?? m._id ?? idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {idx + 1}
                  </td>

                  <td className="px-6 py-4 whitespace-normal text-sm">
                    <div className="font-semibold text-slate-800">{m.name}</div>
                    {m.designation && (
                      <div className="text-xs text-slate-500 inline-block mt-1">
                        {m.designation}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="inline-block bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-100">
                      {m.subscription ?? m.fee ?? "-"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {formatDate(m.joining_date ?? m.joiningDate ?? m.joining)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {m.phone ?? m.contact ?? m.mobile ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* small footer note */}
      <div className="mt-4 text-xs text-slate-500">
        * Contact numbers shown as provided in data file.
      </div>
    </div>
  );
}
