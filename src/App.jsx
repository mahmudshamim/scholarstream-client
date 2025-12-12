import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import AllScholarships from './pages/scholarships/AllScholarships';
import ScholarshipDetails from './pages/scholarships/ScholarshipDetails';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Checkout from './pages/checkout/Checkout';
import Success from './pages/checkout/Success';
import Failed from './pages/checkout/Failed';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute';

// Dashboard Imports
import DashboardLayout from './components/layout/DashboardLayout';
import StudentDashboard from './pages/dashboard/student/StudentDashboard';
import Profile from './pages/dashboard/student/Profile';
import MyApplications from './pages/dashboard/student/MyApplications';
import MyReviews from './pages/dashboard/student/MyReviews';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import ManageScholarships from './pages/dashboard/admin/ManageScholarships';
import ManageUsers from './pages/dashboard/admin/ManageUsers';
import AddScholarship from './pages/dashboard/admin/AddScholarship';
import ModeratorDashboard from './pages/dashboard/moderator/ModeratorDashboard';
import ManageApplicationsMod from './pages/dashboard/moderator/ManageApplications';
import ManageReviewsMod from './pages/dashboard/moderator/ManageReviews';
import AdminProfile from './pages/dashboard/admin/AdminProfile';
import ModeratorProfile from './pages/dashboard/moderator/ModeratorProfile';
import UpdateScholarship from './pages/dashboard/admin/UpdateScholarship';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Website Routes (with Navbar/Footer) */}
        <Route element={
          <div className="page-wrapper">
            <Navbar />
            <main className="main-content">
              <Outlet />
            </main>
            <Footer />
          </div>
        }>
          <Route path="/" element={<Home />} />
          <Route path="/scholarships" element={<AllScholarships />} />
          <Route path="/scholarships/:id" element={<PrivateRoute><ScholarshipDetails /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout/:id" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} />
          <Route path="/failed" element={<PrivateRoute><Failed /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Dashboard Routes (different layout) */}
        <Route path="/dashboard/student" element={<PrivateRoute><DashboardLayout role="student" /></PrivateRoute>}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="reviews" element={<MyReviews />} />
        </Route>

        <Route path="/dashboard/admin" element={<PrivateRoute><DashboardLayout role="admin" /></PrivateRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="scholarships" element={<ManageScholarships />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="applications" element={<ManageApplicationsMod />} />
          <Route path="add-scholarship" element={<AddScholarship />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="update-scholarship/:id" element={<UpdateScholarship />} />
        </Route>

        <Route path="/dashboard/moderator" element={<PrivateRoute><DashboardLayout role="moderator" /></PrivateRoute>}>
          <Route index element={<ModeratorDashboard />} />
          <Route path="applications" element={<ManageApplicationsMod />} />
          <Route path="reviews" element={<ManageReviewsMod />} />
          <Route path="profile" element={<ModeratorProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

// Helper needed because I removed the wrapper inside the route element prop above to keep it clean, but I need to wrap Outlet.
// Actually, RRD v6 allows Layout Routes.
import { Outlet } from 'react-router-dom';

export default App;
