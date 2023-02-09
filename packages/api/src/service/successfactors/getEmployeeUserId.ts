import { Logger } from "@acme/logger";
import { TRPCError } from "@trpc/server";
import { getAccessToken, getAsseration } from "../successfactors";
import { baseUrlAPI } from "./config";
import axios from "axios";

export type RequestInput = {
    personIdExternal?: string | undefined
};

export interface GetEmployeeInformationOutput {
    d: D;
}

export interface D {
    results: Result[];
}

export interface Result {
    __metadata: Metadata;
    userId: string;
}

export interface Metadata {
    uri: string;
    type: string;
}


export const getEmployeeUserId = async ({
    personIdExternal,
}: RequestInput): Promise<GetEmployeeInformationOutput> => {
    try {
        if (!personIdExternal) throw new TRPCError({
            code: "BAD_REQUEST",
        });
        const assertion = await getAsseration();
        const token = await getAccessToken({ assertion });

        const params = new URLSearchParams({
            $top: "20",
            $filter: `personIdExternal eq '${personIdExternal}'`,
            $select: `userId`,
            $format: "JSON",
        });

        const entity = `EmpEmployment`;

        const newUrl = baseUrlAPI + `/${entity}?${params.toString()}`;
        const headers = { Authorization: `Bearer ${token.access_token}` };

        const res = await axios.get(newUrl, { headers });

        return res.data;
    } catch (error) {
        Logger.error("error", error);
        throw new TRPCError({
            code: "BAD_REQUEST",
        });
    }
};
