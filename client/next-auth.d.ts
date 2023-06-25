import "next-auth";

declare module "next-auth" {
  export interface User {
    id: number;
    name: string;
    phone: string;
  }

  interface JWT {
    id: number;
    name: string;
    phone: string;
  }

  interface Session {
    user: User;
  }
}
