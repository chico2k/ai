import { getAccessToken, getAsseration } from "../successfactors";
import { baseUrlAPI } from "./config";
import axios from "axios";
import { Logger } from "@acme/logger";
import { TRPCError } from "@trpc/server";
import { getUserPhoto } from "./getUserPhoto";

export const getReports = async ({ userId }: { userId: string }) => {
    try {
        const assertion = await getAsseration();
        const token = await getAccessToken({ assertion });

        const params = new URLSearchParams({

        });

        const newUrl = baseUrlAPI + `/User(%27${userId}%27)/directReports?${params.toString()}`;
        const headers = { Authorization: `Bearer ${token.access_token}` };

        const { data } = await axios.get<Result>(newUrl, { headers });


        const userMetaRequest = data.d.results.map(async (user) => {
            console.log("user", user)
            const { d: { results } } = await getUserPhoto({ userId: user.userId });
            return {
                ...user,
                photo: results[0],
            };
        });
        return await Promise.all(userMetaRequest)


    } catch (error) {
        Logger.error("error", error);
        throw new TRPCError({
            code: "BAD_REQUEST",
        });
    }
};

export interface Result {
    d: D;
}

export interface D {
    results: User[];
}

export interface User {
    __metadata: Metadata;
    userId: string;
    salaryBudgetFinalSalaryPercentage: null;
    dateOfCurrentPosition: null | string;
    matrix1Label: null;
    salary: null | string;
    objective: string;
    ssn: null;
    state: string;
    issueComments: null;
    timeZone: string;
    defaultLocale: string;
    nationality: null | string;
    salaryBudgetLumpsumPercentage: null;
    sysCostOfSource: null;
    ethnicity: null | string;
    displayName: string;
    payGrade: null | string;
    nickname: null;
    email: string;
    salaryBudgetExtra2Percentage: null;
    stockBudgetOther1Amount: null;
    raiseProrating: null;
    sysStartingSalary: null;
    finalJobCode: null;
    lumpsum2Target: null;
    stockBudgetOptionAmount: null;
    country: string;
    lastModifiedDateTime: string;
    stockBudgetStockAmount: null;
    sciLastModified: string;
    criticalTalentComments: null;
    homePhone: null;
    veteranSeparated: boolean;
    stockBudgetOther2Amount: null;
    firstName: string;
    stockBudgetUnitAmount: null;
    salutation: string;
    impactOfLoss: null;
    benchStrength: null;
    sysSource: null;
    futureLeader: null;
    title: string;
    meritEffectiveDate: null;
    veteranProtected: boolean;
    lumpsumTarget: null;
    employeeClass: string;
    hireDate: string;
    matrix2Label: null | string;
    salaryLocal: null;
    citizenship: null | string;
    reasonForLeaving: null;
    riskOfLoss: null;
    location: string;
    reloComments: null;
    username: string;
    serviceDate: null;
    reviewFreq: null;
    salaryBudgetTotalRaisePercentage: null;
    jobCode: string;
    lastModifiedWithTZ: string;
    division: string;
    custom02: null;
    meritTarget: null;
    custom01: null | string;
    custom04: null;
    custom03: null;
    custom06: null;
    custom05: null | string;
    custom08: null;
    reloWilling: null;
    custom07: null;
    stockBudgetOther3Amount: null;
    custom09: null;
    onboardingId: null;
    fax: null;
    bonusBudgetAmount: null;
    salaryBudgetPromotionPercentage: null;
    dateOfPosition: null;
    finalJobFamily: null;
    teamMembersSize: number;
    compensationEligible: null;
    lastReviewDate: null;
    compensationStockEligible: null;
    businessPhone: string;
    status: string;
    lastName: string;
    gender: string;
    city: string;
    competency: string;
    businessSegment: null;
    compensationSalaryRateUnits: null | string;
    newToPosition: boolean;
    assignmentUUID: string;
    dateOfBirth: string;
    localCurrencyCode: null | string;
    jobLevel: null | string;
    custom11: null;
    defaultFullName: string;
    custom10: null;
    compensationReadOnly: null;
    custom13: null;
    custom12: null;
    custom15: null;
    custom14: null;
    veteranDisabled: boolean;
    totalTeamSize: string;
    married: boolean;
    cellPhone: null;
    veteranMedal: boolean;
    compensationSalaryRateType: null | string;
    zipCode: string;
    jobTitle: null | string;
    minority: boolean;
    suffix: null;
    matrixManaged: boolean;
    bonusTarget: null;
    addressLine1: string;
    jobFamily: null;
    jobRole: null;
    addressLine2: null;
    addressLine3: null;
    mi: null;
    potential: string;
    origHireDate: null | string;
    level: null;
    salaryBudgetMeritPercentage: null;
    salaryProrating: null;
    lastModified: string;
    promotionAmount: null;
    impactOfLossComments: null;
    empId: null | string;
    compensationSalaryEligible: null;
    department: string;
    isPrimaryAssignment: boolean;
    reloLocation: null;
    companyExitDate: null;
    seatingChart: null;
    finalJobRole: null;
    performance: string;
    compensationBonusEligible: null;
    keyPosition: boolean;
    salaryBudgetExtraPercentage: null;
    delegatorOfAutoDelegateConfigNav: ApproverOfAdvanceNav;
    secondManager: ApproverOfAdvanceNav;
    ethnicityNav: ApproverOfAdvanceNav;
    userOfApprenticeNav: ApproverOfAdvanceNav;
    incumbentOfPositionNav: ApproverOfAdvanceNav;
    userSysIdCopyOfItDeclarationNav: ApproverOfAdvanceNav;
    subjectUserIdOfAchievementNav: ApproverOfAdvanceNav;
    userIdOfExternalTimeRecordNav: ApproverOfAdvanceNav;
    usersSysIdOfEmployeeDataReplicationNotificationNav: ApproverOfAdvanceNav;
    signatureUserOfComplianceFormSignatureNav: ApproverOfAdvanceNav;
    cust_mngrRep1Ofcust_grievancesNav: ApproverOfAdvanceNav;
    workerIdOfBenefitsIntegrationRecurringInfoNav: ApproverOfAdvanceNav;
    nominatorIdOfSpotAwardNav: ApproverOfAdvanceNav;
    proxy: ApproverOfAdvanceNav;
    participantUserId1OfOnboardingMeetingEventNav: ApproverOfAdvanceNav;
    targetIdOfTimeManagementAlertNav: ApproverOfAdvanceNav;
    lastNudgedByOfONB2EquipmentActivityNav: ApproverOfAdvanceNav;
    matrixReports: ApproverOfAdvanceNav;
    cust_heardGrievanceOfcust_grievancesNav: ApproverOfAdvanceNav;
    userIdOfWorkScheduleNav: ApproverOfAdvanceNav;
    subjectUserOfONB2EquipmentActivityNav: ApproverOfAdvanceNav;
    userIdOfTimeCollectorNav: ApproverOfAdvanceNav;
    userIdOfSpotAwardNav: ApproverOfAdvanceNav;
    userIdOfEmployeeTimeGroupNav: ApproverOfAdvanceNav;
    codeOfRightToReturnNav: ApproverOfAdvanceNav;
    processorIdOfOnboardingCandidateInfoNav: ApproverOfAdvanceNav;
    workerIdOfBenefitsExceptionNav: ApproverOfAdvanceNav;
    benchStrengthNav: ApproverOfAdvanceNav;
    manager: ApproverOfAdvanceNav;
    userIdOfOnboardingCandidateInfoNav: ApproverOfAdvanceNav;
    userSysIdOfWorkOrderNav: ApproverOfAdvanceNav;
    impactOfLossNav: ApproverOfAdvanceNav;
    concurrentUserOfOnboardingCandidateInfoNav: ApproverOfAdvanceNav;
    externalCodeOfcust_RecruitInterviewJPNav: ApproverOfAdvanceNav;
    userIdOfAccrualCalculationBaseNav: ApproverOfAdvanceNav;
    userIdOfHRISChangeLogDataReplicationNav: ApproverOfAdvanceNav;
    workerIdOfBenefitEnrollmentNav: ApproverOfAdvanceNav;
    atsUserIdOfONB2ProcessTriggerNav: ApproverOfAdvanceNav;
    nominationNav: ApproverOfAdvanceNav;
    reasonForLeavingNav: ApproverOfAdvanceNav;
    userIdOfExternalTimeDataNav: ApproverOfAdvanceNav;
    lastNudgedByOfONB2BuddyActivityNav: ApproverOfAdvanceNav;
    workerIdOfBenefitEmployeeOptoutRequestsNav: ApproverOfAdvanceNav;
    customManager: ApproverOfAdvanceNav;
    managerOfONB2ProcessNav: ApproverOfAdvanceNav;
    workOrderOwnerIdOfWorkOrderNav: ApproverOfAdvanceNav;
    cust_attendGrievanceCommOfcust_grievancesNav: ApproverOfAdvanceNav;
    usersSysIdOfEmpCostDistributionNav: ApproverOfAdvanceNav;
    approverOfAdvanceNav: ApproverOfAdvanceNav;
    costCenterManagerOfFOCostCenterNav: ApproverOfAdvanceNav;
    sysSourceNav: ApproverOfAdvanceNav;
    secondReports: ApproverOfAdvanceNav;
    externalCodeOfcust_auth_signNav: ApproverOfAdvanceNav;
    menteeOfMentoringProgramMatchedParticipantNav: ApproverOfAdvanceNav;
    userSysIdOfOneTimeDeductionNav: ApproverOfAdvanceNav;
    userSysIdOfRecurringDeductionNav: ApproverOfAdvanceNav;
    workerOfPaymentInformationV3Nav: ApproverOfAdvanceNav;
    empInfo: ApproverOfAdvanceNav;
    usersSysIdOfSecondaryAssignmentsItemNav: ApproverOfAdvanceNav;
    userIdOfEmployeePayrollRunResultsNav: ApproverOfAdvanceNav;
    buddyUserOfONB2BuddyActivityNav: ApproverOfAdvanceNav;
    userIdOfTimeAccountNav: ApproverOfAdvanceNav;
    mentorOfMentoringProgramMatchedParticipantNav: ApproverOfAdvanceNav;
    userIdOfBudgetGroupNav: ApproverOfAdvanceNav;
    externalCodeOfSkillProfileNav: ApproverOfAdvanceNav;
    hrManagerIdOfOnboardingCandidateInfoNav: ApproverOfAdvanceNav;
    usersSysIdOfEmployeeDataReplicationElementNav: ApproverOfAdvanceNav;
    headOfUnitOfFODivisionNav: ApproverOfAdvanceNav;
    workerIdOfEmployeeDismissalProtectionNav: ApproverOfAdvanceNav;
    assignedAddSupervisorOfApprenticeNav: ApproverOfAdvanceNav;
    workerIdOfBenefitEventProcessingLogNav: ApproverOfAdvanceNav;
    assigneeUserIdOfDomainEventAlertNav: ApproverOfAdvanceNav;
    externalCodeOfcust_counselling_reqNav: ApproverOfAdvanceNav;
    reloWillingNav: ApproverOfAdvanceNav;
    customReports: ApproverOfAdvanceNav;
    delegateeOfAutoDelegateDetailNav: ApproverOfAdvanceNav;
    subjectUserOfAssignedComplianceFormNav: ApproverOfAdvanceNav;
    cust_unionRepOfcust_ProgressiveDisciplinaryActionNav: ApproverOfAdvanceNav;
    cust_mngrRep2Ofcust_grievancesNav: ApproverOfAdvanceNav;
    hr: ApproverOfAdvanceNav;
    headOfUnitOfFOBusinessUnitNav: ApproverOfAdvanceNav;
    workerIdOfBenefitEmployeeClaimNav: ApproverOfAdvanceNav;
    workerIdOfACAReportingInformationNav: ApproverOfAdvanceNav;
    userIdOfTimeAccountSnapshotNav: ApproverOfAdvanceNav;
    completedByOfComplianceProcessTaskNav: ApproverOfAdvanceNav;
    userIdOfTemporaryTimeInformationNav: ApproverOfAdvanceNav;
    rehireUserOfONB2ProcessTriggerNav: ApproverOfAdvanceNav;
    directReports: ApproverOfAdvanceNav;
    participantUserId2OfOnboardingMeetingEventNav: ApproverOfAdvanceNav;
    participantUserId3OfOnboardingMeetingEventNav: ApproverOfAdvanceNav;
    externalCodeOfcust_ProgressiveDisciplinaryActionNav: ApproverOfAdvanceNav;
    externalCodeOfcust_EmpLetterRequestNav: ApproverOfAdvanceNav;
    personKeyNav: ApproverOfAdvanceNav;
    usersSysIdOfEmployeeDataReplicationConfirmationNav: ApproverOfAdvanceNav;
    userIdOfEmployeeTimeSheetNav: ApproverOfAdvanceNav;
    userSysIdOfNonRecurringPaymentNav: ApproverOfAdvanceNav;
    declinedByOfComplianceDocumentFlowNav: ApproverOfAdvanceNav;
    competencyRatingNav: ApproverOfAdvanceNav;
    workerIdOfBenefitClaimAccumulationNav: ApproverOfAdvanceNav;
    workerIdOfBenefitProgramEnrollmentNav: ApproverOfAdvanceNav;
    userPermissionsNav: ApproverOfAdvanceNav;
    externalCodeOfcust_grievancesNav: ApproverOfAdvanceNav;
    subjectUserOfComplianceFormDataNav: ApproverOfAdvanceNav;
    auditUserSysIdOfOneTimeDeductionNav: ApproverOfAdvanceNav;
    responsibleUserOfAssignedComplianceFormNav: ApproverOfAdvanceNav;
    userOfONB2ProcessNav: ApproverOfAdvanceNav;
    subjectUserOfComplianceDocumentFlowNav: ApproverOfAdvanceNav;
    userOfOnboardingInfoNav: ApproverOfAdvanceNav;
    subjectUserIdOfActivityNav: ApproverOfAdvanceNav;
    userIdOfDataReplicationProxyNav: ApproverOfAdvanceNav;
    budgetHolderIdOfSpotAwardNav: ApproverOfAdvanceNav;
    employmentIdentityOfDRTMPurgeFreezeNav: ApproverOfAdvanceNav;
    matrixManager: ApproverOfAdvanceNav;
    externalCodeOfcust_voluntarySeparationRequestNav: ApproverOfAdvanceNav;
    salutationNav: ApproverOfAdvanceNav;
    userOfComplianceProcessNav: ApproverOfAdvanceNav;
    userIdOfEmployeeTimeNav: ApproverOfAdvanceNav;
    workerIdOfBenefitEnrollmentGroupNav: ApproverOfAdvanceNav;
    cust_unionRep2Ofcust_grievancesNav: ApproverOfAdvanceNav;
    contactEmployeeIdOfBenefitContactNav: ApproverOfAdvanceNav;
    eventPublishedByOfBenefitEventProcessingLogNav: ApproverOfAdvanceNav;
    userIdOfSpotAwardBudgetNav: ApproverOfAdvanceNav;
    completedByOfONB2ProcessTaskNav: ApproverOfAdvanceNav;
    managerIdOfOnboardingCandidateInfoNav: ApproverOfAdvanceNav;
    subjectUserOfONB2BuddyActivityNav: ApproverOfAdvanceNav;
    cust_unionRep1Ofcust_grievancesNav: ApproverOfAdvanceNav;
    headOfUnitOfFODepartmentNav: ApproverOfAdvanceNav;
    participantUserId4OfOnboardingMeetingEventNav: ApproverOfAdvanceNav;
    userIdOfSpotAwardRedemptionNav: ApproverOfAdvanceNav;
    hrReports: ApproverOfAdvanceNav;
    riskOfLossNav: ApproverOfAdvanceNav;
    subjectUserOfComplianceProcessTaskNav: ApproverOfAdvanceNav;
    participantUserId5OfOnboardingMeetingEventNav: ApproverOfAdvanceNav;
    ownerOfTalentPoolNav: ApproverOfAdvanceNav;
    subjectUserOfONB2DataCollectionUserConfigNav: ApproverOfAdvanceNav;
    passiveUserOfMentoringProgramMatchedParticipantNav: ApproverOfAdvanceNav;
    userIdOfPositionRightToReturnNav: ApproverOfAdvanceNav;
    decentralTrainerUserIdOfDepartmentApprenticeDetailNav: ApproverOfAdvanceNav;
    userSysIdOfAdvancesAccumulationNav: ApproverOfAdvanceNav;
    workerIdOfBenefitEmployeeLifeEventDeclarationFormNav: ApproverOfAdvanceNav;
    userSysIdOfItDeclarationNav: ApproverOfAdvanceNav;
    externalCodeOfcust_CommutingAllowanceNav: ApproverOfAdvanceNav;
    usersSysIdOfHireDateChangeNav: ApproverOfAdvanceNav;
}

export interface Metadata {
    uri: string;
    type: string;
}

export interface ApproverOfAdvanceNav {
    __deferred: Deferred;
}

export interface Deferred {
    uri: string;
}
