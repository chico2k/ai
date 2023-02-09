import { z } from "zod";
import { setConnection, } from "../service/successfactors/setSecrets";
import { testConnection } from "../service/successfactors/testConnection";
import { protectedProcedure, router } from "../trpc";

const organizationId = "1";

export const setConnectionInput = z.object({
    secretKey: z.string().optional(),
    companyId: z.string().optional(),
    dataCenterUrl: z.string().optional(),
    accessToken: z.string().optional()
});

export const successFactorsRouter = router({
    setConnection: protectedProcedure
        .input(setConnectionInput)
        .mutation(({ ctx, input }) =>
            setConnection({ ctx, ...input, organizationId }),
        ),

    testConnection: protectedProcedure.mutation(async ({ ctx, input }) => {
        await testConnection({ ctx })

        return true
    }),
});
