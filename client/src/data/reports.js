// client/src/data/reports.js
const REPORTS = [
  {
    _id: "1",
    title: "Annual General Meeting 2024",
    date: "September 24, 2024",
    time: "11:00 AM",
    venue: "IFS Officers Mess, Velacherry, Chennai",
    fileUrl: null,
    originalName: null,
    summary: "Minutes and resolutions of the 2024 AGM.",
    officials: [
      "President: Dr.V.T.Kandasamy IFS, CCF (Retd)",
      "Chief Guest: Dr T. Sekar. IFS, PCCF(Retd)",
      "Guest of Honour: Thiru N. Krishnakumar, IFS, PCCF & HoFF (Retd)",
    ],
    members: [
      "Thiru V. Prabhakaran, IFS, APCCF (Retd)",
      "Thiru D. Arun, IFS, CF(Retd)",
      "Thiru S. Dhandayuthapani, DCF (Retd)",
      "Thiru G. Sivagurunathan, ACF (Retd)",
      "Thiru P.Ramachandran, ACF (Retd)",
      "Thiru P. Jeyabalan, IFS, DCF(Retd)",
      "Dr S. Davidraj, ACF(Retd)",
    ],
    additionalMembers: [
      "Thiru S. Deepalingam, DCF(Retd)",
      "Thiru S. Palanichamy, DCF (Retd)",
      "Thiru S.B.Thiruvengadam, ACF (Retd)",
      "Thiru S. Velumani, IFS, DCF(Retd)",
      "Thiru G. Ramprasath, AD,Statistics (Retd)",
    ],
    agenda: [
      {
        title: "1. Approval of Previous Minutes",
        resolution:
          "The General Body resolved and approved the minutes of the XVI th meeting held on 17.09.2023 without any change.",
      },
      {
        title: "2. Approval of Accounts",
        resolution:
          "The General Body approved the statements of accounts for the year 2023-24 with Audited report.",
      },
      {
        title: "3. Statutory Auditor Nomination",
        resolution:
          "Unanimously resolved to continue the services of M/S S. Ganapathy & Co, Chennai 34, as Statutory Auditor for 2024-25.",
      },
      {
        title: "4. Namathu Vanam E-magazine",
        resolution:
          "The AGM appreciated the Editorial Board and requested all members to contribute their experiences related to forestry, wildlife, and administrative matters.",
      },
      {
        title: "5. Consultancy Services",
        resolution:
          "Resolved to continue efforts with the Forest Department and other departments to get projects for TASPEF.",
      },
    ],
  },
  {
    _id: "2",
    title: "Annual General Meeting 2023",
    date: "September 18, 2023",
    time: "10:30 AM",
    venue: "IFS Officers Mess, Chennai",
    fileUrl: null,
    originalName: null,
    summary: "Minutes and resolutions of the 2023 AGM.",
    officials: ["President: Dr.V.T.Kandasamy IFS (Retd)", "Secretary: D.Arun"],
    members: ["Member A", "Member B"],
    additionalMembers: ["Member C"],
    agenda: [
      {
        title: "1. Opening",
        resolution: "Meeting was opened by the President.",
      },
    ],
  },
];

export default REPORTS;
