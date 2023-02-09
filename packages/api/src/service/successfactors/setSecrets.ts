import { Logger } from "@acme/logger";
import { TRPCError } from "@trpc/server";
import { Context } from "../../context";

export const setAccessToken = async ({
    ctx,
    organizationId,
    accessToken,
}: {
    accessToken: string;
    organizationId: string;
    ctx: Context;
}) => {
    try {
        await ctx.prisma.integrationSuccessFactors.upsert({
            where: {
                organizationId,
            },
            create: {
                accessToken,
                organizationId
            },
            update: {
                accessToken,
                organizationId
            },
        });
    } catch (error) {
        Logger.error("error", error);
        throw new TRPCError({
            code: "BAD_REQUEST",
        });
    }
};

export const setSecretKey = async ({
    ctx,
    organizationId,
    secretKey,
}: {
    secretKey: string;
    organizationId: string;
    ctx: Context;
}) => {
    try {
        await ctx.prisma.integrationSuccessFactors.upsert({
            where: {
                organizationId,
            },
            create: {
                secretKey,
                organizationId,
            },
            update: {
                secretKey,
                organizationId
            },
        });
    } catch (error) {
        Logger.error("error", error);
        throw new TRPCError({
            code: "BAD_REQUEST",
        });
    }
};

export const setConnection = async ({
    ctx,
    organizationId,
    secretKey,
    companyId,
    dataCenterUrl,
}: {
    secretKey?: string;
    accessToken?: string;
    companyId?: string;
    dataCenterUrl?: string;
    organizationId: string;
    ctx: Context;
}) => {
    try {
        console.log("setConnection", companyId)
        await ctx.prisma.integrationSuccessFactors.upsert({
            where: {
                organizationId,
            },
            create: {
                secretKey,
                ...(organizationId) && { organizationId },
                ...(secretKey) && { secretKey },
                ...(companyId) && { companyId },
                ...(dataCenterUrl) && { dataCenterUrl },
            },
            update: {
                ...(organizationId) && { organizationId },
                ...(secretKey) && { secretKey },
                ...(companyId) && { companyId },
                ...(dataCenterUrl) && { dataCenterUrl },
                organizationId
            },
        });
    } catch (error) {
        Logger.error("error", error);
        throw new TRPCError({
            code: "BAD_REQUEST",
        });
    }
};

