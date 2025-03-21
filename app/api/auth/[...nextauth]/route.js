import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma';

// This is a simple in-memory database for demo purposes
// In a real app, you would use a real database
const users = [];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("No credentials provided");
          return null;
        }

        try {
          // Find user by email
          console.log("Looking for user with email:", credentials.email);
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });
          
          console.log("User found:", user ? "Yes" : "No");
          
          if (!user) {
            return null;
          }

          // Compare passwords
          console.log("Comparing passwords");
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          console.log("Password match:", passwordMatch ? "Yes" : "No");

          if (!passwordMatch) {
            return null;
          }
          
          // Return user data without password
          return {
            id: user.id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "dummy-client-secret",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/signin',
    signUp: '/signup',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 