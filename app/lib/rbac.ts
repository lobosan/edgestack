import { Role } from "@prisma/client";

const permissions = {
  [Role.GUEST]: ["viewPublicContent"],
  [Role.USER]: ["viewUserContent", "editUserProfile", "createPost"],
  [Role.ADMINISTRATOR]: [
    "viewAdminContent",
    "manageUsers",
    "deletePost",
    "editAnyProfile",
  ],
};

export const isAuthorized = (userRole: Role, requiredPermissions: string[]) => {
  return requiredPermissions.every((permission) =>
    permissions[userRole].includes(permission)
  );
};

// Add a new function to get permissions for a role
export const getPermissions = (userRole: Role) => {
  return permissions[userRole] || [];
};
