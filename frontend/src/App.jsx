import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import AlumniLayout from "./layouts/AlumniLayout";
import StudentLayout from "./layouts/StudentLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages (Auth)
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AlumniRegister from "./pages/auth/AlumniRegister";
import StudentRegister from "./pages/auth/StudentRegister";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Pages (Shared)
import Home from "./pages/shared/Home";
import About from "./pages/shared/About";
import Contact from "./pages/shared/Contact";
import Announcements from "./pages/shared/Announcements";

// Pages (Admin)
import AdminDashboard from "./pages/admin/Dashboard";
import ManageAlumni from "./pages/admin/ManageAlumni";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageJobs from "./pages/admin/ManageJobs";
import ManageDonations from "./pages/admin/ManageDonations";
import Reports from "./pages/admin/Reports";

// Pages (Alumni)
import AlumniDashboard from "./pages/alumni/Dashboard";
import AlumniProfile from "./pages/alumni/Profile";
import AlumniEvents from "./pages/alumni/Events";
import AlumniJobs from "./pages/alumni/Jobs";
import AlumniDonations from "./pages/alumni/Donations";
import AlumniChat from "./pages/alumni/Chat";

// Pages (Student)
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";
import StudentEvents from "./pages/student/Events";
import StudentJobs from "./pages/student/Jobs";
import StudentChat from "./pages/student/Chat";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/announcements" element={<Announcements />} />

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/alumni" element={<AlumniRegister />} />
            <Route path="/register/student" element={<StudentRegister />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="alumni" element={<ManageAlumni />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="jobs" element={<ManageJobs />} />
            <Route path="donations" element={<ManageDonations />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* Alumni Protected Routes */}
          <Route
            path="/alumni/*"
            element={
              <ProtectedRoute role="alumni">
                <AlumniLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AlumniDashboard />} />
            <Route path="profile" element={<AlumniProfile />} />
            <Route path="events" element={<AlumniEvents />} />
            <Route path="jobs" element={<AlumniJobs />} />
            <Route path="donations" element={<AlumniDonations />} />
            <Route path="chat" element={<AlumniChat />} />
          </Route>

          {/* Student Protected Routes */}
          <Route
            path="/student/*"
            element={
              <ProtectedRoute role="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="events" element={<StudentEvents />} />
            <Route path="jobs" element={<StudentJobs />} />
            <Route path="chat" element={<StudentChat />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
