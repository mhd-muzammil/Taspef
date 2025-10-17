// client/src/pages/AGMReportDetail.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import REPORTS from "../data/reports";

const FALLBACK_REPORT = {
  title: "Minutes of the Annual General Body Meeting",
  date: "—",
  time: "—",
  venue: "—",
  officials: [],
  members: [],
  additionalMembers: [],
  agenda: [],
};

export default function AGMReportDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [report, setReport] = useState(location?.state?.report || null);
  const [loading, setLoading] = useState(!report);

  useEffect(() => {
    if (report) return setLoading(false);
    const found = REPORTS.find((r) => String(r._id) === String(id));
    setReport(found || FALLBACK_REPORT);
    setLoading(false);
  }, [id, report]);

  const handleBack = () => navigate(-1);

  if (loading) return <div className="text-center py-20">Loading…</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button
        onClick={handleBack}
        className="mb-6 flex items-center text-green-600 hover:text-green-700"
      >
        <span className="mr-2 text-lg">←</span> Back to Reports
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-lg md:text-xl font-bold text-center mb-2">
              Tamilnadu Association of Senior Professional of Environment and
              Forestry (TASPEF)
            </h1>
            <h2 className="text-base md:text-lg text-center mb-3 font-semibold">
              {report.title}
            </h2>
            <div className="text-gray-600 text-center space-y-1">
              <p>
                <strong>Date:</strong> {report.date}
              </p>
              <p>
                <strong>Time:</strong> {report.time}
              </p>
              <p>
                <strong>Venue:</strong> {report.venue}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-green-700 mb-3">
              Meeting Officials
            </h3>
            <ul className="list-disc pl-6 text-gray-800 space-y-1">
              {report.officials.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-green-700 mb-3">
              Members Present
            </h3>
            <ul className="list-disc pl-6 text-gray-800 space-y-1">
              {report.members.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-green-700 mb-3">
              Additional Members Joined
            </h3>
            <ul className="list-disc pl-6 text-gray-800 space-y-1">
              {report.additionalMembers.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-green-700 mb-3">
              Agenda Items and Resolutions
            </h3>
            <div className="space-y-4">
              {report.agenda.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-700">{item.resolution}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-green-700 mb-3">
              Meeting Conclusion
            </h3>
            <p>The AGM concluded at 2:00 PM with National Anthem.</p>
            <div className="mt-4 flex justify-between">
              <div>
                <p className="font-semibold">Dr.V.T.Kandasamy IFS (Retd)</p>
                <p>President</p>
              </div>
              <div>
                <p className="font-semibold">D.Arun</p>
                <p>General Secretary</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: preview or placeholder */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {report.fileUrl ? (
              <iframe
                src={report.fileUrl}
                title="Report Preview"
                className="w-full h-[70vh] md:h-[80vh] border-0"
              />
            ) : (
              <div className="p-8 text-center text-gray-600">
                No file available for preview.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
