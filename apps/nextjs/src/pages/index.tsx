import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Our AI Test App</title>
        <meta name="description" content="AI Test Case" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            AI <span className="text-[hsl(280,100%,70%)]">Test</span> App
          </h1>
          <AuthShowcase />

          <div className="flex  justify-center px-4 text-xl"></div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { isSignedIn } = useAuth();
  const { register, handleSubmit, reset, formState } = useForm();
  const [data, setData] = useState<string>("");
  const { isSubmitting } = formState;
  const createRequestMutation = trpc.ai.createRequest.useMutation();

  const submitHandler = async (command: string) => {
    const result = await createRequestMutation.mutateAsync({ command });
    setData(result || "");
  };

  return (
    <>
      {isSignedIn && (
        <div className="flex items-center justify-center">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "3rem",
                  height: "3rem",
                },
              },
            }}
          />
        </div>
      )}
      {isSignedIn && (
        <>
          <div className="w-full max-w-3xl">
            <form
              onSubmit={handleSubmit((data) => submitHandler(data.command))}
            >
              <label
                htmlFor="command"
                className="block text-sm font-medium text-gray-300"
              >
                Give me your command
              </label>
              <div className="mt-1">
                <textarea
                  {...register("command")}
                  rows={6}
                  name="command"
                  id="command"
                  className="block w-full rounded-md border-gray-300 px-2 py-3 text-indigo-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit
              </button>
              <button
                onClick={() => reset()}
                className="ml-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Reset
              </button>
            </form>
            <Result isSubmitting={isSubmitting} data={data} />
          </div>
        </>
      )}
      {!isSignedIn && (
        <p className="text-center text-2xl text-white">
          <Link href="/sign-in">Sign In</Link>
        </p>
      )}
    </>
  );
};

export const Result = ({
  data,
  isSubmitting,
}: {
  data: string;
  isSubmitting: boolean;
}) => {
  return (
    <>
      <div className="flex flex-col justify-center pt-16">
        {isSubmitting && (
          <p className="text-3xl text-white">
            <Spinner />
          </p>
        )}
        {!isSubmitting && <p className="text-white">{data} </p>}
      </div>
    </>
  );
};

export const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="mr-2 inline h-8 w-8 animate-spin fill-indigo-700 text-gray-200 dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
