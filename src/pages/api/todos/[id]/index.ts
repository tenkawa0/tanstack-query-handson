// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { patchTodo } from "./patchTodo";
import { deleteTodo } from "./deleteTodo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  switch (method) {
    case "PATCH": {
      (async () => {
        const id = query.id as string;
        const response = await patchTodo(id, body);
        res.status(200).json(response);
      })();
      break;
    }
    case "DELETE": {
      (async () => {
        const id = query.id as string;
        const response = await deleteTodo(id);
        res.status(200).json(response);
      })();
      break;
    }
    default:
      res.status(500).json({ message: "internal server error" });
  }
}
