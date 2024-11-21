import { create } from "zustand";

const initialData = {
  first_name: "",
  middle_name: "",
  last_name: "",
  gender: "Male",
  age: 0,
  examination_id: [],
};

const usePatientData = create((set) => ({
  patientData: initialData,
  setPatientData: (newData) => {
    set((state) => ({ patientData: { ...state.patientData, ...newData } }));
  },

  setExaminationIds: (examinationIds) => {
    set((state) => ({
      patientData: { ...state.patientData, examination_id: examinationIds },
    }));
  },
}));

export default usePatientData;
