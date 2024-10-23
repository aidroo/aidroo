import { NextResponse } from "next/server";
import { profileUser } from "../data";

export async function GET(request, response) {
  return NextResponse.json(profileUser, { status: 200 });
}
