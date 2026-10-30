import { ImageResponse } from "next/og";
export const alt = "Visolution — Your cameras see everything. Make it matter.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 70,
          background: "#080e13",
          color: "#eff4f2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30 }}>visolution</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            lineHeight: 1.05,
            letterSpacing: -4,
          }}
        >
          <span>Your cameras see everything.</span>
          <span style={{ color: "#5ee0bc" }}>Make it matter.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#9caaaa",
          }}
        >
          <span>VISUAL INTELLIGENCE FOR REAL-WORLD OPERATIONS</span>
          <span>See risks. Prevent violations.</span>
        </div>
      </div>
    ),
    size,
  );
}
