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
> ・Devtools：https://tanstack.com/query/latest/docs/framework/react/devtools<br/>
> ・Query Keys：https://tanstack.com/query/latest/docs/framework/react/guides/query-keys

<br/>

### step.3）staleTime の理解

> このパートでは `src/work/query/step3/TodoList/index.tsx`を編集します。<br/>
> 以下の URL 実際の動作確認ができるようになっています。<br/>
> http://localhost:3000/query/step3

キャッシュ管理の概要が理解できたので、本パートでは`staleTime`について理解します。<br/>
`src/work/query/step3/TodoList/index.tsx`では、ローディング表示の制御に使っていた`isPending`を`isFetching`に変更しています。<br/>
どう変わったのか http://localhost:3000/query/step3 を開いて確認してみましょう。<br/>

一度データを取得したページを表示する際に、再度ローディング表示がでるようになっているのがわかります。<br/>
これはキャッシュを参照した際に、そのキャッシュが`Inactive = データが古い`になっている場合はデータがリフェッチされるようになっているからです。<br/>
なのでページネーションは厳密にはキャッシュしてあるデータを画面に表示している裏で、データをリフェッチしているということです。<br/>

キャッシュが`Inactive`と判定されるのは`staleTime`の設定が影響します。<br/>
`staleTime`はデフォルトで 0 秒と設定されています。<br/>
つまりデータをフェッチしてキャッシュされた時点で、そのデータは`Inactive = 古いデータ`となります。<br/>

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

ちなみに`QueryClient`に`staleTime`を設定すれば、すべての`useQuery`に`staleTime`を適用することも可能なので、一律で設定してする手もあります。

> 【参考】<br/>
> ・QueryClient：https://tanstack.com/query/latest/docs/reference/QueryClient

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

## Todo の追加・更新・削除（Mutation）

## 参考情報

- https://tkdodo.eu/blog/practical-react-query
  - TanStack Query を使いこなすための Tips が様々紹介されています
  - TanStack Query を使ってて「これどうするのがいいんだ？」って思ってたら真っ先に参照してほしい情報です
- https://query.gg/
  - TanStack Query 公式が学習コースを制作中です、気になる方は是非チェック
  - 上記ブログの著者が関わっているので公開前から信頼感がすごい、はやく公開してほしい
