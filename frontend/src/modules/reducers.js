import { connectRouter } from 'connected-react-router'
import layout from 'modules/layout/layoutReducers'
import auth from 'modules/auth/authReducers'
import iam from 'modules/iam/iamReducers'
import auditLog from 'modules/auditLog/auditLogReducers'
import settings from 'modules/settings/settingsReducers'
import patient from 'modules/patient/patientReducers'
import cased from 'modules/cased/casedReducers'
import module from 'modules/module/moduleReducers'
import task from 'modules/task/taskReducers'
import audio from 'modules/audio/audioReducers'
import video from 'modules/video/videoReducers'
import record from 'modules/record/recordReducers'
import document from 'modules/document/documentReducers'
import roadmap from 'modules/roadmap/roadmapReducers'
import { combineReducers } from 'redux'

export default history =>
  combineReducers({
    router: connectRouter(history),
    layout,
    auth,
    iam,
    auditLog,
    settings,
    patient,
    cased,
    module,
    task,
    audio,
    video,
    record,
    document,
    roadmap
  })
