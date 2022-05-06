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
    coding: {
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

const SimpleQuantity =
{
    value: {
        type: String,
        required: false,
    },
};
const SimpleQuantitySchema = new Schema(SimpleQuantity, {
    _id: false
});

const ValueSampledData =
{
    origin: {
        type: SimpleQuantitySchema,
        required: false,
    },
    period: {
        type: Number,
        required: false,
    },
    dimensions: {
        type: Number,
        required: false,
    },
    data: [{
        type: String,
        required: false,
    }],
};
const ValueSampledDataSchema = new Schema(ValueSampledData, {
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
    valueSampledData: {
        type: ValueSampledDataSchema,
        required: false,
    },
    valueString: {
        type: Number,
        min: 0,
        required: false,
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
    DerivedFromSchema, SimpleQuantitySchema, ValueSampledDataSchema, 
    ObservationSchema};