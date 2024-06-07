// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isMaintenanceMode } from "@src/utils/constants";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const maintenancePage = "/maintenance";
  if (isMaintenanceMode && request.nextUrl.pathname.startsWith(maintenancePage)) {
    const fromPath = request.nextUrl.pathname + request.nextUrl.search;
    console.log("Redirecting to maintenance page from " + fromPath);

    return NextResponse.redirect(new URL(`${maintenancePage}?return=${encodeURIComponent(fromPath)}`, request.url), 307); // 307 - temporary redirect
  } else if (!isMaintenanceMode && request.nextUrl.pathname.startsWith(maintenancePage)) {
    const returnPath = getReturnPath(request);
    console.log("Redirecting from maintenance page to " + returnPath);

    return NextResponse.redirect(new URL(returnPath, request.url), 307); // 307 - temporary redirect
  }

  return NextResponse.next();
}

function getReturnPath(request: NextRequest) {
  try {
    const returnParam = request.nextUrl.searchParams.get("return");
    return returnParam ? decodeURIComponent(returnParam) : "/";
  } catch (err) {
    console.error(err);
    return "/";
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*"
};
