import { db } from "../../db/client";
import { syncRegistrationAgents } from "./registration-agents";

const apiKey = process.env.APMS_API_KEY ?? "";
if (!apiKey) {
  console.error("[ETL:registration-agents] APMS_API_KEY 미설정");
  process.exit(1);
}

syncRegistrationAgents(db, apiKey).catch((err) => {
  console.error("[ETL:registration-agents] 오류:", err);
  process.exit(1);
});
