export default interface Role {
  id: string;
  name: string;
  permissions: RolePermissions;
}

export interface RolePermissions {
  editPatients: boolean;
  editCalendar: boolean;
  editCashFlow: boolean;
  editConfig: boolean;
  editUsers: boolean;
  viewReports: boolean;
}