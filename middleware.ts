import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Require authentication for protected routes
        return !!token
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*", "/typing/:path*", "/quiz/:path*", "/settings/:path*"],
}
