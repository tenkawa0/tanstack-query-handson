import { Todo } from "@/types";
import fs from "fs";
import { setTimeout } from "timers/promises";

export type RequestBody = {
  title: string;
};

export type Response = Todo;

export async function postTodos(body: RequestBody) {
  const dbPath = process.cwd() + "/public/data.json";
  const data: Todo[] = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  const newData: Response = {
    id: `todo-${data.length + 1}`,
    title: body.title,
    status: "todo",
  };
  fs.writeFileSync(dbPath, JSON.stringify([newData, ...data]));
  await setTimeout(2000);

  return newData;
}
