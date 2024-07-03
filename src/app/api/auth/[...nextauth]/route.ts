import NextAuth from "next-auth";
import Email from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID_DEV as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_DEV as string,
    }),
    // Kakao({})
    // Email({
    // })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return "/";
      } else {
        // Return false to display a default error message
        return "/";
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    // async session({ session, user, token }) {
    //   return session;
    // },
    // async jwt({ token, user, account }) {
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
  },
  pages: {},
});
export { handler as GET, handler as POST };
