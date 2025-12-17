// src/config/sidebarConfig.ts
export const sidebarConfig = {
  SuperAdmin: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Hospitals", path: "/hospitals" },
    { label: "Users", path: "/users" },
  ],
  Admin: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Doctors", path: "/doctors" },
    { label: "Staff", path: "/staff" },
  ],
  Doctor: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Profile", path: "/profile" },
    { label: "Claims", path: "/claims" },
  ],
  Staff: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Claims", path: "/claims" },
  ],
};
