import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { aiRouter } from "./ai";
import { userRouter } from "./user";
import { successFactorsRouter } from "./successFactors";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  ai: aiRouter,
  user: userRouter,
  successFactors: successFactorsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
