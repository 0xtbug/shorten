import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const urls = await prisma.url.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json(urls.map(url => ({
      id: url.id,
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      visits: url.visits,
    })));
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
