import * as z from "zod";

const RaceSchema = z.enum(["White", "Asian", "Black", "Unknown"]);

const SexSchema = z.enum(["Male", "Female"]);
const ECOGPerformanceStatusSchema = z.enum(["Zero", "One", "Two"]);
const RISSDiseaseStageSchema = z.enum(["Unknown", "One", "Two", "Three"]);
const CytogeneticRiskSchema = z.enum(["Standard", "High", "Unknown"]);
const ExposureStatusSchema = z.enum(["TripleClass", "PentaDrug"]);
const RefractoryStatusSchema = z.enum(["TripleClass", "PentaDrug"]);
const DiscontuationRationaleSchema = z
	.enum([
		"ProgressiveDisease",
		"AE",
		"Death",
		"PatientWithdrawal",
		"LackOfEfficacy",
		"None",
	])
	.default("None");

const ObjectiveResponseRatePerBICRSchema = z
	.enum([
		"StringentCompleteResponse",
		"CompleteResponse",
		"VeryGoodPartialResponse",
		"PatialResponse",
		"MinimalResponse",
	])
	.default("MinimalResponse");

const TreatmentEventSchema = z.enum([
	"EotDueToAe",
	"EotDueToOther",
	"EotDueToPd",
	"Death",
	"ConfirmedPd",
]);

const PatientSchema = z.object({
	id: z.number(),
	age: z.number(),
	race: RaceSchema,
	sex: SexSchema,
	ecog_performance_status: ECOGPerformanceStatusSchema,
	r_iss_disease_stage: RISSDiseaseStageSchema,
	cytogenetic_risk: CytogeneticRiskSchema,
	extramedullary_disease_by_bicr: z.boolean(),
	bone_marrow_plasma_cells: z.number(),
	prior_lines_of_therapy: z.number(),
	prior_stem_cell_transplant: z.boolean(),
	exposure_status: ExposureStatusSchema,
	refractory_status: RefractoryStatusSchema,
	refractory_to_last_line_of_therapy: z.boolean(),
	treatment_length: z.number(),
	discontinuation_rationale: DiscontuationRationaleSchema,
	objective_response_rate_per_bicr: ObjectiveResponseRatePerBICRSchema,
});

const PatientsResponseSchema = z.object({
	patients: z.array(PatientSchema),
});

type Race = z.infer<typeof RaceSchema>;
type Sex = z.infer<typeof SexSchema>;
type ECOGPerformanceStatus = z.infer<typeof ECOGPerformanceStatusSchema>;
type RISSDiseaseStage = z.infer<typeof RISSDiseaseStageSchema>;
type CytogeneticRisk = z.infer<typeof CytogeneticRiskSchema>;
type ExposureStatus = z.infer<typeof ExposureStatusSchema>;
type RefractoryStatus = z.infer<typeof RefractoryStatusSchema>;
type DiscontuationRationale = z.infer<typeof DiscontuationRationaleSchema>;
type ObjectiveResponseRatePerBICR = z.infer<
	typeof ObjectiveResponseRatePerBICRSchema
>;
type Patient = z.infer<typeof PatientSchema>;
type PatientsResponse = z.infer<typeof PatientsResponseSchema>;
type TreatmentEvent = z.infer<typeof TreatmentEventSchema>;
///

type PatientResponseTimeline = Array<{
	time: number;
	response: ObjectiveResponseRatePerBICR;
}>;
type PatientEventsTimeline = Array<{
	time: number;
	event: TreatmentEvent;
}>;

type AggregatedPatientTimeline = {
	time: number;
	activeResponsePercentage: number;
	progressionFreeSurvivalPercentage: number;
	overalSurvivalPercentage: number;
};

export type {
	AggregatedPatientTimeline,
	CytogeneticRisk,
	DiscontuationRationale,
	ECOGPerformanceStatus,
	ExposureStatus,
	ObjectiveResponseRatePerBICR,
	Patient,
	PatientEventsTimeline,
	PatientResponseTimeline,
	PatientsResponse,
	RISSDiseaseStage,
	Race,
	RefractoryStatus,
	Sex,
	TreatmentEvent,
};

export {
	CytogeneticRiskSchema,
	DiscontuationRationaleSchema,
	ECOGPerformanceStatusSchema,
	ExposureStatusSchema,
	ObjectiveResponseRatePerBICRSchema,
	PatientSchema,
	PatientsResponseSchema,
	RISSDiseaseStageSchema,
	RaceSchema,
	RefractoryStatusSchema,
	SexSchema,
};
