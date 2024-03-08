

interface form {
    nocOperator: string
    engineeringTeam: string //voltar
    incidentType: string
    offenderType: string
    circuitDesignation: string
    impactType: string
    affectedRegions: [string]
    affectedAcessNetwork: [
        {   lamNumber: string,
            affectedPon: [{ponNumber: string, isTotalAffected: boolean}]
        }
    ]
    timeDetails: {
        incidentStart: Date
        incidentConfirmationTime: Date
        incidentEnd: Date
        initialForecast: Date
        updatedForecast: Date
    }
    impactMetrics: {
        
    }
}   