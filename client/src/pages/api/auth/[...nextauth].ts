import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  pages: {
    signIn: "/signin",
  },
  secret: "i-am-a-secret",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as number;
      session.user.name = token.name as string;
      session.user.phone = token.phone as string;
      return session;
    },
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        id: { label: "name", type: "text", placeholder: "" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `http://localhost:8080/api/v1/teacher/${credentials?.id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        const user = await res.json();
        if (res.ok && user && !!credentials && !!credentials.id) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
