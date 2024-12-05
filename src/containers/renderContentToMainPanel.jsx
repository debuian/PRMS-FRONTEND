import DisplayPatientReport from "../features/Reports/components/ViewReport/DisplayPatientReport";
import DisplayPharmacyDetails from "../features/Pharmacy/DisplayPharmacyDetails";
import EditPatientReportPage from "../features/Reports/components/EditReport/EditPatientReportPage";
import AddExaminaitonsPage from "../features/Admin/Examination/AddExaminationsPage";
import CreateReportPatientPage from "../features/Reports/components/CreateReport/AddPatientPage";
import AddReportTypes from "../features/Admin/ReportType/AddReportType";
import Dashboard from "../pages/DashBoard/Dashboard";
import DisplayExaminationsDetails from "../features/Admin/Examination/DisplayExaminationsDeatils";
import DisplayReportTypes from "../features/Admin/ReportType/DisplayReportType";
import Profile from "../pages/Profile/Profile";
import CreateProfile from "../features/Profile/CreateProfile";
import UpdateProfile from "../features/Profile/UpdateProfile";
import useRouteStore from "../hooks/useRouteStore";

const renderContent = (selectedRoute) => {
  const { routeData } = useRouteStore();

  switch (selectedRoute) {
    case "UpdateProfile":
      return <UpdateProfile data={routeData.data} />;
    case "CreateProfile":
      return <CreateProfile />;
    case "Profile":
      return <Profile />;
    case "Pharmacy":
      return <DisplayPharmacyDetails />;
    case "EditReports":
      return <EditPatientReportPage />;
    case "ViewReports":
      return <DisplayPatientReport />;
    case "Dashboard":
      return <Dashboard />;
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
      return <div> Admin Panel</div>;
    default:
      return <div>Select a route from the sidebar</div>;
  }
};
export default renderContent;
