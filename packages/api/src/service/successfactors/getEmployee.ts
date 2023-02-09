import { getAccessToken, getAsseration } from "../successfactors";
import { baseUrlAPI } from "./config";
import axios from "axios";
import { Logger } from "@acme/logger";
import { TRPCError } from "@trpc/server";

export interface GetEmployeeOutput {
    d: D;
}

export interface D {
    results: Result[];
}

export interface Result {
    __metadata: Metadata;
    personIdExternal: string;
    firstName: string;
    lastName: string;
}

export interface Metadata {
    uri: string;
    type: string;
}

export const getEmployee = async ({
    firstName,
    lastName,
}: {
    firstName: string;
    lastName: string;
}) => {
    // Placeholder
    firstName;
    lastName;

    const assertion = await getAsseration();
    const token = await getAccessToken({ assertion });
    try {
        const params = new URLSearchParams({
            $top: "20",
            $filter: "firstName eq 'Charles'",
            $select: `firstName,lastName,personIdExternal`,
        });
        const newUrl = baseUrlAPI + `/PerPersonal?${params.toString()}`;
        const headers = { Authorization: `Bearer ${token.access_token}` };

        const { data } = await axios.get<GetEmployeeOutput>(newUrl, { headers });

        return data;
    } catch (error) {
        Logger.error("error", error);
        throw new TRPCError({
            code: "BAD_REQUEST",
        });
    }
};
