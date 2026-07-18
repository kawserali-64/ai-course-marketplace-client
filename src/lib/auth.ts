import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(process.env.AUTH_DB_NAME!);

export const auth = betterAuth({
     emailAndPassword: { 
    enabled: true, 
  },
   socialProviders: {
        google: { 
            clientId: process.env.CLIENT_ID as string, 
            clientSecret: process.env.CLIENT_SECRET as string, 
        },
      },
      session:{
        cookieCache:{
          enabled:true,
          strategy:"jwt",
          // max 7 days 
          maxAge: 7 * 24 * 60 * 60,
        }
      },
       plugins: [
        jwt(), 
    ],

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});