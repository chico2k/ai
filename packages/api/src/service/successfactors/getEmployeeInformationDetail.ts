import { Logger } from "@acme/logger";
import { TRPCError } from "@trpc/server";
import { getAccessToken, getAsseration } from "../successfactors";
import { baseUrlAPI } from "./config";
import axios from "axios";
import immer from "immer";

export type RequestInput = {
    personIdExternal: string;
    userId: string;
};

export interface GetEmployeeInformationDetailOuput {
    d: D;
}

export interface D {
    __metadata: Metadata;
    personIdExternal: string;
    userId: string;
    lastModifiedDateTime: string;
    serviceDate: string;
    endDate: null;
    bonusPayExpirationDate: null;
    createdDateTime: string;
    employmentId: string;
    isContingentWorker: boolean;
    initialOptionGrant: null;
    initialStockGrant: null;
    employeeFirstEmployment: null;
    eligibleForStock: null;
    eligibleForSalContinuation: null;
    okToRehire: null;
    assignmentIdExternal: string;
    professionalServiceDate: string;
    salaryEndDate: null;
    seniorityDate: string;
    startDate: string;
    hiringNotCompleted: boolean;
    isECRecord: boolean;
    prevEmployeeId: null;
    regretTermination: null;
    createdOn: string;
    lastDateWorked: null;
    firstDateWorked: string;
    originalStartDate: string;
    payrollEndDate: null;
    benefitsEligibilityStartDate: string;
    StockEndDate: null;
    benefitsEndDate: null;
    assignmentClass: string;
    lastModifiedBy: string;
    lastModifiedOn: string;
    createdBy: string;
    paymentInformationNav: Nav;
    photoNav: Nav;
    compInfoNav: Nav;
    onboardingInfoNav: Nav;
    empGlobalAssignmentNav: Nav;
    empJobRelationshipNav: Nav;
    personNav: Nav;
    empWorkPermitNav: Nav;
    workOrderNav: Nav;
    userNav: Nav;
    jobInfoNav: Nav
    wfRequestNav: Nav;
    costDistributionNav: Nav;
    empPayCompNonRecurringNav: Nav;
}

export interface Metadata {
    uri: string;
    type: string;
}

export interface Nav {
    __deferred: Deferred;
}

export interface Deferred {
    uri: string;
}

export interface JobInfoNavData {
    d: D;
}

export interface D {
    results: Result[];
}

export interface Result {
    __metadata: Metadata;
    seqNumber: string;
    userId: string;
    startDate: string;
    occupationalLevels: null;
    workscheduleCode: string;
    effectiveLatestChange: boolean;
    endDate: string;
    contractType: null;
    createdDateTime: string;
    jobCode: string;
    validFrom: null;
    fgtsDate: null;
    payScaleLevel: null;
    division: string;
    timeTypeProfileCode: string;
    eeoClass: null;
    probationaryPeriodMeasure: null;
    fromCurrency: null;
    eeo5JobCategory: string;
    flsaStatus: string;
    costCenter: string;
    residentVote: boolean;
    timeRecordingProfileCode: string;
    laborProtection: boolean;
    sickPaySupplementMeasure: null;
    exclExecutiveSector: boolean;
    isFulltimeEmployee: boolean;
    emplStatus: string;
    ineligibleStatutoryMinWage: boolean;
    guaranteedPayment: null;
    occupationGtm: null;
    occupationPer: null;
    payScaleType: string;
    countryOfCompany: string;
    eeo6JobCategory: string;
    createdOn: string;
    municipalInseeCode: null;
    creditForPreviousService: null;
    localJobTitle: null;
    healthRisk: boolean;
    dismissalsNoticePeriodForEmployer: null;
    timeRecordingAdmissibilityCode: string;
    fte: string;
    payGrade: string;
    travelDistance: null;
    event: string;
    timeRecordingVariant: string;
    calculationBase: null;
    assedicCertObjectNum: null;
    degreeOfProductivity: null;
    assessmentStatus: null;
    managerId: string;
    spclRuleNonManualWorker: boolean;
    customString13: null;
    lastModifiedOn: string;
    dynamicBreakConfigCode: null;
    workerCategory: null;
    defaultOvertimeCompensationVariant: string;
    contractDate: null;
    businessUnit: string;
    lastModifiedDateTime: string;
    notes: null;
    harmfulAgentExposure: null;
    jobTitle: string;
    probationaryPeriod: null;
    sickPaySupplement: null;
    electoralCollegeForWorksCouncil: null;
    codeOfJobForEldp: null;
    familyRelationshipWithEmployer: null;
    exchangeRate: null;
    workPermitExpiry: null;
    currentWageLevel: null;
    holidayCalendarCode: string;
    empRelationship: null;
    standardHours: string;
    contractNumber: null;
    electoralCollegeForWorkersRepresentatives: null;
    jobGroup: null;
    eeo4JobCategory: string;
    eventReason: string;
    isCompetitionClauseActive: boolean;
    assedicCertInitialStateNum: null;
    fgtsPercent: null;
    toCurrency: null;
    position: string;
    payScaleArea: string;
    probationPeriodEndDate: null;
    timezone: string;
    workingDaysPerWeek: string;
    regularTemp: string;
    workLocation: null;
    contractReferenceForAed: null;
    isSideLineJobAllowed: boolean;
    company: string;
    department: string;
    eeo1JobCategory: string;
    periodIndicator: null;
    employeeClass: string;
    employmentType: string;
    lastModifiedBy: string;
    customString3: null;
    customString2: null;
    customString8: null;
    customString7: null;
    payScaleGroup: null;
    employeeWorkgroupMembership: null;
    positionEntryDate: string;
    sickPaySupplementPeriod: null;
    createdBy: string;
    contractId: null;
    location: string;
    paymentInLieuOfNotice: boolean;
    eeo5JobCategoryNav: Nav;
    toCurrencyNav: Nav;
    holidayCalendarCodeNav: Nav;
    occupationalLevelsNav: Nav;
    companyNav: Nav;
    payScaleAreaNav: Nav;
    departmentNav: Nav;
    businessUnitNav: Nav;
    fromCurrencyNav: Nav;
    contractTypeNav: Nav;
    payScaleTypeNav: Nav;
    electoralCollegeForWorkersRepresentativesNav: Nav;
    employeeWorkgroupMembershipNav: Nav;
    customString7Nav: Nav;
    costCenterNav: Nav;
    harmfulAgentExposureNav: Nav;
    flsaStatusNav: Nav;
    employmentTypeNav: Nav;
    userNav: Nav;
    customString13Nav: Nav;
    payScaleGroupNav: Nav;
    timeTypeProfileCodeNav: Nav;
    electoralCollegeForWorksCouncilNav: Nav;
    divisionNav: Nav;
    eeo6JobCategoryNav: Nav;
    eeoClassNav: Nav;
    workscheduleCodeNav: Nav;
    sickPaySupplementNav: Nav;
    employmentNav: Nav;
    eeo4JobCategoryNav: Nav;
    periodIndicatorNav: Nav;
    workerCategoryNav: Nav;
    countryOfCompanyNav: Nav;
    probationaryPeriodMeasureNav: Nav;
    occupationPerNav: Nav;
    codeOfJobForEldpNav: Nav;
    managerEmploymentNav: Nav;
    assessmentStatusNav: Nav;
    customString8Nav: Nav;
    familyRelationshipWithEmployerNav: Nav;
    eventNav: Nav;
    managerUserNav: Nav;
    jobGroupNav: Nav;
    locationNav: Nav;
    payScaleLevelNav: Nav;
    occupationGtmNav: Nav;
    regularTempNav: Nav;
    eventReasonNav: Nav;
    employeeClassNav: Nav;
    jobCodeNav: Nav;
    dismissalsNoticePeriodForEmployerNav: Nav;
    sickPaySupplementMeasureNav: Nav;
    emplStatusNav: Nav;
    positionNav: Nav;
    wfRequestNav: Nav;
    eeo1JobCategoryNav: Nav;
    empRelationshipNav: Nav;
    payGradeNav: Nav;
}

export interface Metadata {
    uri: string;
    type: string;
}

export interface Nav {
    __deferred: Deferred;
}

export interface Deferred {
    uri: string;
}

export const getEmployeeInformationDetail = async ({
    personIdExternal,
    userId,
}: RequestInput): Promise<GetEmployeeInformationDetailOuput> => {
    try {
        const assertion = await getAsseration();
        const token = await getAccessToken({ assertion });

        const entity = `/EmpEmployment(personIdExternal=%27${personIdExternal}%27,userId=%27${userId}%27)`;

        const newUrl = baseUrlAPI + entity;

        const headers = { Authorization: `Bearer ${token.access_token}` };

        const res = await axios.get<GetEmployeeInformationDetailOuput>(newUrl, {
            headers,
        });

        const { data: jobInfoNavData } = await axios.get<JobInfoNavData>(
            res.data.d.jobInfoNav.__deferred.uri,
            { headers },
        );

        const { data: companyInfoNav } = await axios.get(
            jobInfoNavData.d.results[0]?.companyNav.__deferred.uri as string,
            { headers },
        );

        console.log("companyInfoNav", companyInfoNav)

        const all = immer(res.data, (draft: FinalType) => {
            draft.d["jobInfo"] = jobInfoNavData.d.results
        });

        return all;
    } catch (error) {
        Logger.error("error", error);
        throw new TRPCError({
            code: "BAD_REQUEST",
        });
    }
};

type navigation = {
    "jobInfo": Result[]
}

type FinalType = {
    d: navigation & D
} 