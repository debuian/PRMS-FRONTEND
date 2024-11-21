import DisplayPatientReport from "../components/DisplayPatientReport";
import EditPatientReportPage from "../components/EditPatientReportPage";
import AddExaminaitonsPage from "../pages/AddExaminationsPage";
import CreateReportPatientPage from "../pages/AddPatientPage";
import AddReportTypes from "../pages/AddReportType";
import DisplayExaminationsDetails from "../pages/DisplayExaminationsDeatils";
import DisplayReportTypes from "../pages/DisplayReportType";

const renderContent = (selectedRoute, props) => {
  switch (selectedRoute) {
    case "EditReports":
      return <EditPatientReportPage />;
    case "ViewReports":
      return <DisplayPatientReport />;
    case "Dashboard":
      return <div>Welcome to the Dashboard</div>;
    case "ViewExaminations":
      return <DisplayExaminationsDetails />;
    case "CreateExamination":
      return <AddExaminaitonsPage />;
    case "CreateReportType":
      return <AddReportTypes />;
    case "ViewReportTypes":
      return <DisplayReportTypes />;
    case "CreateReport":
      return <CreateReportPatientPage />;

    case "Admin":
      return <div>Admin Panel</div>;
    default:
      return <div>Select a route from the sidebar</div>;
  }
};
export default renderContent;
