import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/register',
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = auth();

  // Allow public routes without checks
  if (isPublicRoute(request)) {
    return;
  }

  // Protect private routes
  auth().protect();

  if (!userId) {
    return auth().redirectToSignIn();
  }

  // Fetch user information
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  // Check the `verified` status
  const isVerified = user?.publicMetadata?.verified;

  if (!isVerified) {
    // Redirect unverified users to the /register page
    const url = new URL('/register', request.url);
    return Response.redirect(url.toString(), 302);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
