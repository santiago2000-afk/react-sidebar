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
import UserListView from "../pages/admin/admin/ListaUsuarios";
import VisitForm from "../pages/admin/admin/VisitForm";
import Historial from "../pages/admin/admin/Historial";
import Escaner from "../pages/admin/vigilante/Escaner";
import HistorialVigilante from "../pages/admin/vigilante/Historial";


const user = {
  name: 'John Doe',
  photo: 'https://via.placeholder.com/150',
  contract: 'ABC123',
  dui: '12345678-9',
  address: '123 Main St, San Salvador, El Salvador',
  contact: '+503 1234 5678',
  qrKey: 'https://example.com',
};

const handleScan = (data: any) => {
  console.log('Resultado del escaneo:', data);
};

const appRoutes: RouteType[] = [
  {
    index: true,
    path: "/",
    element: <Home />,
    state: "home"
  },
  {
    path: "/admin/ver",
    element: <UserListView />,
    state: "ver"
  },
  {
    path: "/vigilante/escaner",
    element: <Escaner onScan={handleScan} />,
    state: "escaner"
  },
  {
    path: "/vigilante/historial",
    element: <HistorialVigilante />,
    state: "historial"
  },
  {
    path: "/admin/historial",
    element: <Historial />,
    state: "historial"
  },
  {
    path: "/admin/visita",
    element: <VisitForm />,
    state: "visita"
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