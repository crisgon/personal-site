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
            backgroundImage: "url(https://www.cristiano.dev/bg-2.png)",
          }}
        >
          <div style={{ color: "#db2777", fontSize: "1.7rem" }}>{date}</div>
          <h1 style={{ fontSize: "3.5rem" }}>{title}</h1>
          <h2 style={{ fontSize: "2.2rem" }}>Cristiano Gonçalves</h2>

          <div
            style={{
              position: "absolute",
              bottom: "3rem",
              right: "8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="https://raw.githubusercontent.com/crisgon/crisgon/master/cristiano.png"
              style={{
                height: 100,
                width: 100,
              }}
            />
          </div>
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
