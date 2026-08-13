import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#090a0b",
          border: "4px solid #c45c2d",
          color: "#f0ede5",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          fontSize: 26,
          fontWeight: 900,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-0.08em",
          width: "100%",
        }}
      >
        NX
      </div>
    ),
    size,
  );
}
