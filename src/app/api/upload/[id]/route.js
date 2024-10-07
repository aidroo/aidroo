import cloudinary from '@/utils/cloudinary';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    console.log(`Attempting to delete Cloudinary resource with public ID: ${id}`);

    if (!id) {
      return NextResponse.json({ message: 'Public ID is required.' }, { status: 400 });
    }

    // Delete the image from Cloudinary using the public ID
    const result = await cloudinary.uploader.destroy(id);
    console.log('Cloudinary delete result:', result);

    if (result.result === 'ok') {
      return NextResponse.json({ message: 'Image deleted successfully.' }, { status: 200 });
    } else if (result.result === 'not found') {
      return NextResponse.json({ message: 'Image not found in Cloudinary.', status: 404 });
    } else {
      return NextResponse.json({ message: 'Failed to delete image.', details: result }, { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting Cloudinary image:', error);
    return NextResponse.json({ message: 'Error deleting image.', error: error.message }, { status: 500 });
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
