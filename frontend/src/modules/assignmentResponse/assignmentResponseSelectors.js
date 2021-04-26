import { createSelector } from 'reselect'
import Permissions from 'security/permissions'
import authSelectors from 'modules/auth/authSelectors'
import PermissionChecker from 'modules/auth/permissionChecker'

const selectPermissionToRead = createSelector(
  [ authSelectors.selectCurrentUser ],
  currentUser =>
    new PermissionChecker(currentUser).match(Permissions.values.audioRead)
)

const selectPermissionToEdit = createSelector(
  [ authSelectors.selectCurrentUser ],
  currentUser =>
    new PermissionChecker(currentUser).match(Permissions.values.audioEdit)
)

const selectPermissionToCreate = createSelector(
  [ authSelectors.selectCurrentUser ],
  currentUser =>
    new PermissionChecker(currentUser).match(Permissions.values.audioCreate)
)

const selectPermissionToImport = createSelector(
  [ authSelectors.selectCurrentUser ],
  currentUser =>
    new PermissionChecker(currentUser).match(Permissions.values.audioImport)
)

const selectPermissionToDestroy = createSelector(
  [ authSelectors.selectCurrentUser ],
  currentUser =>
    new PermissionChecker(currentUser).match(Permissions.values.audioDestroy)
)

const selectors = {
  selectPermissionToRead,
  selectPermissionToEdit,
  selectPermissionToCreate,
  selectPermissionToDestroy,
  selectPermissionToImport
}

export default selectors
