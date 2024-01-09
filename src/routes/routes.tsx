import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import DetailBooks from "@/pages/books/detail-books";
import Home from "@/pages/home";
import EditProfile from "@/pages/user/edit-profile";
import Profile from "@/pages/user/profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoutes from "./protected-routes";
import HistoryBorrow from "@/pages/books/history-borrow";
import AllNewBooks from "@/pages/books/all-new-books";
import AllOtherBook from "@/pages/books/all-other-books";
import BooksList from "@/pages/admin/books-list";
import UsersBorrow from "@/pages/admin/users-borrow";

export function Routes() {
  const routes = createBrowserRouter([
    {
      element: <ProtectedRoutes />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/profile", element: <Profile /> },
        { path: "/profile/edit", element: <EditProfile /> },
        { path: "/books/:id_book", element: <DetailBooks /> },
        { path: "/books/historyBorrow", element: <HistoryBorrow /> },
        { path: "/books/new", element: <AllNewBooks /> },
        { path: "/books/others", element: <AllOtherBook /> },
        { path: "/dashboard/books/list", element: <BooksList /> },
        { path: "/dashboard/borrow/users", element: <UsersBorrow /> },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}
