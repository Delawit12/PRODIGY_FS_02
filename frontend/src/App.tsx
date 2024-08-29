import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

{
  /* <Route path="/dashboard" element={<Dashboard />} /> */
}
{
  /* <Route path="Add" element={<AddEmployeePage />} /> */
}
// <Route path="read" element={<EmployeeListPage />} />
{
  /* <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} /> */
}
// <Route path="/leaves" element={<LeaveApplications />} />
// <Route path="/addEmployee" element={<AddEmployeePage />} />
// <Route path="/list" element={<EmployeeListPage />} />
{
  /* <Route path="/admin-profile" element={<ProfileManagement />} /> */
}
// <Route
//   path="/admin-dashboard"
//   element={
//     <ProtectedRoute role="admin">
//       <AdminDashboard />
//     </ProtectedRoute>
//   }
// />
// <Route
//   path="/employee-dashboard"
//   element={
//     <ProtectedRoute role="employee">
//       <EmployeeDashboard />
//     </ProtectedRoute>
//   }
// />
// <Route path="/employee-profile" element={<EmployeeProfile />} />
