import { Todo } from "@/types";
import fs from "fs";
import { setTimeout } from "timers/promises";

export type Query = {
  page?: number;
};

export type Response = {
  hasPrev: boolean;
  hasNext: boolean;
  total: number;
  items: Todo[];
};

function paginate(items: any[], { page }: Query) {
  if (!page) {
    return {
      hasPrev: false,
      hasNext: false,
      total: items.length,
      items: items,
    };
  }

  const size = 5;
  const offset = size * (page - 1);
  const totalPages = Math.ceil(items.length / size);
  return {
    hasPrev: !!(page - 1),
    hasNext: totalPages > page,
    total: items.length,
    items: items.slice(offset, size * page),
  };
}

export async function getTodos(query: Query) {
  const dbPath = process.cwd() + "/public/data.json";
  const data = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  await setTimeout(2000);
  return paginate(data, query);
}
