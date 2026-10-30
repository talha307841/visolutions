import { useId } from "react";
export function Scene({
  camera = 0,
  overlays = true,
}: {
  camera?: number;
  overlays?: boolean;
}) {
  const id = useId().replaceAll(":", "");
  return (
    <svg
      viewBox="0 0 800 480"
      role="img"
      aria-label={`Original illustrated ${["factory emergency exit", "production floor", "warehouse forklift zone", "hospital service area"][camera]} with ${overlays ? "simulated detection overlay" : "no detection overlay"}`}
      className="camera-scene"
    >
      <defs>
        <linearGradient id={`${id}wall`} x2="0.3" y2="1">
          <stop stopColor="#4e6062" />
          <stop offset="1" stopColor="#172b30" />
        </linearGradient>
        <linearGradient id={`${id}floor`} x2="0" y2="1">
          <stop stopColor="#526264" />
          <stop offset="1" stopColor="#17272e" />
        </linearGradient>
        <pattern
          id={`${id}grid`}
          width="65"
          height="65"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M65 0H0V65"
            fill="none"
            stroke="#a2bbb6"
            strokeOpacity=".1"
          />
        </pattern>
        <pattern
          id={`${id}lines`}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 0H4" stroke="#07141d" strokeOpacity=".18" />
        </pattern>
      </defs>
      <path d="M0 0H800V480H0Z" fill={`url(#${id}wall)`} />
      <path d="M0 0L245 98H580L800 0" fill="#13252c" />
      <path d="M0 480L245 267H580L800 480" fill={`url(#${id}floor)`} />
      <path d="M245 98V267H580V98" fill="#3e5254" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path
            d={`M${i * 180 - 100} 0L${260 + i * 70} 100`}
            stroke="#91a5a3"
            strokeWidth="5"
            opacity=".27"
          />
          <path
            d={`M${i * 230 - 150} 480L${265 + i * 70} 267`}
            stroke="#a6bcb1"
            opacity=".13"
          />
          <path d={`M0 ${310 + i * 45}H800`} stroke="#a6bcb1" opacity=".09" />
        </g>
      ))}
      <path
        d="M50 41L290 110M440 16L475 100M711 29L552 111"
        stroke="#daf5dd"
        strokeWidth="6"
        opacity=".8"
      />
      <path
        d="M10 410L251 260M779 420L576 260"
        stroke="#d0b765"
        strokeWidth="7"
        opacity=".7"
      />
      {camera === 0 ? (
        <>
          <path
            d="M338 139H451V270H338Z"
            fill="#142f2d"
            stroke="#8caaa2"
            strokeWidth="4"
          />
          <path d="M394 141V269M343 212H447" stroke="#91aaa1" strokeWidth="3" />
          <rect x="357" y="115" width="75" height="20" rx="2" fill="#429b6c" />
          <text
            x="394"
            y="129"
            textAnchor="middle"
            fill="#e8fff4"
            fontSize="13"
            fontFamily="monospace"
          >
            EXIT →
          </text>
          <path d="M324 296L403 276L463 303L385 327Z" fill="#a49b78" />
          <path d="M324 296V358L385 391V327Z" fill="#776b51" />
          <path d="M385 327L463 303V362L385 391Z" fill="#8e8061" />
          <path d="M349 264L403 250L440 265L387 283Z" fill="#b0a382" />
          <path d="M349 264V305L387 324V283Z" fill="#8b795b" />
          <path d="M387 283L440 265V306L387 324Z" fill="#a28f6a" />
        </>
      ) : camera === 3 ? (
        <>
          <rect x="315" y="131" width="140" height="140" fill="#72908e" />
          <path d="M385 131V271" stroke="#20383c" strokeWidth="3" />
          <rect x="480" y="215" width="62" height="90" rx="9" fill="#b09249" />
          <rect x="477" y="211" width="68" height="13" rx="4" fill="#dbbd61" />
          <rect x="270" y="256" width="68" height="95" rx="8" fill="#a25f5d" />
          <rect x="266" y="253" width="76" height="13" fill="#c9827a" />
          <text
            x="302"
            y="303"
            textAnchor="middle"
            fontSize="26"
            fill="#e6dad1"
          >
            ⚠
          </text>
        </>
      ) : (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <path
                d={`M${45 + i * 55} ${140 - i * 10}V360M${190 + i * 35} ${140 - i * 10}V290`}
                stroke="#899593"
                strokeWidth="6"
              />
              {[0, 1, 2].map((j) => (
                <g key={j}>
                  <path
                    d={`M${45 + i * 55} ${175 + j * 58 - i * 10}L${190 + i * 35} ${158 + j * 42 - i * 5}`}
                    stroke="#b99a58"
                    strokeWidth="8"
                  />
                  <rect
                    x={53 + i * 55}
                    y={145 + j * 57 - i * 10}
                    width="43"
                    height="28"
                    fill={j % 2 ? "#817d67" : "#8d8a74"}
                  />
                </g>
              ))}
            </g>
          ))}
          <rect x="521" y="152" width="181" height="122" fill="#22383d" />
          <path
            d="M521 182H702M521 212H702M521 242H702"
            stroke="#667a79"
            strokeWidth="3"
          />
          {camera === 2 && (
            <g>
              <path d="M444 322V268H504V333H557V363H435Z" fill="#b79747" />
              <path
                d="M451 267V227H496V268"
                fill="none"
                stroke="#26383b"
                strokeWidth="7"
              />
              <path
                d="M560 360V238M570 360H607"
                fill="none"
                stroke="#9fa6a0"
                strokeWidth="6"
              />
              <circle cx="455" cy="363" r="18" fill="#14272c" />
              <circle cx="532" cy="363" r="18" fill="#14272c" />
            </g>
          )}
        </>
      )}
      <g
        transform={`translate(${camera === 0 ? 570 : camera === 2 ? 355 : 445} ${camera === 0 ? 260 : 290})`}
      >
        <ellipse cx="1" cy="91" rx="24" ry="8" fill="#07191e" opacity=".5" />
        <path d="M-10 48L-13 88M9 48L16 88" stroke="#1d313c" strokeWidth="11" />
        <path
          d="M-16 7L-20 49H20L16 7Z"
          fill={camera === 3 ? "#b5c6c1" : "#b7bd6f"}
        />
        <path
          d="M-13 14L-12 45M13 14L12 45M-17 32H17"
          stroke="#dae3b0"
          strokeWidth="4"
        />
        <path d="M-19 13L-27 43M19 13L28 44" stroke="#8d9b91" strokeWidth="8" />
        <circle cy="-5" r="12" fill="#b6ad94" />
        <path d="M-15 -7Q0 -30 15 -7Z" fill="#dfcf8b" />
      </g>
      <rect width="800" height="480" fill={`url(#${id}lines)`} />
      <rect width="800" height="480" fill={`url(#${id}grid)`} opacity=".15" />
      {overlays && (
        <g className="detection-overlay">
          <rect
            x={
              camera === 0 ? 309 : camera === 2 ? 420 : camera === 3 ? 253 : 411
            }
            y={
              camera === 0 ? 243 : camera === 2 ? 222 : camera === 3 ? 242 : 263
            }
            width={camera === 0 ? 169 : camera === 2 ? 170 : 100}
            height={camera === 0 ? 159 : camera === 2 ? 162 : 130}
            fill="#f6b44c"
            fillOpacity=".06"
            stroke="#e9bb63"
            strokeWidth="2"
            strokeDasharray="7 3"
          />
          <rect
            x={
              camera === 0 ? 309 : camera === 2 ? 420 : camera === 3 ? 253 : 411
            }
            y={
              camera === 0 ? 220 : camera === 2 ? 199 : camera === 3 ? 219 : 240
            }
            width="176"
            height="23"
            fill="#e9bb63"
          />
          <text
            x={
              camera === 0 ? 318 : camera === 2 ? 429 : camera === 3 ? 262 : 420
            }
            y={
              camera === 0 ? 236 : camera === 2 ? 215 : camera === 3 ? 235 : 256
            }
            fill="#142222"
            fontSize="11"
            fontWeight="700"
            fontFamily="monospace"
          >
            {
              [
                "EXIT OBSTRUCTION",
                "PROTECTIVE EQUIPMENT",
                "PROXIMITY WARNING",
                "WASTE HANDLING",
              ][camera]
            }
          </text>
          <path
            d="M550 245H541V359H610V245H600"
            fill="none"
            stroke="#65dcb4"
            strokeWidth="2"
            opacity={camera === 0 ? 1 : 0}
          />
        </g>
      )}
      <path
        d="M20 40V20H40M760 20H780V40M20 440V460H40M760 460H780V440"
        fill="none"
        stroke="#c8e2d9"
        opacity=".5"
        strokeWidth="2"
      />
    </svg>
  );
}
