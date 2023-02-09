import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { getName, } from "../service/ai";
import { Logger } from "@acme/logger";
import { TRPCError } from "@trpc/server";
import { getEmployee } from "../service/successfactors/getEmployee";
import { getEmployeeUserId } from "../service/successfactors/getEmployeeUserId";
import { getEmployeeInformationDetail } from "../service/successfactors/getEmployeeInformationDetail";



export const RequestInput = z.object({ command: z.string() });
export type RequestInput = z.infer<typeof RequestInput>;

export const aiRouter = router({
    createRequest: protectedProcedure
        .input(RequestInput)
        .mutation(({ input }) => {
            return requestHandler({ input });
        }),
});

export const requestHandler = async ({ input }: { input: RequestInput }) => {

    try {
        const res = await getName({ input })
        const emp = await getEmployee(res)

        const personIdExternal = emp.d.results[0].personIdExternal

        const empUserId = await getEmployeeUserId({ personIdExternal })
        const userId = empUserId!.d!.results[0]!.userId

        const empInfo = await getEmployeeInformationDetail({ personIdExternal, userId })

        // const assertion = await getAsseration()
        // if (!assertion) return
        // const token = await getAccessToken({ assertion })
        // // console.log("token", token)
        // const emps = await getEmployee({ token })

        // const prompt = input.command;



        // const firstNamePrompt = `find and return firstname from the following message: ${prompt}`
        // const lastNamePrompt = `find and return lastname from the following message: ${prompt}`



        // const firstNameRes = await openai.createCompletion({
        //     model: "text-davinci-002",
        //     prompt: firstNamePrompt,
        //     max_tokens: 400,
        // });

        // const lastNameRes = await openai.createCompletion({
        //     model: "text-davinci-002",
        //     prompt: lastNamePrompt,
        //     max_tokens: 400,

        // });
        // const firstName = firstNameRes?.data?.choices[0]?.text
        // const lastName = lastNameRes?.data?.choices[0]?.text

        // const userIdUrl = `https://apisalesdemo2.successfactors.eu/odata/v2/PerPersonal?&$filter=firstName eq '${firstName}'&lastName eq '${lastName}'&$format=JSON`
        // const userIdRes = await fetch(userIdUrl, { headers: { "Authorization": `Basic c2ZhZG1pbkBTRlBBUlQwNjY3NDA6cGFydDIwMjJh` } })

        // console.log("userIdRes", userIdRes)




        // // if (completion.data.choices.length === 0) {
        // //     return "I don't know what to say";
        // }
        return { emp: emp, empInfo };
    } catch (error) {
        Logger.error("error", error);
        throw new TRPCError({
            code: "BAD_REQUEST",
        });
    }
}