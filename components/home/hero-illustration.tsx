// 히어로 임시 일러스트. 사용권이 확인된 사진으로 교체하기 전까지 쓰는 자체 제작 벡터 그래픽이다.
export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 560"
      role="img"
      aria-label="창가의 햇빛 아래 나란히 앉은 강아지와 고양이 일러스트"
      className="hm-hero-art"
    >
      <rect width="480" height="560" rx="20" fill="#E8EEE5" />
      <path d="M90 560V230a150 150 0 0 1 300 0v330z" fill="#F8F7F2" />
      <path d="M120 560V235a120 120 0 0 1 240 0v325z" fill="#FBEBDD" />
      <line
        x1="240"
        y1="115"
        x2="240"
        y2="560"
        stroke="#E1E5DE"
        strokeWidth="6"
      />
      <line
        x1="120"
        y1="300"
        x2="360"
        y2="300"
        stroke="#E1E5DE"
        strokeWidth="6"
      />
      <rect
        x="0"
        y="470"
        width="480"
        height="90"
        fill="#234D3E"
        opacity="0.92"
      />
      {/* 강아지 */}
      <g>
        <ellipse cx="170" cy="440" rx="62" ry="58" fill="#D9A877" />
        <circle cx="170" cy="368" r="46" fill="#E4B98C" />
        <ellipse
          cx="136"
          cy="352"
          rx="17"
          ry="32"
          fill="#B9854F"
          transform="rotate(14 136 352)"
        />
        <ellipse
          cx="204"
          cy="352"
          rx="17"
          ry="32"
          fill="#B9854F"
          transform="rotate(-14 204 352)"
        />
        <circle cx="156" cy="368" r="4.5" fill="#1F2D26" />
        <circle cx="184" cy="368" r="4.5" fill="#1F2D26" />
        <ellipse cx="170" cy="384" rx="9" ry="6.5" fill="#1F2D26" />
      </g>
      {/* 고양이 */}
      <g>
        <ellipse cx="318" cy="444" rx="54" ry="54" fill="#7C8A82" />
        <circle cx="318" cy="378" r="40" fill="#8E9C94" />
        <path d="M284 358l-4-42 34 22z" fill="#8E9C94" />
        <path d="M352 358l4-42-34 22z" fill="#8E9C94" />
        <ellipse cx="304" cy="378" rx="4.5" ry="6" fill="#1F2D26" />
        <ellipse cx="332" cy="378" rx="4.5" ry="6" fill="#1F2D26" />
        <path
          d="M312 392q6 5 12 0"
          stroke="#1F2D26"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M372 470c34-4 52-30 36-58"
          stroke="#7C8A82"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <circle cx="380" cy="92" r="26" fill="#F2C39E" />
    </svg>
  );
}
