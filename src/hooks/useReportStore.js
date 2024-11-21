import { create } from "zustand";

const useReportStore = create((set) => ({
  report: {
    reportDetails: {
      report_id: null,
      created_at: "2024-11-13T05:32:31.317Z",
      status: "pending",
      updated_at: null,
    },
    patientDetails: {
      patient_id: null,
      first_name: "",
      middle_name: "",
      last_name: "",
      gender: "",
      age: null,
    },
    reportCreatorDetails: {
      report_creator_id: null,
      creator_id: null,
      creator_type: "",
    },
  },

  setReport: (newReport) => set(() => ({ report: newReport })),

  setPatientDetails: (newDetails) =>
    set((state) => ({
      report: {
        ...state.report,
        patientDetails: { ...state.report.patientDetails, ...newDetails },
      },
    })),
  updateReportKey: (path, value) =>
    set((state) => {
      const keys = path.split(".");
      const updatedReport = { ...state.report };
      let current = updatedReport;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return { report: updatedReport };
    }),
}));

export default useReportStore;
