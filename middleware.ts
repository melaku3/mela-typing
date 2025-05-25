import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Only protect dashboard and settings routes
    const protectedPaths = ["/dashboard", "/settings"]
    const isProtectedPath = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))

    if (isProtectedPath && !req.nextauth.token) {
      // Redirect to auth-required page instead of auth page
      return NextResponse.redirect(new URL("/auth-required", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to typing, quiz, and explore routes for guests
        const guestAllowedPaths = ["/typing", "/quiz", "/explore", "/auth", "/auth-required"]
        const isGuestAllowed = guestAllowedPaths.some((path) => req.nextUrl.pathname.startsWith(path))

        if (isGuestAllowed) {
          return true
        }

        // Protect dashboard and settings
        const protectedPaths = ["/dashboard", "/settings"]
        const isProtectedPath = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))

        if (isProtectedPath) {
          return !!token
        }

        return true
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/typing/:path*", "/quiz/:path*", "/explore/:path*"],
}
