import { createSelector } from 'reselect'
import Permissions from 'security/permissions'
import authSelectors from 'modules/auth/authSelectors'
import PermissionChecker from 'modules/auth/permissionChecker'

const selectPermissionToRead = createSelector(
  [ authSelectors.selectCurrentUser ],
  currentUser =>
    new PermissionChecker(currentUser).match(Permissions.values.videoRead)
)

const selectPermissionToEdit = createSelector(
  [ authSelectors.selectCurrentUser ],
  currentUser =>
    new PermissionChecker(currentUser).match(Permissions.values.videoEdit)
)

const selectPermissionToCreate = createSelector(
  [ authSelectors.selectCurrentUser ],
  currentUser =>
    new PermissionChecker(currentUser).match(Permissions.values.videoCreate)
)

const selectPermissionToImport = createSelector(
  [ authSelectors.selectCurrentUser ],
  currentUser =>
    new PermissionChecker(currentUser).match(Permissions.values.videoImport)
)

const selectPermissionToDestroy = createSelector(
  [ authSelectors.selectCurrentUser ],
  currentUser =>
    new PermissionChecker(currentUser).match(Permissions.values.videoDestroy)
)

const selectors = {
  selectPermissionToRead,
  selectPermissionToEdit,
  selectPermissionToCreate,
  selectPermissionToDestroy,
  selectPermissionToImport
}

export default selectors
