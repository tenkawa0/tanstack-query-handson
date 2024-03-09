import type { DefineMethods } from "aspida";

type Todo = {
  id: string;
  title: string;
  status: "todo" | "done";
};

export type Methods = DefineMethods<{
  delete: {
    resBody: null;
  };

  patch: {
    reqBody: {
      status: "todo" | "done";
    };

    resBody: Todo;
  };
}>;
