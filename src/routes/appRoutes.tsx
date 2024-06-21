import React from 'react';
import { RouteType } from './config';

import DashboardPageLayout from '../pages/dashboard/DashboardPageLayout';
import Home from '../pages/dashboard/Home';
import Request from '../pages/dashboard/Request';
import Profile from '../pages/dashboard/Profile';
import Notificaciones from '../pages/dashboard/Notificaciones';
import People from '../pages/dashboard/People';
import Residente from '../pages/dashboard/ResidenteNoPropietario';
import Formulario from '../pages/Form';
import UserListView from '../pages/admin/admin/ListaUsuarios';
import VisitForm from '../pages/admin/admin/VisitForm';
import Historial from '../pages/admin/admin/Historial';
import Escaner from '../pages/admin/vigilante/Escaner';
import HistorialVigilante from '../pages/admin/vigilante/Historial';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SecurityIcon from '@mui/icons-material/Security';

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
    path: "/vigilante/escaner",
    element: <Escaner onScan={handleScan} />,
    state: "vigilante.escaner",
    sidebarProps: {
      displayText: "Escaner"
    }
  },
  {
    path: "/vigilante/historial",
    element: <HistorialVigilante />,
    state: "vigilante.historial",
    sidebarProps: {
      displayText: "Historial"
    }
  },
  {
    path: "/admin/ver",
    element: <UserListView />,
    state: "admin.ver",
    sidebarProps: {
      displayText: "Ver Usuarios"
    }
  },
  {
    path: "/admin/historial",
    element: <Historial />,
    state: "admin.historial",
    sidebarProps: {
      displayText: "Historial"
    }
  },
  {
    path: "/admin/visita",
    element: <VisitForm />,
    state: "admin.visita",
    sidebarProps: {
      displayText: "Formulario de Visita"
    }
  },
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />
    },
    child: [
      {
        index: true,
        path: "/dashboard/home",
        element: <Home />,
        state: "dashboard.home",
        sidebarProps: {
          displayText: "Inicio"
        }
      },
      {
        path: "/dashboard/request",
        element: <Request />,
        state: "dashboard.request",
        sidebarProps: {
          displayText: "Solicitudes"
        }
      },
      {
        path: "/dashboard/profile",
        element: <Profile user={user} />,
        state: "dashboard.profile",
        sidebarProps: {
          displayText: "Perfil"
        }
      },
      {
        path: "/dashboard/notificaciones",
        element: <Notificaciones />,
        state: "dashboard.notificaciones",
        sidebarProps: {
          displayText: "Notificaciones"
        }
      },
      {
        path: "/dashboard/resident",
        element: <Residente />,
        state: "dashboard.resident",
        sidebarProps: {
          displayText: "Residente"
        }
      },
      {
        path: "/dashboard/people",
        element: <People />,
        state: "dashboard.people",
        sidebarProps: {
          displayText: "Personas"
        }
      },
      {
        path: "/dashboard/visitas",
        element: <Formulario />,
        state: "dashboard.visitas",
        sidebarProps: {
          displayText: "Visita"
        }
      }
    ]
  }
];

export default appRoutes;