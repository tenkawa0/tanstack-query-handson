import type { DefineMethods } from "aspida";

type Todo = {
  id: string;
  title: string;
  status: "todo" | "done";
};

export type Methods = DefineMethods<{
  get: {
    query?: {
      page: number;
    };

    resBody: {
      hasPrev: boolean;
      hasNext: boolean;
      total: number;
      items: Todo[];
    };
  };

  post: {
    reqBody: {
      title: string;
    };

    resBody: Todo;
  };
}>;
