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
    affectedRegions: z.array(z.string()),   // via f

    affectedAcessNetwork: z.array(AffectedAcessNetwork),
    timeDetails: TimeDetails,
    reportInitial: ReportDetails,
    reports: z.array(ReportDetails),
    incidenteAnalysis: IncidenteAnalysis,
    carrierInformation: CarrierInformation,
    networkingIntervenction: z.array(NetworkIntervention)
})

type IncidentReportType = z.infer<typeof IncidentReportSchema>