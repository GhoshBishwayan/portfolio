import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const assetsDirectory = path.join(process.cwd(), "notes", "images");

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

export async function GET(
  _request: NextRequest,
  context: RouteContext<"/api/notes/assets/[...path]">,
) {
  const params = await context.params;
  const requestedPath = params.path.join(path.sep);
  const filePath = path.resolve(assetsDirectory, requestedPath);

  if (!filePath.startsWith(assetsDirectory)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();

    return new Response(file, {
      headers: {
        "Content-Type": contentTypes[extension] ?? "application/octet-stream",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
