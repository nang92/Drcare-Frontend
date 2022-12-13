export const adminMenu = [
  //User Management
  {
    name: 'menu.admin.manage-user',
    menus: [
      {
        name: 'menu.admin.crud',
        link: '/system/user-manage',
      },
      {
        name: 'menu.admin.crud-redux',
        link: '/system/user-redux',
      },
      {
        name: 'menu.admin.manage-doctor',
        link: '/system/manage-doctor',
        /*  subMenus: [
          { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
          { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        ], */
      },
      //Doctor Management Schedule
      {
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/manage-schedule',
      },
    ],
  },

  // Clinic Management
  {
    name: 'menu.admin.clinic',
    menus: [
      {
        name: 'menu.admin.manage-clinic',
        link: '/system/manage-clinic',
      },
    ],
  },
  // Speciality Management
  {
    name: 'menu.admin.speciality',
    menus: [
      {
        name: 'menu.admin.manage-speciality',
        link: '/system/manage-speciality',
      },
    ],
  },
  // Handbook Management
  {
    name: 'menu.admin.handbook',
    menus: [
      {
        name: 'menu.admin.manage-handbook',
        link: '/system/manage-handbook',
      },
    ],
  },
];
export const doctorMenu = [
  //Doctor Management Schedule
  {
    name: 'menu.admin.manage-user',
    menus: [
      {
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/manage-schedule',
      },
    ],
  },
];
