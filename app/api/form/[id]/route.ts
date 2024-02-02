import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

const CONFIG_BASE_PATH = process.cwd() + "/mocks/";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const url = new URL(request.url);

  const path = CONFIG_BASE_PATH + params.id + ".json";

  try {
    const config = await readFile(path, { encoding: "utf-8" });

    return NextResponse.json(JSON.parse(config));
  } catch (error) {
    console.error(`Failed to fetch: ${url.pathname}. Fallback: null`);

    return NextResponse.json(null);
  }
}
