import { combineReducers } from 'redux'
import iam from 'modules/iam/iamReducers'
import task from 'modules/task/taskReducers'
import empatica from 'modules/empatica/empaticaReducers'
import auth from 'modules/auth/authReducers'
import epic from 'modules/epic/epicReducers'
import audio from 'modules/audio/audioReducers'
import cased from 'modules/cased/casedReducers'
import video from 'modules/video/videoReducers'
import module from 'modules/module/moduleReducers'
import layout from 'modules/layout/layoutReducers'
import record from 'modules/record/recordReducers'
import patient from 'modules/patient/patientReducers'
import roadmap from 'modules/roadmap/roadmapReducers'
import { connectRouter } from 'connected-react-router'
import settings from 'modules/settings/settingsReducers'
import auditLog from 'modules/auditLog/auditLogReducers'
import document from 'modules/document/documentReducers'
import taxonomy from 'modules/taxonomy/taxonomyReducers'
import assignments from 'modules/assignments/assignmentsReducers'
import assignmentResponse from 'modules/assignmentResponse/assignmentResponseReducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    layout,
    auth,
    iam,
    epic,
    auditLog,
    settings,
    patient,
    cased,
    module,
    task,
    empatica,
    audio,
    video,
    record,
    document,
    assignments,
    roadmap,
    taxonomy,
    assignmentResponse
  })
