
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    console.log(id)

    if (!id) {
      return NextResponse.json({ message: 'File ID is required.' }, { status: 400 });
    }

    // Assuming the ID corresponds to the file name or unique identifier
    const fileName = id;  // In this case, the ID will be the file name
    const filePath = path.join(process.cwd(), 'public/uploads', fileName);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlinkSync(filePath);
      return NextResponse.json({ message: 'File deleted successfully.' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'File not found.' }, { status: 404 });
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error deleting file.', error: error.message }, { status: 500 });
  }
}

// import db from "@/config/model";
// import cloudinary from "@/utils/cloudinary";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const body = await req.json(); // Await the JSON body
//     const { username, avatarId, role } = body;

//     // Validate the publicId
//     if (username && role) {
//       if (role === "business") {
//         const user = await db.BusinessProfile.findOne({
//           where: { username: username },
//         });

//         // You would perform your deletion logic here
//         user.profileThumb = "";
//         user.save();
//       }
//       if (role === "personal") {
//         const user = await db.PersonalProfile.findOne({
//           where: { username: username },
//         });
//         user.profileThumb = "";
//         user.save();
//       }
//     }

//     await cloudinary.uploader.destroy(avatarId);
//     return NextResponse.json({
//       status: 200,
//       message: "File deleted successfully",
//     });
//   } catch (error) {
//     return NextResponse.json({ status: 500, message: "Server error" });
//   }
// }
