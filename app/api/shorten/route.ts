import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  const shortCode = nanoid(8);
  const shortenedUrl = await prisma.url.create({
    data: {
      originalUrl: url,
      shortCode,
    },
  });

  return NextResponse.json({ shortCode: shortenedUrl.shortCode });
}
