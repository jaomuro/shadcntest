import { z } from 'zod'


const IncidentImpactDetails = z.object({
    impactType: z.string(),
    affectedNumber: z.number()
})

const CustomersImpact = z.object({
    broadBand: IncidentImpactDetails,
    b2b: IncidentImpactDetails,
    itx: IncidentImpactDetails,
    provider: IncidentImpactDetails,
})

const AffectedPon = z.object({
    ponNumber: z.number(),
    isTotalAffected: z.boolean()
})

const AffectedAcessNetwork = z.object({
    lamNumber: z.number(),
    affectedPon: z.array(AffectedPon)
})

const TimeDetails = z.object({
    incidentRealStart: z.date(),
    incidentConfirmationTime: z.date(),
    incidentEnd: z.date().nullable(),
    initialForecast: z.date().nullable(),
    updatedForecast: z.date().nullable(),
});

const ReportDetails = z.object({
    reportState: z.string(),
    newReport: z.string(),
    reportTime: z.date(),
    restrictedInfo: z.boolean(),
    nocOperator: z.string()
})

const IncidenteAnalysis = z.object({
    rootcause: z.string(),
    rfoDescription: z.string()
})

const CarrierInformation = z.object({
    responsibleCarrier: z.string(),
    carrierCircuitDesignation: z.string(),
    carrierProtocol: z.array(z.string()),
    carrierAttendant: z.string()
})

const NetworkIntervention = z.object({
    info: z.string(),
    infoTime: z.date()
})

const IncidentReportSchema = z.object({
    informTitle: z.string(),              // Titulo do incidente - antes de encaminhar para o backend de acordo com as informações recebidas no form
    protocolNumber: z.string(),            // Protocolo do chamado MK - NÃO VAI PARA O BACKEND E INICIALIZA LÁ COMO NULL
    nocOperator: z.string(),                // Adicionado antes de encaminhar para o backend pelo contexto do usuário logado
    engineeringTeam: z.array(z.string()),   // via form
    incidentType: z.string(),               //via form
    offenderType: z.string(),               //via form
    circuitDesignation: z.string(),          //via form
    customersImpact: z.array(CustomersImpact),  // [{}, {}, {}]  //via form apenas na atualização de chamado
    affectedRegions: z.array(z.string()),   // via form

    affectedAcessNetwork: z.array(AffectedAcessNetwork), // via form caso seja escolhido o tipo de falha de R.A
    timeDetails: TimeDetails, //via form incidentEnd e updatedForecast vão null
    reportInitial: ReportDetails, // antes de encaminhar para o backend será montado de acordo com as informações recebidas no form
    reports: z.array(ReportDetails), //via form de atualização apenas
    incidenteAnalysis: IncidenteAnalysis, // via atualização apenas 
    carrierInformation: CarrierInformation, // via atualização apenas
    networkingIntervenction: z.array(NetworkIntervention) //via atualização apenas
})

type IncidentReportType = z.infer<typeof IncidentReportSchema>