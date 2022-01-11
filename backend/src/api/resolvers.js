/**
 * Maps all the Resolvers of the application.
 * More about resolvers: https://www.apollographql.com/docs/graphql-tools/resolvers/
 */

const mergeResolvers = require('./shared/utils/mergeGraphqlResolvers')

const sharedTypes = require('./shared/types')

const settingsTypes = require('./settings/types')
const settingsQueries = require('./settings/queries')
const settingsMutations = require('./settings/mutations')

const authTypes = require('./auth/types')
const authQueries = require('./auth/queries')
const authMutations = require('./auth/mutations')

const iamTypes = require('./iam/types')
const iamQueries = require('./iam/queries')
const iamMutations = require('./iam/mutations')

const auditLogTypes = require('./auditLog/types')
const auditLogQueries = require('./auditLog/queries')
const auditLogMutations = require('./auditLog/mutations')

const patientTypes = require('./patient/types')
const patientQueries = require('./patient/queries')
const patientMutations = require('./patient/mutations')

const casedTypes = require('./cased/types')
const casedQueries = require('./cased/queries')
const casedMutations = require('./cased/mutations')

const moduleTypes = require('./module/types')
const moduleQueries = require('./module/queries')
const moduleMutations = require('./module/mutations')

const taskTypes = require('./task/types')
const taskQueries = require('./task/queries')
const taskMutations = require('./task/mutations')

const empaticaTypes = require('./empatica/types')
const empaticaQueries = require('./empatica/queries')
const empaticaMutations = require('./empatica/mutations')

const bioAnalyzedTypes = require('./bioAnalyzed/types')
const bioAnalyzedQueries = require('./bioAnalyzed/queries')
const bioAnalyzedMutations = require('./bioAnalyzed/mutations')

const recordTypes = require('./record/types')
const recordQueries = require('./record/queries')
const recordMutations = require('./record/mutations')

const roadmapTypes = require('./roadmap/types')
const roadmapQueries = require('./roadmap/queries')
const roadmapMutations = require('./roadmap/mutations')

const epicTypes = require('./epic/types')
const epicQueries = require('./epic/queries')
const epicMutations = require('./epic/mutations')

const assignmentTypes = require('./assignments/types')
const assignmentQueries = require('./assignments/queries')
const assignmentMutations = require('./assignments/mutations')

const assignmentResponseTypes = require('./assignmentResponse/types')
const assignmentResponseQueries = require('./assignmentResponse/queries')
const assignmentResponseMutations = require('./assignmentResponse/mutations')

const taxonomyTypes = require('./taxonomy/types')
const taxonomyQueries = require('./taxonomy/queries')
const taxonomyMutations = require('./taxonomy/mutations')

const types = [
  ...sharedTypes,
  ...iamTypes,
  ...authTypes,
  ...auditLogTypes,
  ...settingsTypes,
  ...patientTypes,
  ...casedTypes,
  ...moduleTypes,
  ...taskTypes,
  ...empaticaTypes,
  ...bioAnalyzedTypes,
  ...recordTypes,
  ...roadmapTypes,
  ...epicTypes,
  ...assignmentTypes,
  ...taxonomyTypes,
  ...assignmentResponseTypes
].map(type => type.resolver)

const queries = [
  ...iamQueries,
  ...authQueries,
  ...auditLogQueries,
  ...settingsQueries,
  ...patientQueries,
  ...casedQueries,
  ...moduleQueries,
  ...taskQueries,
  ...empaticaQueries,
  ...bioAnalyzedQueries,
  ...recordQueries,
  ...roadmapQueries,
  ...epicQueries,
  ...assignmentQueries,
  ...taxonomyQueries,
  ...assignmentResponseQueries
].map(query => query.resolver)

const mutations = [
  ...iamMutations,
  ...authMutations,
  ...auditLogMutations,
  ...settingsMutations,
  ...patientMutations,
  ...casedMutations,
  ...moduleMutations,
  ...taskMutations,
  ...empaticaMutations,
  ...bioAnalyzedMutations,
  ...recordMutations,
  ...roadmapMutations,
  ...epicMutations,
  ...assignmentMutations,
  ...taxonomyMutations,
  ...assignmentResponseMutations
].map(mutation => mutation.resolver)

module.exports = mergeResolvers(types, queries, mutations)
