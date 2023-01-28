import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";



// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.cachedFixedWindow(1, "60 s"),
//   ephemeralCache: new Map(),
// });

export default withClerkMiddleware(async (request: NextRequest) => {
  return NextResponse.next();

  // const ip = request.ip ?? "127.0.0.1";
  // const { userId } = getAuth(request)

  // Early escape if hitting the "blocked" redirect
  if (request.nextUrl.pathname === "/api/blocked")
    return NextResponse.next(request);


  // const { success, pending, limit, reset, remaining } = await ratelimit.limit(
  //   `mw_${userId ? userId : ip}`,
  // );



  // const res = success
  //   ? NextResponse.next()
  //   : NextResponse.rewrite(new URL("/api/blocked", request.url), request);

  // res.headers.set("X-RateLimit-Limit", limit.toString());
  // res.headers.set("X-RateLimit-Remaining", remaining.toString());
  // res.headers.set("X-RateLimit-Reset", reset.toString());

  // return res;
});

// Stop Middleware running on static files
export const config = {
  matcher: [
    /*
     * Match request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     *
     * This includes images, and requests from TRPC.
     */
    "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
  ],
};
