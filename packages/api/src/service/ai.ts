import { Configuration, OpenAIApi } from "openai";
import { RequestInput } from "../router/ai";
import { z } from "zod";



const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getNameSchema = z.object({ firstName: z.string(), lastName: z.string() });

type GetNameOuput = z.infer<typeof getNameSchema>;

export const getName = async ({
    input,
}: {
    input: RequestInput;
}): Promise<GetNameOuput> => {
    try {
        const { command } = input;

        const prompt = `

        {command}: ${command}
        {command} can be any language.
        {command} is a string.

        Find the first name {firstName} and last name {lastName} from the {command}
 

        {result} is an Object with the following format:
        {"firstName": {firstName},"lastName": {lastName}}
        Text: {result}

        `;

        const ai = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 400,
        });

        const parsedAI = JSON.parse(ai?.data?.choices[0]?.text || "{}");

        const parsedObject = getNameSchema.safeParse(parsedAI);
        if (!parsedObject.success) throw new Error(parsedObject.error.message);

        return parsedObject.data;
    } catch (error) {
        console.log(error);
        throw new Error("as");
    }
};
