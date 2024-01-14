import connectMongoDB from "@/libs/mongodb";
import Job from "@/models/job";
import {NextRequest, NextResponse} from "next/server";
import qs from "querystring";

export async function POST(request: Request) {
  const {title, description, amount, city} = await request.json();
  await connectMongoDB();
  await Job.create({title, description, amount, city});
  return NextResponse.json({message: "Topic Created"}, {status: 201});
}

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const id = request.nextUrl.searchParams.get("id");

    if (id) {
      const jobs = await Job.find({_id: id});
      return NextResponse.json({jobs});
    } else {
      const jobs = await Job.find();
      return NextResponse.json({jobs});
    }
  } catch (error) {}
}
