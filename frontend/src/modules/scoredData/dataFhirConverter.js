export default class DataFhirConverter {

    /**
     * A proprietary converter class used to bridge the scoredData model
     * of the front-end with a HL7 FHIR specified model.
     * This is a temporary solution and is not sustainable!
     * 
     */

     static wearableDataToFhir(wearableDataJSON) {
        console.log("--- wearableDataJSON ---");
        console.log(wearableDataJSON);

        const fhirJSON = { 
            resourceType: 'Observation',
            status: 'final',
            code : {
                coding: {
                    system: null,
                    display: wearableDataJSON.dataType,
                },
            text: 'A proprietary stress score derived from analysed wearable sensor data'
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
            device : {
                display: 'Empatica E4'
            },
            valueString: wearableDataJSON.score,
            derivedFrom: {
                references: [
                    {
                        reference: wearableDataJSON.dataId,
                        text: 'Reference to EDA raw data ID in database'
                    },
                    {
                        reference: wearableDataJSON.dataId,
                        text: 'Reference to ST raw data ID in database'
                    }
                ]
            }
        };
        return fhirJSON;
    }

    static scoredDataToFhir(scoredDataJSON) {
        console.log("--- scoredDataToFhir ---");
        console.log(scoredDataJSON);

        const fhirJSON = { 
            resourceType: 'Observation',
            status: 'final',
            code : {
                coding: {
                    system: null,
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
            device : {
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
        };
        return fhirJSON;
    }

    static fhirToScoredData(fhirDataJSON) {
        console.log("--- fhirToScoredData ---");
        console.log(fhirDataJSON);

        const scoredDataJSON = {

        };
        return scoredDataJSON;
    }

}