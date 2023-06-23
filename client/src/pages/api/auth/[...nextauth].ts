import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
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
