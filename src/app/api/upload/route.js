

import cloudinary from "@/utils/cloudinary";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    // Check if the file exists
    if (!file) {
      return NextResponse.json({
        status: 404,
        message: "File not found",
      });
    }

    const fileType = file.type;
    const fileSize = file.size;

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
      return NextResponse.json({
        status: 400,
        message: "Only PNG, JPG, or SVG files are allowed.",
      });
    }

    // Validate file size
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json({
        status: 400,
        message: "File size exceeds the 3MB limit.",
      });
    }

    // Convert file to array buffer and then to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadedResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "uploads" }, // Optionally, specify folder in Cloudinary
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    // Return the uploaded file's Cloudinary URL and other metadata
    return NextResponse.json({
      data: {
        url: uploadedResult.secure_url, // The file's URL on Cloudinary
        public_id: uploadedResult.public_id,
        format: uploadedResult.format,
      },
      status: 201,
      message: "Uploaded file successfully",
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred during file upload.",
      error: error.message,
    });
  }
}
// import fs from 'fs';
// import { NextResponse } from 'next/server';
// import path from 'path';
// import { promisify } from 'util';

// // Create an asynchronous version of fs functions
// const writeFile = promisify(fs.writeFile);
// const unlinkFile = promisify(fs.unlink);

// const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
// const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];

// export async function POST(req) {
//   let filePath = ''; // Declare the filePath in the outer scope

//   try {
//     const formData = await req.formData();
//     const file = formData.get('file');

//     if (!file) {
//       return NextResponse.json({
//         status: 404,
//         message: 'File not found',
//       });
//     }

//     const fileType = file.type;
//     const fileSize = file.size;

//     // Validate file type
//     if (!ALLOWED_FILE_TYPES.includes(fileType)) {
//       return NextResponse.json({
//         status: 400,
//         message: 'Only PNG, JPG, or SVG files are allowed.',
//       });
//     }

//     // Validate file size
//     if (fileSize > MAX_FILE_SIZE) {
//       return NextResponse.json({
//         status: 400,
//         message: 'File size exceeds the 3MB limit.',
//       });
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Ensure the uploads directory exists
//     const uploadDir = path.join(process.cwd(), 'public/uploads');
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     // Create a unique filename based on the current timestamp
//     const filename = `${Date.now()}-${file.name}`;
//     filePath = path.join(uploadDir, filename); // Define filePath here

//     // Write the file to the upload folder
//     await writeFile(filePath, buffer);

//     return NextResponse.json({
//       data: {
//         url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${filename}`, // Path to access the uploaded file
//       },
//       status: 201,
//       message: 'Uploaded file successfully',
//     });
//   } catch (error) {
//     console.error('File upload error:', error);

//     // If an error occurs, try to delete the file if it was partially uploaded
//     if (filePath) {
//       try {
//         await unlinkFile(filePath);
//       } catch (unlinkError) {
//         console.error('Error deleting file:', unlinkError);
//       }
//     }

//     return NextResponse.json({
//       status: 500,
//       message: 'An error occurred during file upload.',
//       error: error.message,
//     });
//   }
// }
 