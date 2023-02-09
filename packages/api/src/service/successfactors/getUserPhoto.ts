
import { getAccessToken, getAsseration } from "../successfactors";
import { baseUrlAPI } from "./config";
import axios from "axios";
import { Logger } from "@acme/logger";
import { TRPCError } from "@trpc/server";

export const getUserPhoto = async ({ userId }: { userId: string }) => {
    try {
        const assertion = await getAsseration();
        const token = await getAccessToken({ assertion });

        const params = new URLSearchParams({
            $filter: `userId eq '${userId}' and photoType eq '3'`,

        });

        const newUrl = baseUrlAPI + `/Photo?${params.toString()}`;
        const headers = { Authorization: `Bearer ${token.access_token}` };

        const { data } = await axios.get<{ d: { results: Photo[] } }>(newUrl, { headers });

        return data;

    } catch (error) {
        Logger.error("error", error);
        throw new TRPCError({
            code: "BAD_REQUEST",
        });
    }
}

export interface Photo {
    __metadata: Metadata;
    photoType: number;
    userId: string;
    lastModifiedDateTime: string;
    width: number;
    photo: string;
    photoId: string;
    lastModified: string;
    lastModifiedWithTZ: string;
    mimeType: string;
    photoName: null;
    height: number;
    userNav: UserNav;
}

export interface Metadata {
    uri: string;
    type: string;
}

export interface UserNav {
    __deferred: Deferred;
}

export interface Deferred {
    uri: string;
}
