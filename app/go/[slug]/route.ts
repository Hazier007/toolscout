import { NextRequest, NextResponse } from "next/server";
import { getToolBySlug } from "@/lib/tools";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log(`[Affiliate Click] ${tool.naam} (${tool.slug}) — ${new Date().toISOString()}`);

  return NextResponse.redirect(tool.affiliate_url, {
    status: 302,
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
