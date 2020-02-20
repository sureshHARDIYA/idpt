const database = require('../database');
const Schema = database.Schema;

/**
 * Audit Log database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const AuditLogSchema = new Schema(
  {
    entityName: {
      type: String,
      maxlength: 255,
      required: true,
    },
    entityId: {
      type: String,
      maxlength: 255,
      required: true,
    },
    action: {
      type: String,
      maxlength: 255,
      required: true,
    },
    createdById: { type: String, maxlength: 255 },
    createdByEmail: { type: String, maxlength: 255 },
    timestamp: { type: Date, required: true },
    values: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

AuditLogSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

AuditLogSchema.set('toJSON', {
  getters: true,
});

AuditLogSchema.set('toObject', {
  getters: true,
});

const AuditLog = database.model('auditLog', AuditLogSchema);

module.exports = AuditLog;
