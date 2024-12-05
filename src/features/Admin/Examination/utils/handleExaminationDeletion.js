const deleteExaminationAPI = async (examination_id) => {
  try {
    const response = await fetch(
      ` http://localhost:3000/removeExamination/${examination_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      return data;
    } else {
      console.error(response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export default deleteExaminationAPI;
