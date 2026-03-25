import { betterAuth } from "better-auth";
import { Pool } from "pg";

const postgreUri = process.env.DATABASE_URL;

if (!postgreUri) {
  throw new Error("postgreDB_URI est manquante dans les variables d'environnement.");
}

export const auth = betterAuth({
    database: new Pool({
        connectionString: postgreUri,
    }),
    emailAndPassword: {
        enabled: true
    }
});