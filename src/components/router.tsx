import "../style/router.css";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./login";
import LoginGuard from "./guard/loginGuard";
import Dashboard from "./dashboard";
import RoleGuard from "./guard/roleGuard";
import NewTicketForm from "./newTicketForm";
import Register from "./register";
import TicketById from "./ticketById";
import GetTickets from "./getAllTickets";
import DashboardHome from "./dashboardHome";
import Users from "./admin/users";
import CreateUserForm from "./admin/createUserForm";
import CreateStatusesCo from "./admin/cretateStatus";

const router_ = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    element: <LoginGuard />,
    children: [
      {
        path: "/dashboard", element: <Dashboard />,

        children: [
          { index: true, element: <DashboardHome /> },
          {
            element: <RoleGuard allowedRoles={["customer", "agent", "admin"]} />,
            children: [
              { path: "tickets", element: <GetTickets /> }, // הכתובת תהיה /dashboard/tickets
              { path: "tickets/:id", element: <TicketById /> }
            ]
          },
          {
            element: <RoleGuard allowedRoles={["customer"]} />,
            children: [
              { path: "tickets/new", element: <NewTicketForm /> }
            ]
          },
          {
            element: <RoleGuard allowedRoles={["admin"]} />,
            children: [
              {
                path: "users",
                children: [
                  { index: true, element: <Users /> },
                  { path: "create", element: <CreateUserForm /> }
                ]
              }, { path: "createStatuses", element: <CreateStatusesCo /> }
            ]
          }
        ]
      },
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: "*",
        element: <>404 not found</>
      }
    ]
  }
    ]);

export default router_;