
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
import ApplicationSection from 'pages/ApplicationSection';
// import LogoApplication from 'resources/images/application.png';
// import LogoProspection from 'resources/images/prospection.png';
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
    icon:<svg version="1.0" 

    width="22" height="22" viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet">
   
   <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
   stroke="none">
   <path d="M1945 3875 c-88 -19 -161 -51 -240 -103 l-70 -47 -101 -1 c-185 -3
   -356 -54 -513 -153 -26 -16 -90 -40 -148 -55 -391 -99 -701 -397 -822 -790
   -109 -353 -36 -745 194 -1046 61 -80 189 -198 275 -254 495 -326 1141 -236
   1526 212 39 46 89 114 110 152 21 38 43 70 48 70 4 0 25 -13 45 -29 70 -55
   149 -85 255 -96 117 -13 258 33 356 115 l48 40 36 -66 c54 -97 109 -169 200
   -259 535 -532 1429 -412 1815 242 214 362 212 813 -4 1178 -155 263 -414 457
   -708 531 -58 15 -122 39 -148 55 -157 99 -328 150 -513 153 l-101 1 -74 49
   c-247 164 -564 149 -795 -40 l-56 -45 -56 45 c-73 60 -202 123 -289 141 -85
   18 -190 18 -270 0z m-570 -690 c86 -23 231 -97 300 -153 128 -103 237 -271
   282 -432 25 -93 25 -331 0 -415 -47 -153 -120 -276 -224 -376 -160 -155 -347
   -231 -567 -231 -228 1 -416 78 -579 239 -156 154 -237 350 -237 576 0 133 19
   225 71 335 120 259 330 420 619 476 51 10 276 -3 335 -19z m2803 -4 c234 -68
   416 -226 521 -453 52 -110 71 -202 71 -335 0 -226 -81 -422 -237 -576 -163
   -161 -351 -238 -579 -239 -365 0 -670 229 -784 588 -31 98 -38 272 -16 385 66
   322 310 572 631 643 98 22 294 15 393 -13z m-1525 -784 c59 -45 81 -84 85
   -152 6 -113 -67 -200 -179 -211 -46 -5 -62 -2 -109 23 -44 23 -60 39 -83 83
   -25 47 -28 63 -23 109 11 112 98 185 212 179 48 -3 69 -10 97 -31z"/>
   <path d="M1035 3089 c-229 -38 -442 -210 -530 -426 -26 -66 -55 -194 -55 -249
   0 -53 26 -100 67 -119 74 -36 146 11 158 103 19 157 57 244 144 331 81 81 204
   141 290 141 121 0 192 82 146 169 -28 56 -96 71 -220 50z"/>
   <path d="M3815 3085 c-149 -33 -253 -90 -360 -199 -121 -122 -190 -270 -202
   -431 -7 -99 9 -139 65 -162 29 -12 43 -13 73 -4 55 17 76 49 84 133 26 253
   203 427 458 451 70 7 104 27 123 72 24 59 -3 123 -63 146 -33 12 -106 10 -178
   -6z"/>
   </g>
   </svg>,
    component: ProspectionSection,
    layout: "/admin",
  },

  {
    path: "/SectionApplications",
    name: "Aplicaciones",
    icon:
    <svg version="1.0"
    className="ml-1"
 width="16" height="16" viewBox="0 0 512.000000 512.000000"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
 stroke="none">
<path d="M835 5106 c-95 -30 -162 -88 -204 -176 l-26 -55 0 -2315 0 -2315 26
-55 c34 -71 89 -126 158 -159 l56 -26 1715 0 1715 0 55 26 c100 47 159 125
179 234 15 83 15 2774 0 2845 -14 66 -61 126 -124 159 l-50 26 -765 5 c-688 4
-768 7 -795 22 -38 21 -77 63 -101 108 -18 33 -19 78 -24 775 l-5 740 -22 41
c-28 53 -91 107 -142 122 -57 18 -1591 16 -1646 -2z"/>
<path d="M3123 5100 c-21 -13 -35 -31 -42 -57 -15 -51 -15 -1234 -1 -1285 6
-20 22 -46 37 -58 25 -20 36 -20 679 -20 l652 0 30 25 c36 30 47 70 32 111
-12 33 -1239 1267 -1282 1290 -37 19 -67 18 -105 -6z"/>
</g>
</svg>,    
    component: ApplicationSection,
    layout: "/admin",
  },
 
 
];
export default routes;
