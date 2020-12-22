
import Dashboard from '../src/pages/Dashboard';
import Users from '../src/pages/Users';
import Report from '../src/pages/Report';
import Contacts from '../src/pages/Contacts';
import Colleges from '../src/pages/Colleges';
import * as TiIcons from "react-icons/ti";
import * as MDicons from "react-icons/md";
import * as FAIcons from "react-icons/fa";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <MDicons.MdDashboard/>,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Usuarios",
    icon: <FAIcons.FaUser/>,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/contacts",
    name: "Contactos",
    icon: <TiIcons.TiContacts />,
     component: Contacts,
    layout: "/admin",
  },
  // {
  //   path: "/reports",
  //   name: "Reportes",
  //   icon: "nc-icon nc-bell-55",
  //    component: Report,
  //   layout: "/admin",
  // },
  {
    path: "/colleges",
    name: "Colegios",
    icon: <MDicons.MdSchool/>,
    component: Colleges,
    layout: "/admin",
  },
 
 
];
export default routes;
