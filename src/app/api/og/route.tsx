import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") ?? null;
    const date = searchParams.get("date") ?? null;

    const fontData = await fetch(
      new URL("../../../../public/fonts/Roboto-Regular.ttf", import.meta.url),
    ).then(res => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "8rem",
            color: "#fff",
            background: "#000",
          }}
        >
          <div style={{ opacity: "0.4" }}>{date}</div>
          <h1 style={{ fontSize: "3.5rem" }}>{title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img
              src="https://github.com/crisgon.png"
              style={{
                borderRadius: "50%",
                height: 80,
                width: 80,
              }}
            />
            <h2>Cristiano Gonçalves</h2>
          </div>

          <span
            style={{
              opacity: "0.4",
              position: "absolute",
              bottom: "3rem",
              right: "8rem",
            }}
          >
            cristiano.dev
          </span>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Roboto",
            data: fontData,
            style: "normal",
            weight: 400,
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
