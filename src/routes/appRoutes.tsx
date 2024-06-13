import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import Home from "../pages/dashboard/Home";
import Request from "../pages/dashboard/Request";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Profile from "../pages/dashboard/Profile";
import Notificaciones from "../pages/dashboard/Notificaciones";
import People from "../pages/dashboard/People";
import Residente from "../pages/dashboard/ResidenteNoPropietario";
import Formulario from "../pages/Form";

const user = {
  name: 'John Doe',
  photo: 'https://via.placeholder.com/150',
  contract: 'ABC123',
  dui: '12345678-9',
  address: '123 Main St, San Salvador, El Salvador',
  contact: '+503 1234 5678',
  qrKey: 'https://example.com',
};

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Inicio",
      icon: <DashboardOutlinedIcon />
    },
    child: [
      {
        index: true,
        path: "/dashboard/home",
        element: <Home />,
        state: "dashboard.default",
        sidebarProps: {
          displayText: "Hogar"
        },
      },
      {
        path: "/dashboard/request",
        element: <Request />,
        state: "dashboard.analytics",
        sidebarProps: {
          displayText: "Solicitudes"
        }
      },
      {
        path: "/dashboard/profile",
        element: <Profile user={user} />,
        state: "dashboard.profile"
      },
      {
        path: "/dashboard/notificaciones",
        element: <Notificaciones />,
        state: "dashboard.notificaciones"
      },
      {
        path: "/dashboard/people",
        element: <People />,
        state: "dashboard.people"
      },
      {
        path: "/dashboard/resident",
        element: <Residente />,
        state: "dashboard.people"
      },
      {
        path: "/dashboard/formulario",
        element: <Formulario />,
        state: "dashboard.formulario"
      },
    ]
  },
];

export default appRoutes;