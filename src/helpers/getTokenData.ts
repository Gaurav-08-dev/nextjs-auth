import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export function getTokenData(request: NextRequest) {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET!
    ) as JwtPayload;
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
