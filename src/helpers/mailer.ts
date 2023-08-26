import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // create a transporter
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 360000,
        }

        // { new: true, runValidators: true }
      );
    } else if (emailType === "RESET") {
      console.log("RESET")
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPassowordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 360000,
        }

        // { new: true, runValidators: true }
      );
    }

    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    const mailOptions = {
      from: "rajputgaurav712@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a>
        to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        } or copy and paste the link below in your browser.
        <br>${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken} </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};