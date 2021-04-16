
import Dashboard from '../src/pages/Dashboard';
import Users from '../src/pages/Users';
import Report from '../src/pages/Report';
import Contacts from '../src/pages/Contacts';
import Colleges from '../src/pages/Colleges';
import * as TiIcons from "react-icons/ti";
import * as MDicons from "react-icons/md";
import * as FAIcons from "react-icons/fa";
import * as BIicons from  "react-icons/bi";
import * as GIIcons from  "react-icons/gi";
import * as AIIcons from  "react-icons/ai";
import RemindersSection from 'pages/RemindersSection';

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
  {
    path: "/SectionReminders",
    name: "Recordatorios",
    icon: <BIicons.BiTime/>,
    component: RemindersSection,
    layout: "/admin",
  },

  {
    path: "/SectionReminders",
    name: "Prospecciones",
    icon: <GIIcons.GiMagnifyingGlass/>,
    component: RemindersSection,
    layout: "/admin",
  },

  {
    path: "/SectionReminders",
    name: "Aplicaciones",
    icon: <AIIcons.AiOutlineAppstoreAdd/>,
    component: RemindersSection,
    layout: "/admin",
  },
 
 
];
export default routes;
