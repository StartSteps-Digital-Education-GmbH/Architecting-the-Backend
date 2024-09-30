import { VercelRequest, VercelResponse } from "@vercel/node";
import { app, connectDB } from "../src/user-service/server.js";

const handeler = async (req: VercelRequest, res: VercelResponse) => {
    await connectDB();
    await app(req, res);
}

export default handeler;