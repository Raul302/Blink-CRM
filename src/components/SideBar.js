import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';

export const SideBar =[
    {
        title:'Dashboard',
        path:'/',
        icon: <AiIcons.AiFillDashboard />,
        cName: 'nav-text'
    },
    {
        title:'Report',
        path:'/reports',
        icon: <FaIcons.FaRegFilePowerpoint />,
        cName: 'nav-text'
    },
    {
        title:'Contacts',
        path:'/contacts',
        icon: <AiIcons.AiFillContacts />,
        cName: 'nav-text'
    },
    {
        title:'Users',
        path:'/users',
        icon: <FaIcons.FaUser />,
        cName: 'nav-text'
    },
]