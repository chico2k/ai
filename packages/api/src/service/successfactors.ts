import axios from "axios";
import { Logger } from "@acme/logger"
import { TRPCError } from "@trpc/server";

const baseUrl = "https://apisalesdemo2.successfactors.eu";
const baseUrlAPI = baseUrl + "/odata/v2";
const asserationUrl = baseUrl + `/oauth/idp`;
const tokenUrl = baseUrl + "/oauth/token";

export const getAsseration = async () => {
    try {
        const data = {
            client_id: process.env.SF_CLIENT_ID || "",
            user_id: "109031",
            token_url: tokenUrl,
            private_key: process.env.SF_PRIVAT_KEY || "",
        };

        const params = new URLSearchParams(data);

        const res = await axios.post(asserationUrl, params.toString());

        return res.data;
    } catch (error) {
        console.log("error", error);
        return null;
    }
};

type AccessTokenOuput = {
    access_token: string;
    token_type: string;
    expires_in: number;
};
export const getAccessToken = async ({
    assertion,
}: {
    assertion: string;
}): Promise<AccessTokenOuput> => {
    try {
        const data = {
            client_id: process.env.SF_CLIENT_ID || "",
            user_id: "109031",
            company_id: "SFPART066740",
            assertion: assertion,
            grant_type: "urn:ietf:params:oauth:grant-type:saml2-bearer",
        };

        const params = new URLSearchParams(data);

        const res = await axios.post(tokenUrl, params.toString());
        return res.data;
    } catch (error) {
        Logger.error("error", error);
        throw new TRPCError({
            code: "BAD_REQUEST",
        });
    }
};
