import { PrismaClient, RoleName, PermissionName } from '@prisma/client';

const db = new PrismaClient();
type Permission = {
  name: PermissionName;
};
type RolesWithPermissions = {
  name: RoleName;
  permissions?: PermissionName[];
};
const permissions: Permission[] = [
  { name: 'CREATE_WR' },
  { name: 'VIEW_WR' },
  { name: 'DELETE_WR' },
];

const rolesWithPermissions: RolesWithPermissions[] = [
  {
    name: 'ControlRoom',
    permissions: ['CREATE_WR', 'VIEW_WR', 'DELETE_WR'],
  },
  {
    name: 'ShiftIncharge',
    permissions: ['VIEW_WR', 'CREATE_WR'],
  },
  {
    name: 'Employee',
    permissions: ['VIEW_WR'],
  },
  {
    name: 'OPEngr',
    permissions: ['VIEW_WR'],
  },
  {
    name: 'MMEngr',
    permissions: ['VIEW_WR'],
  },
  {
    name: 'EMEngr',
    permissions: ['VIEW_WR'],
  },
  {
    name: 'OPManager',
    permissions: ['VIEW_WR', 'CREATE_WR', 'DELETE_WR'],
  },
  {
    name: 'MManager',
    permissions: ['VIEW_WR', 'CREATE_WR'],
  },
  {
    name: 'EManager',
    permissions: ['VIEW_WR', 'CREATE_WR'],
  },
  {
    name: 'DGM',
    permissions: ['VIEW_WR', 'CREATE_WR', 'DELETE_WR'],
  },
];

export const seedRolesAndPermissions = async () => {
  // Seed permissions
  const permissionPromises = permissions.map((permission) =>
    db.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: { name: permission.name },
    })
  );
  const createdPermissions = await Promise.all(permissionPromises);

  // Create a map of permission names to their database IDs
  const permissionMap = createdPermissions.reduce((map, permission) => {
    map[permission.name] = permission.id;
    return map;
  }, {} as Record<string, string>);

  const rolePromises = rolesWithPermissions.map((role) => {
    if (!role.permissions) {
      throw new Error(`Role ${role.name} is missing permissions`);
    }

    return db.role.upsert({
      where: { name: role.name },
      update: {},
      create: {
        name: role.name,
        permissions: {
          connect: role.permissions.map((permissionName) => ({
            id: permissionMap[permissionName],
          })),
        },
      },
    });
  });
  await Promise.all(rolePromises);

  console.log('Roles and permissions seeded successfully!');
};
