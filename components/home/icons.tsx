// 홈 전용 선형 아이콘 (24px 그리드, stroke 1.7 통일)
const PATHS = {
  hospital: "M4 21V8l8-5 8 5v13M9 21v-6h6v6M12 8v4M10 10h4",
  health:
    "M12 20s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.4 12 20 12 20z",
  food: "M5 11h14l-1.5 8h-11zM9 11V8a3 3 0 0 1 6 0v3",
  care: "M4 13c0-3 2-5 4-5 1.4 0 2.4.8 4 .8s2.6-.8 4-.8c2 0 4 2 4 5 0 4-4 7-8 7s-8-3-8-7zM8 4.5l1.5 2M16 4.5l-1.5 2",
  adopt:
    "M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  shield: "M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6zM9 12l2 2 4-4",
  leaf: "M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19c2-4 5-7 9-9",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 1 2-2h13",
  people:
    "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-3A3.5 3.5 0 0 0 6 18.5V20M11 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9.5a2.5 2.5 0 0 1 0 4.5",
  heart:
    "M12 20s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.4 12 20 12 20z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3.5-3.5",
  arrow: "M5 12h14M13 6l6 6-6 6",
} as const;

export type HomeIconName = keyof typeof PATHS;

export function HomeIcon({
  name,
  size = 26,
}: {
  name: HomeIconName;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
