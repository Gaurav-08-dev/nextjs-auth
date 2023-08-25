import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email } = reqBody;

    const user = await User.findOne({
      email,
    });


    if (!user) {
      NextResponse.json({ error: "Email does not exists" }, { status: 400 });
    }

    await sendEmail({email,emailType:"RESET", userId:user._id})
    return NextResponse.json({
      message: "Email Sent",
      succcess: true,
    });
  } catch (error: any) {
    console.log("HERE");
    return NextResponse.json({ error: error.message });
  }
}
