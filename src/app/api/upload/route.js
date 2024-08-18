import cloudinary from "@/utils/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({
        status: 404,
        message: "file not found",
      });
    }

    const arrayBuffer = await file.arrayBuffer();

    const buffer = new Uint8Array(arrayBuffer);
    const uploadedResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(buffer);
    });

    return NextResponse.json({
      data: uploadedResult,
      status: 201,
      message: "Uploaded file successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
