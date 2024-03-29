// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getTodos } from "./getTodos";
import { postTodos } from "./postTodos";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  switch (method) {
    case "GET": {
      (async () => {
        const response = await getTodos(query);
        res.status(200).json(response);
      })();
      break;
    }
    case "POST": {
      (async () => {
        const response = await postTodos(body);
        res.status(201).json(response);
      })();
      break;
    }
    default:
      res.status(500).json({ message: "internal server error" });
  }
}
