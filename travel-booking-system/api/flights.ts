import { app, connectToSQL } from "../src/flight-service/server.js";
import { VercelRequest, VercelResponse } from "@vercel/node";

const handeler = async (req: VercelRequest, res: VercelResponse) => {
    console.log("request is here");
    await connectToSQL();
    await app(req, res) //throw error no mongo db
}

export default handeler;