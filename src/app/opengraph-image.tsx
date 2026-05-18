import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-end",
          background: "#000000",
          border: "1px solid #27272a",
          color: "#ffffff",
          display: "flex",
          fontFamily: "Georgia, serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              color: "#a1a1aa",
              fontFamily: "Arial, sans-serif",
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Stephen Murya
          </div>
          <div
            style={{
              fontSize: 118,
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
            }}
          >
            Smiz
          </div>
        </div>
        <div
          style={{
            color: "#a1a1aa",
            fontFamily: "Arial, sans-serif",
            fontSize: 28,
            lineHeight: 1.3,
            maxWidth: 420,
            textAlign: "right",
          }}
        >
          Game Developer & Product Designer
        </div>
      </div>
    ),
    size,
  );
}
