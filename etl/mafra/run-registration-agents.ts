import { db } from "../../db/client";
import { syncRegistrationAgents } from "./registration-agents";

const apiKey = process.env.APMS_API_KEY ?? "";
if (!apiKey) {
  console.error("[ETL:registration-agents] APMS_API_KEY 미설정");
  process.exit(1);
}

syncRegistrationAgents(db, apiKey)
  .then((result) => {
    // 불완전 수집은 성공으로 기록하지 않고 워크플로 실패(알림)로 드러낸다. 락 대기로 건너뛴 실행은 실패가 아니다.
    if (!result.complete && !result.skippedLocked) process.exit(1);
  })
  .catch((err) => {
    console.error("[ETL:registration-agents] 오류:", err);
    process.exit(1);
  });
