
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
import ProspectionSection from 'pages/ProspectionSection';

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <MDicons.MdDashboard size={20}/>,
    component: Dashboard,
    layout: "/admin",
  },
  
  {
    path: "/users",
    name: "Usuarios",
    icon: <FAIcons.FaUser size={20}/>,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/contacts",
    name: "Contactos",
    icon: <TiIcons.TiContacts size={20}/>,
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
    icon: <MDicons.MdSchool size={20}/>,
    component: Colleges,
    layout: "/admin",
  },
  {
    path: "/SectionReminders",
    name: "Recordatorios",
    icon: <BIicons.BiTime size={20}/>,
    component: RemindersSection,
    layout: "/admin",
  },

  {
    path: "/SectionProspections",
    name: "Prospecciones",
    icon: <GIIcons.GiMagnifyingGlass size={20}/>,
    component: ProspectionSection,
    layout: "/admin",
  },

  {
    path: "/SectionApplications",
    name: "Aplicaciones",
    icon: <AIIcons.AiOutlineAppstoreAdd size={20}/>,
    component: RemindersSection,
    layout: "/admin",
  },
 
 
];
export default routes;
