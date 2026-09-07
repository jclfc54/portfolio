import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero } from "@/data/profile";

// Social-share card (Open Graph / Twitter) — generated at build time.
// Rendered when the site is pasted into LinkedIn, Slack, iMessage, etc.
// Uses the same tokens as the site: neutral ground, one blue accent.

export const dynamic = "force-static";
export const alt = "Jason Cushen — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bg = "#fafafa";
const ink = "#09090b";
const ink3 = "#475569";
const accent = "#2563eb";
const line = "#e4e4e7";

export default async function OgImage() {
  const [medium, bold] = await Promise.all([
    readFile(join(process.cwd(), "src/app/og/SpaceGrotesk-500.ttf")),
    readFile(join(process.cwd(), "src/app/og/SpaceGrotesk-700.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: bg,
          padding: "64px 72px",
          fontFamily: "Space Grotesk",
        }}
      >
        {/* top rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${ink}`,
            paddingTop: 20,
            fontSize: 22,
            letterSpacing: 2,
            color: ink3,
          }}
        >
          <div style={{ display: "flex" }}>PORTFOLIO</div>
          <div style={{ display: "flex" }}>LIMERICK, IRELAND</div>
        </div>

        {/* name + role */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: accent }} />
              <div style={{ display: "flex", fontSize: 22, letterSpacing: 2, color: accent }}>
                {hero.availability.toUpperCase()}
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 104, fontWeight: 700, color: ink, letterSpacing: -3, lineHeight: 1 }}>
              Jason Cushen
            </div>
            <div style={{ display: "flex", fontSize: 38, color: ink3, marginTop: 20 }}>
              {hero.role}
            </div>
          </div>

          {/*
            Modular mark — the same geometric system as the project plates.
            Each cell is 59px plus a 1px right/bottom border = 60px, so four
            cells fit the 240px row exactly and the grid cannot wrap.
          */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: 242,
              height: 242,
              borderTop: `1px solid ${line}`,
              borderLeft: `1px solid ${line}`,
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => {
              const filled = [0, 5, 10, 15];
              const isAccent = i === 5;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    width: 59,
                    height: 59,
                    borderRight: `1px solid ${line}`,
                    borderBottom: `1px solid ${line}`,
                    background: filled.includes(i)
                      ? isAccent
                        ? accent
                        : ink
                      : "transparent",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* bottom rule */}
        <div
          style={{
            display: "flex",
            borderTop: `1px solid ${line}`,
            paddingTop: 20,
            fontSize: 22,
            letterSpacing: 1,
            color: ink3,
          }}
        >
          Projects · Case studies · Experience
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: medium, style: "normal", weight: 500 },
        { name: "Space Grotesk", data: bold, style: "normal", weight: 700 },
      ],
    }
  );
}
