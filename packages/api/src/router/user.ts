import { Logger } from "@acme/logger";
import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import { getReports, User } from "../service/successfactors/getReports";
import { getUser } from "../service/successfactors/getUser";
import { getUserPhoto, Photo } from "../service/successfactors/getUserPhoto";
import { router, protectedProcedure } from "../trpc";


export const userRouter = router({
    getUser: protectedProcedure.query(async () => {
        const input = await getUser({ userId: "108743" });

        const photo = await getUserPhoto({ userId: "108743" });

        const response = {
            ...userMapper({ input }),
            photo: photo.d.results[0],

        };

        return response;
    }),

    getUserDirectReports: protectedProcedure.query(async () => {

        try {

            const reports = await getReports({ userId: "108743" });

            return reports

        } catch (error) {
            Logger.error("error", error);
            throw new TRPCError({
                code: "BAD_REQUEST",
            });
        }
    }),
});

type UserMapper = inferAsyncReturnType<typeof getUser>;

export const userMapper = ({ input }: { input: UserMapper }) => {
    return {
        firstName: input.d.firstName,
        lastName: input.d.lastName,
        jobTitle: input.d.jobTitle,
        email: input.d.email,
    };
};

type UserDirectReportMapper = User & Photo
export const userReportMapper = ({ input }: { input: UserDirectReportMapper }) => {
    return {
        firstName: input.firstName,
        lastName: input.lastName,
        jobTitle: input.jobTitle,
        email: input.email,
        photo: input.photo,
    };
};
