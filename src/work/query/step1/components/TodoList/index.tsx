import React from "react";

import _TodoList from "@/components/TodoList";

export default function TodoList() {
  /**
   * Note:
   * useQueryを使ってTodoの取得を実装する
   * Todo取得APIのエンドポイントは「/api/todos」です
   */

  return (
    <_TodoList
      todos={[]}
      handleChangeStatus={() => alert("未実装")}
      handleDelete={() => alert("未実装")}
    />
  );
};
