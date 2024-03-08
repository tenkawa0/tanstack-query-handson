import { Todo } from "@/types";
import fs from "fs";
import { setTimeout } from "timers/promises";

export type RequestBody = {
  status: Todo["status"];
};

export type Response = Todo;

export async function patchTodo(id: string, body: RequestBody) {
  const dbPath = process.cwd() + "/public/data.json";
  const data: Todo[] = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  const newData = data.find((item) => item.id === id);
  if (!newData) {
    throw new Error("Data Notfound");
  }

  newData.status = body.status;
  fs.writeFileSync(
    dbPath,
    JSON.stringify(data.map((item) => (item.id === id ? newData : item)))
  );
  await setTimeout(2000);

  return newData;
}
