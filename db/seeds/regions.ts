import { db } from "../client";
import { regions } from "../schema";

// 통계청 행정구역 코드 기준 시도/시군구 (2024년 기준 주요 항목)
const REGIONS_DATA = [
  // 서울특별시
  { code: "11110", sido: "서울특별시", sidoSlug: "seoul", sigungu: "종로구", sigunguSlug: "jongno", fullName: "서울특별시 종로구" },
  { code: "11140", sido: "서울특별시", sidoSlug: "seoul", sigungu: "중구", sigunguSlug: "jung", fullName: "서울특별시 중구" },
  { code: "11170", sido: "서울특별시", sidoSlug: "seoul", sigungu: "용산구", sigunguSlug: "yongsan", fullName: "서울특별시 용산구" },
  { code: "11200", sido: "서울특별시", sidoSlug: "seoul", sigungu: "성동구", sigunguSlug: "seongdong", fullName: "서울특별시 성동구" },
  { code: "11215", sido: "서울특별시", sidoSlug: "seoul", sigungu: "광진구", sigunguSlug: "gwangjin", fullName: "서울특별시 광진구" },
  { code: "11230", sido: "서울특별시", sidoSlug: "seoul", sigungu: "동대문구", sigunguSlug: "dongdaemun", fullName: "서울특별시 동대문구" },
  { code: "11260", sido: "서울특별시", sidoSlug: "seoul", sigungu: "중랑구", sigunguSlug: "jungnang", fullName: "서울특별시 중랑구" },
  { code: "11290", sido: "서울특별시", sidoSlug: "seoul", sigungu: "성북구", sigunguSlug: "seongbuk", fullName: "서울특별시 성북구" },
  { code: "11305", sido: "서울특별시", sidoSlug: "seoul", sigungu: "강북구", sigunguSlug: "gangbuk", fullName: "서울특별시 강북구" },
  { code: "11320", sido: "서울특별시", sidoSlug: "seoul", sigungu: "도봉구", sigunguSlug: "dobong", fullName: "서울특별시 도봉구" },
  { code: "11350", sido: "서울특별시", sidoSlug: "seoul", sigungu: "노원구", sigunguSlug: "nowon", fullName: "서울특별시 노원구" },
  { code: "11380", sido: "서울특별시", sidoSlug: "seoul", sigungu: "은평구", sigunguSlug: "eunpyeong", fullName: "서울특별시 은평구" },
  { code: "11410", sido: "서울특별시", sidoSlug: "seoul", sigungu: "서대문구", sigunguSlug: "seodaemun", fullName: "서울특별시 서대문구" },
  { code: "11440", sido: "서울특별시", sidoSlug: "seoul", sigungu: "마포구", sigunguSlug: "mapo", fullName: "서울특별시 마포구" },
  { code: "11470", sido: "서울특별시", sidoSlug: "seoul", sigungu: "양천구", sigunguSlug: "yangcheon", fullName: "서울특별시 양천구" },
  { code: "11500", sido: "서울특별시", sidoSlug: "seoul", sigungu: "강서구", sigunguSlug: "gangseo", fullName: "서울특별시 강서구" },
  { code: "11530", sido: "서울특별시", sidoSlug: "seoul", sigungu: "구로구", sigunguSlug: "guro", fullName: "서울특별시 구로구" },
  { code: "11545", sido: "서울특별시", sidoSlug: "seoul", sigungu: "금천구", sigunguSlug: "geumcheon", fullName: "서울특별시 금천구" },
  { code: "11560", sido: "서울특별시", sidoSlug: "seoul", sigungu: "영등포구", sigunguSlug: "yeongdeungpo", fullName: "서울특별시 영등포구" },
  { code: "11590", sido: "서울특별시", sidoSlug: "seoul", sigungu: "동작구", sigunguSlug: "dongjak", fullName: "서울특별시 동작구" },
  { code: "11620", sido: "서울특별시", sidoSlug: "seoul", sigungu: "관악구", sigunguSlug: "gwanak", fullName: "서울특별시 관악구" },
  { code: "11650", sido: "서울특별시", sidoSlug: "seoul", sigungu: "서초구", sigunguSlug: "seocho", fullName: "서울특별시 서초구" },
  { code: "11680", sido: "서울특별시", sidoSlug: "seoul", sigungu: "강남구", sigunguSlug: "gangnam", fullName: "서울특별시 강남구" },
  { code: "11710", sido: "서울특별시", sidoSlug: "seoul", sigungu: "송파구", sigunguSlug: "songpa", fullName: "서울특별시 송파구" },
  { code: "11740", sido: "서울특별시", sidoSlug: "seoul", sigungu: "강동구", sigunguSlug: "gangdong", fullName: "서울특별시 강동구" },
  // 부산광역시
  { code: "21010", sido: "부산광역시", sidoSlug: "busan", sigungu: "중구", sigunguSlug: "jung", fullName: "부산광역시 중구" },
  { code: "21020", sido: "부산광역시", sidoSlug: "busan", sigungu: "서구", sigunguSlug: "seo", fullName: "부산광역시 서구" },
  { code: "21030", sido: "부산광역시", sidoSlug: "busan", sigungu: "동구", sigunguSlug: "dong", fullName: "부산광역시 동구" },
  { code: "21040", sido: "부산광역시", sidoSlug: "busan", sigungu: "영도구", sigunguSlug: "yeongdo", fullName: "부산광역시 영도구" },
  { code: "21050", sido: "부산광역시", sidoSlug: "busan", sigungu: "부산진구", sigunguSlug: "busanjin", fullName: "부산광역시 부산진구" },
  { code: "21060", sido: "부산광역시", sidoSlug: "busan", sigungu: "동래구", sigunguSlug: "dongnae", fullName: "부산광역시 동래구" },
  { code: "21070", sido: "부산광역시", sidoSlug: "busan", sigungu: "남구", sigunguSlug: "nam", fullName: "부산광역시 남구" },
  { code: "21080", sido: "부산광역시", sidoSlug: "busan", sigungu: "북구", sigunguSlug: "buk", fullName: "부산광역시 북구" },
  { code: "21090", sido: "부산광역시", sidoSlug: "busan", sigungu: "해운대구", sigunguSlug: "haeundae", fullName: "부산광역시 해운대구" },
  { code: "21100", sido: "부산광역시", sidoSlug: "busan", sigungu: "사하구", sigunguSlug: "saha", fullName: "부산광역시 사하구" },
  { code: "21120", sido: "부산광역시", sidoSlug: "busan", sigungu: "금정구", sigunguSlug: "geumjeong", fullName: "부산광역시 금정구" },
  { code: "21130", sido: "부산광역시", sidoSlug: "busan", sigungu: "강서구", sigunguSlug: "gangseo", fullName: "부산광역시 강서구" },
  { code: "21140", sido: "부산광역시", sidoSlug: "busan", sigungu: "연제구", sigunguSlug: "yeonje", fullName: "부산광역시 연제구" },
  { code: "21150", sido: "부산광역시", sidoSlug: "busan", sigungu: "수영구", sigunguSlug: "suyeong", fullName: "부산광역시 수영구" },
  { code: "21160", sido: "부산광역시", sidoSlug: "busan", sigungu: "사상구", sigunguSlug: "sasang", fullName: "부산광역시 사상구" },
  { code: "21200", sido: "부산광역시", sidoSlug: "busan", sigungu: "기장군", sigunguSlug: "gijang", fullName: "부산광역시 기장군" },
  // 인천광역시
  { code: "23010", sido: "인천광역시", sidoSlug: "incheon", sigungu: "중구", sigunguSlug: "jung", fullName: "인천광역시 중구" },
  { code: "23020", sido: "인천광역시", sidoSlug: "incheon", sigungu: "동구", sigunguSlug: "dong", fullName: "인천광역시 동구" },
  { code: "23030", sido: "인천광역시", sidoSlug: "incheon", sigungu: "미추홀구", sigunguSlug: "michuhol", fullName: "인천광역시 미추홀구" },
  { code: "23040", sido: "인천광역시", sidoSlug: "incheon", sigungu: "연수구", sigunguSlug: "yeonsu", fullName: "인천광역시 연수구" },
  { code: "23050", sido: "인천광역시", sidoSlug: "incheon", sigungu: "남동구", sigunguSlug: "namdong", fullName: "인천광역시 남동구" },
  { code: "23060", sido: "인천광역시", sidoSlug: "incheon", sigungu: "부평구", sigunguSlug: "bupyeong", fullName: "인천광역시 부평구" },
  { code: "23070", sido: "인천광역시", sidoSlug: "incheon", sigungu: "계양구", sigunguSlug: "gyeyang", fullName: "인천광역시 계양구" },
  { code: "23080", sido: "인천광역시", sidoSlug: "incheon", sigungu: "서구", sigunguSlug: "seo", fullName: "인천광역시 서구" },
  { code: "23090", sido: "인천광역시", sidoSlug: "incheon", sigungu: "강화군", sigunguSlug: "ganghwa", fullName: "인천광역시 강화군" },
  { code: "23100", sido: "인천광역시", sidoSlug: "incheon", sigungu: "옹진군", sigunguSlug: "ongjin", fullName: "인천광역시 옹진군" },
  // 대구광역시
  { code: "22010", sido: "대구광역시", sidoSlug: "daegu", sigungu: "중구", sigunguSlug: "jung", fullName: "대구광역시 중구" },
  { code: "22020", sido: "대구광역시", sidoSlug: "daegu", sigungu: "동구", sigunguSlug: "dong", fullName: "대구광역시 동구" },
  { code: "22030", sido: "대구광역시", sidoSlug: "daegu", sigungu: "서구", sigunguSlug: "seo", fullName: "대구광역시 서구" },
  { code: "22040", sido: "대구광역시", sidoSlug: "daegu", sigungu: "남구", sigunguSlug: "nam", fullName: "대구광역시 남구" },
  { code: "22050", sido: "대구광역시", sidoSlug: "daegu", sigungu: "북구", sigunguSlug: "buk", fullName: "대구광역시 북구" },
  { code: "22060", sido: "대구광역시", sidoSlug: "daegu", sigungu: "수성구", sigunguSlug: "suseong", fullName: "대구광역시 수성구" },
  { code: "22070", sido: "대구광역시", sidoSlug: "daegu", sigungu: "달서구", sigunguSlug: "dalseo", fullName: "대구광역시 달서구" },
  { code: "22080", sido: "대구광역시", sidoSlug: "daegu", sigungu: "달성군", sigunguSlug: "dalseong", fullName: "대구광역시 달성군" },
  // 광주광역시
  { code: "29010", sido: "광주광역시", sidoSlug: "gwangju", sigungu: "동구", sigunguSlug: "dong", fullName: "광주광역시 동구" },
  { code: "29020", sido: "광주광역시", sidoSlug: "gwangju", sigungu: "서구", sigunguSlug: "seo", fullName: "광주광역시 서구" },
  { code: "29030", sido: "광주광역시", sidoSlug: "gwangju", sigungu: "남구", sigunguSlug: "nam", fullName: "광주광역시 남구" },
  { code: "29040", sido: "광주광역시", sidoSlug: "gwangju", sigungu: "북구", sigunguSlug: "buk", fullName: "광주광역시 북구" },
  { code: "29050", sido: "광주광역시", sidoSlug: "gwangju", sigungu: "광산구", sigunguSlug: "gwangsan", fullName: "광주광역시 광산구" },
  // 대전광역시
  { code: "30010", sido: "대전광역시", sidoSlug: "daejeon", sigungu: "동구", sigunguSlug: "dong", fullName: "대전광역시 동구" },
  { code: "30020", sido: "대전광역시", sidoSlug: "daejeon", sigungu: "중구", sigunguSlug: "jung", fullName: "대전광역시 중구" },
  { code: "30030", sido: "대전광역시", sidoSlug: "daejeon", sigungu: "서구", sigunguSlug: "seo", fullName: "대전광역시 서구" },
  { code: "30040", sido: "대전광역시", sidoSlug: "daejeon", sigungu: "유성구", sigunguSlug: "yuseong", fullName: "대전광역시 유성구" },
  { code: "30050", sido: "대전광역시", sidoSlug: "daejeon", sigungu: "대덕구", sigunguSlug: "daedeok", fullName: "대전광역시 대덕구" },
  // 울산광역시
  { code: "31010", sido: "울산광역시", sidoSlug: "ulsan", sigungu: "중구", sigunguSlug: "jung", fullName: "울산광역시 중구" },
  { code: "31020", sido: "울산광역시", sidoSlug: "ulsan", sigungu: "남구", sigunguSlug: "nam", fullName: "울산광역시 남구" },
  { code: "31030", sido: "울산광역시", sidoSlug: "ulsan", sigungu: "동구", sigunguSlug: "dong", fullName: "울산광역시 동구" },
  { code: "31040", sido: "울산광역시", sidoSlug: "ulsan", sigungu: "북구", sigunguSlug: "buk", fullName: "울산광역시 북구" },
  { code: "31050", sido: "울산광역시", sidoSlug: "ulsan", sigungu: "울주군", sigunguSlug: "ulju", fullName: "울산광역시 울주군" },
  // 세종특별자치시
  { code: "36010", sido: "세종특별자치시", sidoSlug: "sejong", sigungu: "세종시", sigunguSlug: "sejong", fullName: "세종특별자치시" },
  // 경기도 주요 시군구
  { code: "41110", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "수원시 장안구", sigunguSlug: "suwon-jangan", fullName: "경기도 수원시 장안구" },
  { code: "41113", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "수원시 권선구", sigunguSlug: "suwon-gwonseon", fullName: "경기도 수원시 권선구" },
  { code: "41115", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "수원시 팔달구", sigunguSlug: "suwon-paldal", fullName: "경기도 수원시 팔달구" },
  { code: "41117", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "수원시 영통구", sigunguSlug: "suwon-yeongtong", fullName: "경기도 수원시 영통구" },
  { code: "41130", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "성남시 수정구", sigunguSlug: "seongnam-sujeong", fullName: "경기도 성남시 수정구" },
  { code: "41131", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "성남시 중원구", sigunguSlug: "seongnam-jungwon", fullName: "경기도 성남시 중원구" },
  { code: "41133", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "성남시 분당구", sigunguSlug: "seongnam-bundang", fullName: "경기도 성남시 분당구" },
  { code: "41150", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "의정부시", sigunguSlug: "uijeongbu", fullName: "경기도 의정부시" },
  { code: "41190", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "안양시 만안구", sigunguSlug: "anyang-manan", fullName: "경기도 안양시 만안구" },
  { code: "41191", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "안양시 동안구", sigunguSlug: "anyang-dongan", fullName: "경기도 안양시 동안구" },
  { code: "41210", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "부천시", sigunguSlug: "bucheon", fullName: "경기도 부천시" },
  { code: "41250", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "광명시", sigunguSlug: "gwangmyeong", fullName: "경기도 광명시" },
  { code: "41270", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "평택시", sigunguSlug: "pyeongtaek", fullName: "경기도 평택시" },
  { code: "41310", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "고양시 덕양구", sigunguSlug: "goyang-deogyang", fullName: "경기도 고양시 덕양구" },
  { code: "41313", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "고양시 일산동구", sigunguSlug: "goyang-ilsandong", fullName: "경기도 고양시 일산동구" },
  { code: "41315", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "고양시 일산서구", sigunguSlug: "goyang-ilsanseo", fullName: "경기도 고양시 일산서구" },
  { code: "41360", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "용인시 처인구", sigunguSlug: "yongin-cheoin", fullName: "경기도 용인시 처인구" },
  { code: "41363", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "용인시 기흥구", sigunguSlug: "yongin-giheung", fullName: "경기도 용인시 기흥구" },
  { code: "41365", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "용인시 수지구", sigunguSlug: "yongin-suji", fullName: "경기도 용인시 수지구" },
  { code: "41390", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "파주시", sigunguSlug: "paju", fullName: "경기도 파주시" },
  { code: "41410", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "이천시", sigunguSlug: "icheon", fullName: "경기도 이천시" },
  { code: "41430", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "안성시", sigunguSlug: "anseong", fullName: "경기도 안성시" },
  { code: "41450", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "김포시", sigunguSlug: "gimpo", fullName: "경기도 김포시" },
  { code: "41460", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "화성시", sigunguSlug: "hwaseong", fullName: "경기도 화성시" },
  { code: "41480", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "광주시", sigunguSlug: "gwangju", fullName: "경기도 광주시" },
  { code: "41550", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "양주시", sigunguSlug: "yangju", fullName: "경기도 양주시" },
  { code: "41570", sido: "경기도", sidoSlug: "gyeonggi", sigungu: "포천시", sigunguSlug: "pocheon", fullName: "경기도 포천시" },
];

async function seedRegions() {
  console.log(`Seeding ${REGIONS_DATA.length} regions...`);

  await db
    .insert(regions)
    .values(REGIONS_DATA)
    .onConflictDoUpdate({
      target: regions.code,
      set: {
        sido: regions.sido,
        sidoSlug: regions.sidoSlug,
        sigungu: regions.sigungu,
        sigunguSlug: regions.sigunguSlug,
        fullName: regions.fullName,
      },
    });

  console.log("Regions seeded.");
}

seedRegions().catch(console.error);
