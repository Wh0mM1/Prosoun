import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";

const YT_REGEX = new RegExp("^(https?://)?(www.)?(youtube.com|youtu.?be)/.+$;");

const CreateStreamSchema = z.object({
  creatodId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = YT_REGEX.test(data.url);
    if (!isYt) {
      return NextResponse.json(
        {
          message: "Wrong url format",
        },
        {
          status: 411,
        }
      );
    }

    const extractedId = data.url.split("?v=")[1];
    await prismaClient.stream.create({
      data: {
        userId: data.creatodId,
        url: data.url,
        extractedId,
        type: "YouTube",
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while adding a stream",
      },
      {
        status: 411,
      }
    );
  }
}
