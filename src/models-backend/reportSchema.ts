const reportShema =[
    {
        informTitle: { type: String, default: null },
        protocolNumber: {
          type: String,
          match: [
            /^[0-9]{4}\.[0-9]+$/,
            "O protocolo não está no formato válido. Deve ser: 4 números, ponto, pelo menos 1 número após o ponto.",
          ],
          index: true,
          default: null,
        },
        nocOperator: { type: String, default: null },
        engineeringTeam: { type: String, default: null },
        incidentType: { type: String, default: null },
        offenderType: { type: String, default: null },
        circuitDesignation: { type: String, default: null },
        impactType: { type: String, default: null },
        affectedRegions: {
          type: [{ type: String, default: null }],
          default: [null],
        },
        affectedAcessNetwork: {
          type: [
            {
              lamNumber: { type: Number, default: null },
              affectedPon: [
                {
                  ponNumber: { type: Number, default: null },
                  isTotalAffected: { type: Boolean, default: null },
                },
              ],
            },
          ],
          default: [
            {
              lamNumber: null,
              affectedPon: [
                {
                  ponNumber: null,
                  isTotalAffected: null,
                },
              ],
            },
          ],
        },
        timeDetails: {
          incidentStart: { type: Date, required: true },
          incidentConfirmationTime: { type: Date, required: true },
          incidentEnd: { type: Date, default: null },
          initialForecast: { type: Date, default: null },
          updatedForecast: { type: Date, default: null },
        },
        reports: {
          initialReport: { type: String, default: null },
          reportUpdates: [
            {
              newReport: { type: String, default: null },
              reportTime: { type: Date, default: null },
              restrictedInfo: { type: Boolean, default: null },
            },
          ],
        },
        incidentAnalysis: {
          rfoDescription: { type: String, default: null },
          rootCause: { type: String, default: null },
        },
        impactMetrics: {
          broadBand: {
            affected: { type: Boolean, default: null },
            affectedNumber: { type: Number, default: null },
          },
          b2b: {
            affected: { type: Boolean, default: null },
            affectedNumber: { type: Number, default: null },
          },
          itx: {
            affected: { type: Boolean, default: null },
            affectedNumber: { type: Number, default: null },
          },
          provider: {
            affected: { type: Boolean, default: null },
            affectedNumber: { type: Number, default: null },
          },
          severity: { type: String, default: null },
          totalAffectedCustomers: { type: Number, default: null },
        },
        carrierInformation: {
          responsibleCarrier: { type: String, default: null },
          carrierCircuit: { type: String, default: null },
          carrierProtocol: { type: String, default: null },
          carrierAttendant: { type: String, default: null },
        },
        networkintervention: { type: String, default: null },
        stats: { type: Boolean, default: null },
      },
      {
        timestamps: true,
      }
]