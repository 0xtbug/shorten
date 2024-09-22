import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { url, customCode } = await request.json();

    const shortCode = customCode || nanoid(8);

    if (customCode) {
      const existingUrl = await prisma.url.findUnique({
        where: { shortCode: customCode },
      });
      if (existingUrl) {
        return NextResponse.json({ error: "Custom code already in use" }, { status: 400 });
      }
    }

    const shortenedUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode,
        userId: decoded.userId,
      },
    });

    return NextResponse.json({ shortCode: shortenedUrl.shortCode });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
