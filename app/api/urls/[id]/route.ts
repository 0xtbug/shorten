import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import jwt from "jsonwebtoken";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { id } = params;

    const url = await prisma.url.findUnique({
      where: { id },
    });

    if (!url || url.userId !== decoded.userId) {
      return NextResponse.json({ error: "URL not found or unauthorized" }, { status: 404 });
    }

    await prisma.url.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting URL:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}