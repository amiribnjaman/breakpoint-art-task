import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

// Use body-parser middleware
const jsonParser = bodyParser.json();

export function handler(req, res) {
  if (req.method === "POST") {
    // Use body-parser middleware to parse JSON
    jsonParser(req, res, async () => {
      try {
        const data = req.body;
        console.log("Request Body:", data);

          

        res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error handling POST request:", error);
        res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }
    });
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
