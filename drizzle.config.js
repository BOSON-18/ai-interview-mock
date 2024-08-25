/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:pys3ExoYO0Jf@ep-cold-leaf-a55jymzo.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
};
