# /bucheon/sale 주소 불일치 원인 (운영 DB 읽기 전용 조회, 2026-10-09)

- 부천시 sale 119건 중 주소에 "부천"이 없는 행 6건(파주 2, 수원 영통, 성남 수정, 양주, 안성). 6건 모두 `source=mafra_registration_agent`.
- 같은 source 전체: 4,873건 중 약 208건에서 주소와 시군구가 어긋남(단순 문자열 포함 비교라 과대 추정 가능). localdata_csv 9/29,834, mois_15045050 0/948.
- 원인(코드 확인, `etl/mafra/registration-agents.ts`):
  1. id가 `mafra-regagent-{이름}-{주소}`를 URL 인코딩 후 100자로 자른다. 이름이 길거나 한글이면 주소 부분이 잘려 동명 업체의 id가 충돌한다.
  2. 충돌 시 `onConflictDoUpdate`가 address는 갱신하지만 addressSido/addressSigungu/lat/lng는 갱신하지 않아, 첫 행의 시군구에 마지막 행의 주소가 붙는다.
- 코드 수정: 충돌 시 sido/sigungu/lat/lng도 함께 갱신(이 PR). 앞으로 실행되는 ETL부터 행 안에서는 일관된다.
- 미적용(운영 쓰기·판단 필요): 기존 208건 정정은 ETL 재실행이 필요하다. id 100자 절단으로 동명 업체 일부가 이미 한 행으로 합쳐졌을 수 있고, id 체계를 바꾸면 기존 행과 중복되므로 별도 마이그레이션이 필요하다.
