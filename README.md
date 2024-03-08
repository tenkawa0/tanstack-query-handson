## はじめに

本ハンズオンでは、簡単な Todo アプリを題材に「[TanStack Query](https://tanstack.com/query/latest)」の使い方を解説します。<br/>
Todo アプリは React(Nextjs)で実装していますが、TanStack Query は React 以外のフロントエンドフレームワークでも利用可能です。<br />
2024/03/09 時点では React, Solid, Vue, Svelte, Angular に対応しています。<br />
それぞれのフレームワークで使用方法が異なる部分もありますが、基本的な使用方法は同じです。

それではまずはじめに 題材の Todo アプリを確認してみましょう。
すでに環境構築済みのリポジトリなので、以下のコマンドを実行して[http://localhost:3000](http://localhost:3000)にアクセスしてください。

```bash
npm install
npm run dev
```

開始時点では何も操作できない Todo アプリですが、こちらの Todo の取得・追加・更新・削除を実装して TanStack Query の使い方を体験していただきます。

> 環境構築の詳細は以下を御覧ください<br/>
> ・ [Installation](https://tanstack.com/query/latest/docs/framework/react/installation)<br/>
> ・ [Quick Start](https://tanstack.com/query/latest/docs/framework/react/quick-start)

## ディレクトリ構成

- `public`
  - `data.json`：DB の代わりとして json ファイルに Todo データを保存します
- `src`
  - `components`：コンポーネント
  - `pages`：ルーティング
    - `api/todos`：Todo の取得・追加・更新・削除を提供する API を実装
  - `types`：型定義
  - `work`：ハンズオンで使用するディレクトリ

## Todo の取得（Query）

このパートでは TanStack Query でのデータ取得方法を理解します。<br />
まずは完成形のアプリを確認しましょう。以下の URL にアクセスしてください。

http://localhost:3000/query

完成形のソースコードは `src/work/query/sample`を参照してください。
この完成形を目指して順番にデータ取得方法を理解していきます。

<br/>

### step.1）useQuery の使い方

> このパートでは `src/work/query/step1/TodoList/index.tsx`を編集します。<br/>
> 以下の URL 実際の動作確認ができるようになっています。<br/>
> http://localhost:3000/query/step1

データ取得には、TanStack Query の`useQuery`を使用します。<br />
基本的な使い方は以下の通り。<br/>
実際に Todo 取得処理を実装してみましょう。

```jsx
const { data } = useQuery({
  queryKey: ["todos"],
  queryFn: async () => {
    const { data } = await axios.get("/api/todos"); //Todo取得APIのエンドポイント
    return data;
  },
});
```

`useQuery`は、`queryFn`でフェッチしたデータを`queryKey`に基づいてキャッシュ管理してくれるようになっています。
上記の例では`axios`を使ってデータをフェッチしたあと、フェッチしたデータを`todos`というキーでキャッシュしているということですね。
このキャッシュ管理が TanStack Query のコアになります。

また`useQuery`はフェッチの状態も取得できるようになっています。<br/>
試しに`isPending（まだデータが取得できていない）`を使ってローディング表示を追加してみましょう。

```jsx
const { data, isPending } = useQuery(...);
```

そのほかフェッチがエラーになった場合の`isError`や、データフェッチ中の`isFetching`なんかもあり、細かく UI の状態を制御しやすくなっています。<br/>

> 【参考】<br/>
> ・https://tanstack.com/query/latest/docs/framework/react/guides/queries<br/>
> ・https://tanstack.com/query/latest/docs/framework/react/reference/useQuery

<br/>

### step.2）キャッシュ管理の理解

> このパートでは `src/work/query/step2/TodoList/index.tsx`を編集します。<br/>
> 以下の URL 実際の動作確認ができるようになっています。<br/>
> http://localhost:3000/query/step2

`useQuery`の使い方がわかったので、本パートではキャッシュ管理についての理解を深めていきます。<br/>
TanStack Query にはどのようにキャッシュ管理されているのかを確認できる`Devtools`があるので、まずはそれを確認してみましょう。
http://localhost:3000/query/step2 を開き、画面右下にアイコンをクリックしてください。それが`Devtools`です。<br/>

では次に、実際データがキャッシュされているのかわかりやすいようにページネーションを実装しましょう。<br/>
実装イメージは以下の通り。

```jsx
const [page, setPage] = useState(1);

const { data } = useQuery({
  queryKey: ["todos", { page }],
  queryFn: async () => {
    const { data } = await axios.get("/api/todos", { params: { page } }); //Todo取得APIのエンドポイント
    return data;
  },
});
```

`useQuery`ではキャッシュ管理に存在していない`queryKey`を指定した場合、新しくデータがフェッチされるようになります。<br/>
なのでページネーションではページ番号を`queryKey`に指定します。<br/>
もし`queryKey`にページ番号を含めなかった場合、次のページがフェッチされないことも確認してみましょう。

次のページがフェッチされるようになったので、次は前のページをクリックしてみましょう。<br/>
次のページに比べてデータの表示が格段に早いことが確認できます。<br/>
これがキャッシュされていることによる恩恵になります。<br/>

> 【参考】<br/>
> ・https://tanstack.com/query/latest/docs/framework/react/devtools<br/>
> ・https://tanstack.com/query/latest/docs/framework/react/guides/query-keys

<br/>

### step.3）staleTime の理解

> このパートでは `src/work/query/step3/TodoList/index.tsx`を編集します。<br/>
> 以下の URL 実際の動作確認ができるようになっています。<br/>
> http://localhost:3000/query/step3

キャッシュ管理の概要が理解できたので、本パートでは`staleTime`について理解します。<br/>
`src/work/query/step3/TodoList/index.tsx`では、ローディング表示の制御に使っていた`isPending`を`isFetching`に変更しています。<br/>
どう変わったのか http://localhost:3000/query/step3 を開いて確認してみましょう。<br/>

一度データを取得したページを表示する際に、再度ローディング表示がでるようになっているのがわかります。<br/>
これはページをレンダリングするときに、参照するキャッシュが`Stale = データが古い`になっている場合はデータがリフェッチされるようになっているからです。<br/>
なのでページネーションは厳密にはキャッシュしてあるデータを画面に表示している裏で、データをリフェッチしているということです。<br/>

キャッシュが`Stale`と判定されるのは`staleTime`の設定が影響します。<br/>
`staleTime`はデフォルトで 0 秒と設定されています。<br/>
つまりデータをフェッチしてキャッシュされた時点で、そのデータは`Stale = 古いデータ`となります。<br/>

🤔🤔🤔

これだけ聞いても意味不明だと思います。<br/>
`staleTime`をどう使いこなすかはプロダクトの性質によりますが、多くの場合でフェッチの重複を排除するのに役立ちます。<br/>
例えば、ページネーションだと短時間で「1 ページ目表示->2 ページ目表示->1 ページ目表示」と操作した場合、リアルタイム性を求められない限りは 1 ページ目のデータを再度フェッチしなくても OK と言えます。<br/>
なので`staleTime`を 10 秒などに設定して不要なフェッチを減らすという戦略がとれます。

それでは実際に`staleTime`を設定してみましょう。

```jsx
const { data } = useQuery({
  queryKey: ["todos", { page }],
  queryFn: async () => {
    const { data } = await axios.get("/api/todos", { params: { page } }); //Todo取得APIのエンドポイント
    return data;
  },
  staleTime: 10 * 1000, //10秒
});
```

ちなみに`QueryClient`に`staleTime`を設定すれば、すべての`useQuery`に`staleTime`を適用することも可能なので、一律で設定してする手もあります。<br/>
また、ページを切り替えて参照されなくなったキャッシュは`Inactive`という状態になり、こちらは`cacheTime(デフォルト5分)`が過ぎるとキャッシュから削除されます。<br/>
`staleTime`と`cacheTime`については理解が難しいので、TanStack Query に慣れてきた頃に復習するのがおすすめです。

> 【参考】<br/>
> ・https://tanstack.com/query/latest/docs/reference/QueryClient

<br/>

### Tips

#### custom hooks

都度`useQuery`を定義していると、別の箇所で使用している`queryKey`を使ってしまい、キャッシュ管理が意図したようにならない事態が発生します。<br/>
そこで`useQuery`を使用する場合は、原則 custom hooks を定義して使用するのがおすすめです。

`src/work/query/sample/api/getTodos.ts`に実装例があるので参考にしてください。

#### queryKey の管理

この後解説する`Mutation`では`queryKey`を指定してキャッシュのデータをリフェッチするという操作が必要になってきます。<br/>
その時`queryKey`を定義ごとに手動で設定していると、参照したいキャッシュの`queryKey`がなんだった訳が分からなくなる恐れがあります。

そこでおすすめなのが以下の記事で紹介されている方法です。<br/>
https://tkdodo.eu/blog/effective-react-query-keys

## Todo の更新（Mutation）

このパートでは TanStack Query でのデータ更新方法を理解します。<br />
まずは完成形のアプリを確認しましょう。以下の URL にアクセスしてください。

http://localhost:3000/mutation

完成形のソースコードは `src/work/mutation/sample`を参照してください。
この完成形を目指して順番にデータ更新方法を理解していきます。

<br/>

### step.1）useMutation の使い方

> このパートでは `src/work/mutation/step1/components/TodoAddForm/index.tsx`を編集します。<br/>
> 以下の URL 実際の動作確認ができるようになっています。<br/>
> http://localhost:3000/mutation/step1

データ更新には、TanStack Query の`useMutation`を使用します。<br />
基本的な使い方は以下の通り。<br/>
実際に Todo の追加処理を実装してみましょう。

```jsx
const { mutate, isPending } = useMutation({
  mutationFn: async ({ body }: Variables) => {
    const { data } = await axios.post("/api/todos", body);
    return data;
  },
});

const handleSubmit = (variables: Variables) => {
  mutate(variables);
};
```

`useMutation`は、`mutationFn`でデータの更新処理を定義し,データ更新を実行したいタイミングで`mutate`を呼び出すようにします。<br/>
`useQuery`同様`isPending`でデータの更新中かを確認できるようになっています。

しかし、上記だけでは Todo の追加はできてもデータの表示が更新されません。<br/>
それについては次のパートで説明します。

> 【参考】<br/>
> ・https://tanstack.com/query/latest/docs/framework/react/guides/mutations<br/>
> ・https://tanstack.com/query/latest/docs/framework/react/reference/useMutation

<br/>

### step.2）invalidateQueries の使い方

> このパートでは `src/work/mutation/step2/components/TodoAddForm/index.tsx`を編集します。<br/>
> 以下の URL 実際の動作確認ができるようになっています。<br/>
> http://localhost:3000/mutation/step2

データ取得の際に、キャッシュの状態が`Stale`なときにデータがリフェッチされると説明しました。<br/>
その他にも`invalidateQueries`を用いることで、指定した`queryKey`のキャッシュをリフェッチすることができます。<br/>
実際に Todo のリフェッチ処理を実装してみましょう。

```jsx
const queryClient = useQueryClient();
const { mutate, isPending } = useMutation({
  mutationFn: async ({ body }: Variables) => {
    const { data } = await axios.post("/api/todos", body);
    return data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});
```

上記の追加で確かにデータの表示が更新されるようになりましたが、更新完了からデータのリフェッチまでにラグがあるため、一瞬 UI がフリーズしたかのように感じてしまいますね。<br/>
なので、`isFetching`を使ってリフェッチ中であることがわかるように修正してみましょう。

```jsx
const { data, isFetching } = useQuery(...);
```

以上、データ更新のやりかたが分かったところで、最後に Todo の完了・削除も実装してみましょう。

> 【参考】<br/>
> ・https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation

<br/>

### Tips

#### レスポンスを使ったキャッシュの更新

キャッシュは`queryKey`を指定して、手動で内容を更新することが可能です。<br/>
これを応用すれば、POST や PUT でデータ更新した際のレスポンスデータを使ってキャッシュを更新できます。
詳しくは以下のドキュメントで解説されています。<br/>
https://tanstack.com/query/latest/docs/framework/react/guides/updates-from-mutation-responses

この手法を用いれば、データ更新後のリフェッチを行う必要がないため、より早く UI のデータ表示を更新することが可能になるため、ユーザー体験の向上につながるのですが、コーディングミスによる不具合も埋め込みやすくなります。<br/>
今まではデータ更新をしたらとりあえずリフェッチしていればよかったところが、キャッシュで管理しているデータのうち、どの`queryKey`のどのプロパティを変更すればいいのか等、システムの仕様に精通していないと実装が困難になる場面に出くわします。

#### Optimistic Updates(楽観更新)

こちらはレスポンスを使ったキャッシュの更新より、さらにアグレッシブにキャッシュの内容を書き換える方法です。<br/>
例えばアイテムを削除した場合、削除のレスポンスが帰って来る前に、削除したアイテムをキャッシュから消してしまうといった処理になります。<br/>
詳しくは以下のドキュメントで解説されています。<br/>
https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates

こちらは更新時のレスポンスを待たないため、非常にキビキビ UI が動作しているような挙動になるのですが、いざエラーが発生したときの表示がとても難しいです。<br/>

本来なら「データ更新 -> ローディング -> エラー」と動機的に処理されるので、いまやった操作がうまくいかなかったことがわかるのですが、楽観更新の場合は「データ更新 -> データ表示の更新 -> (...しばらくたって) -> エラー」という流れになります。<br/>
このエラーが表示されるまでの間に、他のデータ更新も行う可能性があるので、エラーが発生した場合どの操作に対するエラーなのか、どこまでの処理をロールバックするのかといった対応が必要になり、実装の複雑度がとても上がります。<br/>

ただ使いこなした場合は、とてもストレスフリーな操作感をユーザーに提供できるポテンシャルをもっている機能です。

## さいごに

以上で本ハンズオンの内容は終了です。<br/>
TanStack Query には今回紹介できていない機能がまだまだあります。<br/>
機能が豊富な分、キャッチアップが大変ではありますがとても便利なライブラリなため、是非一度プロダクト開発に採用してみてください。

もうちょっとライトに使いたい場合は `SWR`というライブラリもあるため、こちらのドキュメントを覗いてみるのも面白いですよ。<br>
https://swr.vercel.app/ja
