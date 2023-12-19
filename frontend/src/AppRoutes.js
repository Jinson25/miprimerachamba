import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePages from "./pages/Home/HomePages";
import BookPage from "./pages/Book/BookPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import AuthRoute from "./components/Router/AuthRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import BooksAdminPage from "./pages/Library/BooksAdminPage";
import AdminRoute from "./components/Router/AdminRoute";
import BookForm from "./components/BookForm/BookForm";
import UsersAdminPage from "./pages/Users/UsersAdminPage";
import UserForm from "./components/UserForm/UserForm";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePages />} />
      <Route path="/search/:searchTerm" element={<HomePages />} />
      <Route path="/book/:id" element={<BookPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
      <Route
        path="/admin/books/:searchTerm?"
        element={
          <AdminRoute>
            <BooksAdminPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/createBook"
        element={
          <AdminRoute>
            <BookForm />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/editBook/:bookId"
        element={
          <AdminRoute>
            <BookForm />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users/:searchTerm?"
        element={
          <AdminRoute>
            <UsersAdminPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/createUser"
        element={
          <AdminRoute>
            <UserForm/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/editUser/:userId"
        element={
          <AdminRoute>
            <UserForm />
          </AdminRoute>
        } 
      />
      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
}
