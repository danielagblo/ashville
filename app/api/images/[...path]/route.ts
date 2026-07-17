import { s3Client } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: { params: Promise<{ path: string[] }> }) {
  const params = await props.params;
  const pathParts = params.path;
  const key = pathParts.join("/");

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      return new NextResponse("Empty response from S3", { status: 404 });
    }

    const stream = (response.Body as any).transformToWebStream();

    return new NextResponse(stream, {
      headers: {
        "Content-Type": response.ContentType || "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error fetching image from S3:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}
