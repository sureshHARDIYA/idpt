export default class DataFhirConverter {

    /**
     * A proprietary converter class used to bridge the scoredData model
     * of the front-end with a HL7 FHIR specified model.
     * This is a temporary solution and is not sustainable!
     * 
     */

     static wearableDataToFhir(wearableDataJSON, dataTypeText) {
        console.log("--- wearableDataJSON ---");
        console.log(wearableDataJSON);

        const fhirJSON = {
            fhir: {
                resourceType: 'Observation',
                status: 'final',
                code : {
                    coding: {
                        system: null,
                        display: wearableDataJSON.dataType,
                    },
                    text: dataTypeText
                },
                subject: {
                    reference: {
                        reference: wearableDataJSON.patientId
                    },
                    type: 'Patient',
                    display: wearableDataJSON.patientName
                },
                effectivePeriod: {
                    start: wearableDataJSON.timeStart,
                    end: wearableDataJSON.timeEnd
                },
                device: {
                    display: 'Empatica E4'
                },
                valueSampledData: {
                    origin: {
                        value: wearableDataJSON.id
                    },
                    period: 1000 / wearableDataJSON.frequency,
                    dimensions: 1,
                    data: wearableDataJSON.data
                }
            }
        };
        return fhirJSON;
    }

    static scoredDataToFhir(scoredDataJSON) {
        console.log("--- scoredDataToFhir ---");
        console.log(scoredDataJSON);

        const fhirJSON = {
            id: scoredDataJSON.id,
            fhir: { 
                resourceType: 'Observation',
                status: 'final',
                code : {
                    coding: {
                        system: undefined,
                        display: scoredDataJSON.dataType,
                    },
                    text: 'A proprietary stress score derived from analysed wearable sensor data'
                },
                subject: {
                    reference: {
                        reference: scoredDataJSON.patientId
                    },
                    type: 'Patient',
                    display: scoredDataJSON.patientName
                },
                effectivePeriod: {
                    start: scoredDataJSON.timeStart,
                    end: scoredDataJSON.timeEnd
                },
                device: {
                    display: 'Empatica E4'
                },
                valueString: scoredDataJSON.score,
                derivedFrom: {
                    references: [
                        {
                            reference: scoredDataJSON.dataId,
                            text: 'Reference to EDA raw data ID in database'
                        },
                        {
                            reference: scoredDataJSON.dataId,
                            text: 'Reference to ST raw data ID in database'
                        }
                    ]
                }
            }
        };
        return fhirJSON;
    }

    static fhirToScoredData(fhirDataJSON) {
        console.log("--- fhirToScoredData ---");
        console.log(fhirDataJSON);

        const scoredDataJSON = {
            id: fhirDataJSON.id,
            score: fhirDataJSON.fhir.valueString,
            dataType: fhirDataJSON.fhir.code.coding.display,
            timeStart: fhirDataJSON.fhir.effectivePeriod.start,
            timeEnd: fhirDataJSON.fhir.effectivePeriod.end,
            patientName: fhirDataJSON.fhir.subject.display,
            patientId: fhirDataJSON.fhir.subject.reference.reference,
            dataId: fhirDataJSON.fhir.derivedFrom.references
        };
        return scoredDataJSON;
    }

}