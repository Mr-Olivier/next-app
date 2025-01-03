import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id: 1, name: "Mosh" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // validate the request body
  // If invalid, return 400
  // Fetch the user with the given id
  // If doesn't exist, return 404
  // Update the user
  // Return the updated user
  const body = await request.json();
  if (!body.name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id: 1, name: body.name });
}

export function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Fetch user from db
  // If not found, return 404
  // Delete the user
  // Return 200

  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({});
}
