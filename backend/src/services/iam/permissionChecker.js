const assert = require('assert');
const ForbiddenError = require('../../errors/forbiddenError');
const Permissions = require('../../security/permissions');

/**
 * Checks the Permission of the User.
 */
module.exports = class PermissionChecker {
  constructor({ language, currentUser }) {
    this.language = language;
    this.currentUser = currentUser;
  }

  /**
   * Validates if the user has a specific permission
   * and throws a ForbiddenError if it doesn't.
   * @param {*} permission
   */
  validateHas(permission) {
    if (!this.has(permission)) {
      throw new ForbiddenError(this.language);
    }
  }

  /**
   * Checks if the user has a specific permission.
   * @param {*} permission
   */
  has(permission) {
    assert(permission, 'permission is required');

    return this.currentUserRolesIds.some((role) =>
      permission.allowedRoles.some(
        (allowedRole) => allowedRole === role,
      ),
    );
  }

  /**
   * Validates if the user has access to a storage folder
   * and throws a ForbiddenError if it doesn't.
   * @param {*} folder
   */
  validateHasStorageFolder(folder) {
    if (!this.hasStorageFolder(folder)) {
      throw new ForbiddenError(this.language);
    }
  }

  /**
   * Validates if the user has access to a storage folder.
   * @param {*} folder
   */
  hasStorageFolder(folder) {
    assert(folder, 'Folder is required');
    return this.allowedStorageFolders().includes(folder);
  }

  /**
   * Returns the Current User Roles.
   */
  get currentUserRolesIds() {
    if (!this.currentUser || !this.currentUser.roles) {
      return [];
    }

    return this.currentUser.roles;
  }

  /**
   * Returns the allowed storage folders for the user.
   */
  allowedStorageFolders() {
    let allowedStorageFolders = [];

    Permissions.asArray.forEach((permission) => {
      if (this.has(permission)) {
        allowedStorageFolders = allowedStorageFolders.concat(
          permission.allowedStorageFolders || [],
        );
      }
    });

    return [...new Set(allowedStorageFolders)];
  }
};
