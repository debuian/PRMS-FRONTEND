const useDisplayReportTypes = async () => {
  try {
    const response = await fetch("  http://localhost:3000/getReportTypes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Login failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export default useDisplayReportTypes;
