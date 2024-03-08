import { Todo } from "@/types";
import fs from "fs";
import { setTimeout } from "timers/promises";

export type Response = null;

export async function deleteTodo(id: string) {
  const dbPath = process.cwd() + "/public/data.json";
  const data: Todo[] = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  const newData = data.find((item) => item.id === id);
  if (!newData) {
    throw new Error("Data Notfound");
  }
  fs.writeFileSync(
    dbPath,
    JSON.stringify(data.filter((item) => item.id !== id))
  );
  await setTimeout(2000);

  return null;
}
