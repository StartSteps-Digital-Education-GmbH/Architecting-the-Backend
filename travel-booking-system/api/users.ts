import { VercelRequest, VercelResponse } from "@vercel/node";
import { app, connectToSQL } from "../src/user-service/server.js";

const handeler = async (req: VercelRequest, res: VercelResponse) => {
    await connectToSQL();
    await app(req, res);
}

export default handeler;