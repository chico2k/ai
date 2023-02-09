import { Logger } from "@acme/logger";
import { TRPCError } from "@trpc/server";
import { Context } from "../../context";
import axios from 'axios'
import crypto from 'crypto'
import SignedXml from 'xml-crypto'
import pem from 'pem'

async function createCertificate(options: pem.CertificateCreationOptions): Promise<pem.CertificateCreationResult> {
    return new Promise((success, fail) => {
        pem.createCertificate(options, (error, keys) => {
            if (error) {
                return fail(error);
            }
            success(keys);
        });
    });
}


import fs from 'fs'
import { writeFileSync } from 'fs';

export const testConnection = async ({ ctx }: { ctx: Context }) => {
    try {
        const result = await ctx.prisma.integrationSuccessFactors.findUnique({ where: { organizationId: "1" } }

        )
        if (!result) return


        const data = {
            client_id: result.accessToken || "",
            user_id: "109031",
            token_url: result.dataCenterUrl + "/oauth/token" || "",
            private_key: result.secretKey || "",
        };

        const sec = Buffer.from(result.accessToken as string, 'base64');



        // const res = await axios.post(result.dataCenterUrl + "/oauth/idp", params.toString());
        // const xml = "<library>" +
        //     "<book>" +
        //     "<name>Harry Potter</name>" +
        //     "</book>" +
        //     "</library>"

        // // console.log(222222222222222, res.data)

        const certContents =
            '-----BEGIN PRIVATE KEY-----' + "\n" +
            result.secretKey + "\n" +
            '-----END PRIVATE KEY-----'



        // // console.log(222222222222222, certContents)


        console.log("====================================");

        const keys = await createCertificate({ days: 1, selfSigned: true })



        // fs.writeFileSync("public.pem", keys.certificate);
        // fs.writeFileSync("private.pem", keys.clientKey);

        // import { Saml20 } from 'saml'

        // const options = {

        //     cert: fs.readFileSync("public.pem"),
        //     key: fs.readFileSync("private.pem"),
        //     issuer: 'urn:issuer',
        //     lifetimeInSeconds: 600,
        //     subject: "https://apisalesdemo2.successfactors.eu/oauth/token",
        //     audiences: 'www.successfactors.com',
        //     attributes: {
        //         "api_key": result.secretKey,
        //         'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': 'foo@bar.com',
        //         'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': 'Foo Bar'
        //     },
        //     nameIdentifier: 'sfadmin',
        //     sessionIndex: '_faed468a-15a0-4668-aed6-3d9c478cc8fa'
        // };

        // const signedAssertion = Saml20.create(options);

        // console.log("result.secretKey", signedAssertion)

        // const cert = new crypto.X509Certificate(keys.certificate)

        // const buf = Buffer.from(keys.certificate);


        // console.log("====================================");

        const xml =
            `<?xml version="1.0" encoding="UTF-8"?>` +
            `<saml2:Assertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Version="2.0" ID="ecb66c26-439a-4361-8581-3e418133e4ee" IssueInstant="2023-02-03T11:19:34.849Z" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">` +
            `<saml2:Issuer>www.successfactors.com/oauth/idp</saml2:Issuer>` +
            `<saml2:Subject>
                <saml2:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified">sfadmin</saml2:NameID>
                <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
                    <saml2:SubjectConfirmationData 
                        NotOnOrAfter="2023-02-03T11:29:34.849Z"
                        Recipient="https://apisalesdemo2.successfactors.eu/oauth/token" />
                </saml2:SubjectConfirmation>
                </saml2:Subject>
                <saml2:Conditions NotBefore="2023-02-03T11:09:34.849Z" NotOnOrAfter="2023-02-03T11:29:34.849Z">
                    <saml2:AudienceRestriction>
                        <saml2:Audience>www.successfactors.com</saml2:Audience>
                    </saml2:AudienceRestriction>
                </saml2:Conditions>
                <saml2:AuthnStatement AuthnInstant="2023-02-03T11:19:34.849Z"
                    SessionIndex="9879afad-6689-405e-b824-59320b0ebfa8">
                    <saml2:AuthnContext>
                        <saml2:AuthnContextClassRef>
                            urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml2:AuthnContextClassRef>
                    </saml2:AuthnContext>
                </saml2:AuthnStatement>
                <saml2:AttributeStatement>
                    <saml2:Attribute Name="api_key">
                        <saml2:AttributeValue xsi:type="xs:string">M2ViOTJiNWI2OGFhYWFjNzk0NGE5NDdiZTcyNw</saml2:AttributeValue>
                    </saml2:Attribute>
                </saml2:AttributeStatement>
            `+

            `</saml2:Assertion>`

        const sig = new SignedXml.SignedXml()
        // sig.addReference("//*[local-name(.)='book']")
        sig.signingKey = fs.readFileSync("private.pem")
        sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"
        sig.computeSignature(xml)
        fs.writeFileSync("signed.xml", sig.getSignedXml().replace(/\n/g, " "))

        // const buffer = Buffer.from(signedAssertion).toString('base64')
        // // const test = sig.computeSignature(xml)
        // console.log(test)


        // const data2 = {
        //     client_id: process.env.SF_CLIENT_ID || "",
        //     user_id: "109031",
        //     company_id: "SFPART066740",
        //     assertion: buffer,
        //     grant_type: "urn:ietf:params:oauth:grant-type:saml2-bearer",
        // };

        // const params2 = new URLSearchParams(data2);

        // const res2 = await axios.post(result.dataCenterUrl + "/oauth/token", params2.toString());

        return

    } catch (error) {
        Logger.error("error", error);
        throw new TRPCError({
            code: "BAD_REQUEST",
        });
    }
};


