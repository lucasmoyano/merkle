import Uuid from 'uuid';
import FirebaseUtil from '../../../utils/FirebaseUtil';
import Role from "./Role";

export default class RoleApi {

  static getNewRole() {
    const role: Role = {
      "id": Uuid.v4(),
      "name": '',
      "permissions": {
        "editPatients": true,
        "editCalendar": true,
        "editCashFlow": false,
        "editConfig": false,
        "editUsers": false,
        "viewReports": false
      }
    };
    return role;
  }

  /** Save Role */
  static async save(role: Role): Promise<Boolean> {
    await FirebaseUtil.save('role', role.id, role);
    return true;
  }

  public static async remove(roleId: string | undefined) {
    if (roleId) {
      await FirebaseUtil.remove('role', roleId);
    }
    return true;
  }

  /**
   * Search roles
   */
  public static search = async (search: string = '', lastElement: any = null, pageSize: number = 50): Promise<Role[]> => {
    let queries: any[] = [];

    if (search) {
      queries = [
        ['name', '=*', search]
      ];
    }
    return FirebaseUtil.searchWithOr('role', queries, 'name', 'asc', lastElement, pageSize);
  }

}