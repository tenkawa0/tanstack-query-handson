// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getTodos } from "./getTodos";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case "GET": {
      (async () => {
        const response = await getTodos(query);
        res.status(200).json(response);
      })();
      break;
    }
    default:
      res.status(500).json({ message: "internal server error" });
  }
}
