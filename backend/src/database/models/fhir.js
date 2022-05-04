const database = require('../database');
const Schema = database.Schema;

const Coding =
{
    system: {
        type: String,
        required: false,
    },
    display: {
        type: String,
        required: true,
    },
};
const CodingSchema = new Schema(Coding, {
    _id: false
});

const Code =
{
    system: {
        type: CodingSchema,
        required: false,
    },
    text: {
        type: String,
        required: true,
    },
};
const CodeSchema = new Schema(Code, {
    _id: false
});

const Reference =
{
    reference: {
        type: String,
        required: false,
    },
    display: {
        type: String,
        required: false,
    },
};
const ReferenceSchema = new Schema(Reference, {
    _id: false
});

const Subject =
{
    reference: {
        type: ReferenceSchema,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    display: {
        type: String,
        required: false,
    },
};
const SubjectSchema = new Schema(Subject, {
    _id: false
});

const EffectivePeriod =
{
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
};
const EffectivePeriodSchema = new Schema(EffectivePeriod, {
    _id: false
});

const Device =
{
    display: {
        type: String,
        required: false,
    },
};
const DeviceSchema = new Schema(Device, {
    _id: false
});

const DerivedFrom =
{
    references: [{
        type: ReferenceSchema,
        required: false,
    }],
};
const DerivedFromSchema = new Schema(DerivedFrom, {
    _id: false
});

const Observation =
{
    resourceType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    code: {
        type: CodeSchema,
        required: false,
    },
    subject: {
        type: SubjectSchema,
        required: false,
    },
    effectivePeriod: {
        type: EffectivePeriodSchema,
        required: false,
    },
    device: {
        type: DeviceSchema,
        required: false,
    },
    valueString: {
        type: Number,
        min: 0
    },
    derivedFrom: {
        type: DerivedFromSchema,
        required: false,
    },
};
const ObservationSchema = new Schema(Observation, {
    _id: false
});

module.exports = {CodingSchema, CodeSchema, ReferenceSchema, 
    SubjectSchema, EffectivePeriodSchema, DeviceSchema, 
    DerivedFromSchema, ObservationSchema};