/**
 * 보호센터(shelters) ETL의 주소 파싱과 upsert 값 생성을 순수 함수로 분리한다.
 * etl/apms/shelters.ts는 이 함수들을 사용해 DB에 쓴다.
 *
 * 기존 코드는 parts[0]/parts[1]로만 주소를 나눠 "수원시 장안구"처럼 시+구 복합
 * 시군구를 깨뜨렸고(F09), conflict update에서 sido/sigungu를 갱신하지 않아
 * 센터가 이전해도 기존 지역이 그대로 남았다(F10).
 */

export interface ParsedShelterAddress {
  sido: string | null;
  sigungu: string | null;
}

// "수원시", "성남시", "고양시", "용인시" 등 뒤에 구가 붙는 경기도 복합 시군구 패턴.
const COMPOUND_CITY_SUFFIX = /^(.+시)$/;
const GU_SUFFIX = /(구|군)$/;

/**
 * 주소 문자열을 시도/시군구로 나눈다. "수원시 장안구"처럼 시+구가 함께 있는
 * 경우 두 토큰을 합쳐 하나의 시군구로 취급한다. 분류할 수 없으면 null을 반환한다
 * (unknown으로 처리하고 임의로 잘못된 지역을 넣지 않는다).
 */
export function parseShelterAddress(address: string): ParsedShelterAddress {
  const trimmed = address.trim();
  if (!trimmed) return { sido: null, sigungu: null };

  const parts = trimmed.split(/\s+/);
  if (parts.length < 2) return { sido: parts[0] ?? null, sigungu: null };

  const sido = parts[0];
  const second = parts[1];
  const third = parts[2];

  // "시" 로 끝나는 두 번째 토큰 뒤에 구/군으로 끝나는 세 번째 토큰이 오면 복합 시군구.
  if (COMPOUND_CITY_SUFFIX.test(second) && third && GU_SUFFIX.test(third)) {
    return { sido, sigungu: `${second} ${third}` };
  }

  return { sido, sigungu: second };
}

export interface ShelterUpsertInput {
  id: string;
  name: string;
  address: string;
  phone: string | null | undefined;
  lat?: number | null;
  lng?: number | null;
  now: string;
}

export interface ShelterUpsertValues {
  insert: {
    id: string;
    name: string;
    sido: string | null;
    sigungu: string | null;
    address: string | null;
    lat: number | null;
    lng: number | null;
    phone: string | null;
    source: string;
    lastSyncedAt: string;
    createdAt: string;
    updatedAt: string;
  };
  updateOnConflict: {
    name: string;
    sido: string | null;
    sigungu: string | null;
    address: string | null;
    lat: number | null;
    lng: number | null;
    phone: string | null;
    lastSyncedAt: string;
    updatedAt: string;
  };
}

/**
 * insert 값과 conflict-update 값을 함께 만든다. 두 값 모두 sido/sigungu를
 * 포함해야 한다 — 기존 코드는 conflict update에서 이 두 필드를 빼먹어 센터가
 * 이전해도 예전 지역이 그대로 남았다(F10).
 */
export function buildShelterUpsertValues(input: ShelterUpsertInput): ShelterUpsertValues {
  const addr = input.address.trim();
  const { sido, sigungu } = parseShelterAddress(addr);
  const lat = input.lat ?? null;
  const lng = input.lng ?? null;
  const phone = input.phone || null;

  return {
    insert: {
      id: input.id,
      name: input.name,
      sido,
      sigungu,
      address: addr || null,
      lat,
      lng,
      phone,
      source: "apms_15025454",
      lastSyncedAt: input.now,
      createdAt: input.now,
      updatedAt: input.now,
    },
    updateOnConflict: {
      name: input.name,
      sido,
      sigungu,
      address: addr || null,
      lat,
      lng,
      phone,
      lastSyncedAt: input.now,
      updatedAt: input.now,
    },
  };
}
