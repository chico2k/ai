import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const RequestInput = z.object({ command: z.string() });
type RequestInput = z.infer<typeof RequestInput>;

export const aiRouter = router({
    createRequest: protectedProcedure
        .input(RequestInput)
        .mutation(({ input }) => {
            return requestHandler({ input });
        }),
});

export const requestHandler = async ({ input }: { input: RequestInput }) => {
    const prompt = input.command;

    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        max_tokens: 400,
    });

    if (completion.data.choices.length === 0) {
        return "I don't know what to say";
    }
    return completion?.data?.choices[0]?.text;
};
