/**
 * 검색 Analytics 이벤트의 payload를 만든다.
 * 검색창에는 이메일·전화번호 등 개인정보가 입력될 수 있으므로, 원문 검색어(query)는
 * 절대 이 payload에 포함하지 않는다. 결과 수와 길이 구간만 전달한다.
 */

export type QueryLengthBucket = "1-5" | "6-15" | "16-50" | "51+";

export function queryLengthBucket(length: number): QueryLengthBucket {
  if (length <= 5) return "1-5";
  if (length <= 15) return "6-15";
  if (length <= 50) return "16-50";
  return "51+";
}

export interface SearchEventInput {
  query: string;
  resultsCount: number;
}

export interface SearchEventPayload {
  results_count: number;
  query_length_bucket: QueryLengthBucket;
}

/** 원문 query 문자열을 전달받지만 payload에는 절대 포함하지 않는다. */
export function buildSearchEventPayload(input: SearchEventInput): SearchEventPayload {
  const length = [...input.query].length;
  return {
    results_count: input.resultsCount,
    query_length_bucket: queryLengthBucket(length),
  };
}
