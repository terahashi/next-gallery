import { Suspense } from 'react';
import GalleryClient from './GalleryClient'; //ギャラリーページのClient Component

//⬇︎export const dynamic = 'force-dynamic';　とは useSearchParams() を使うために「/gallery/page.jsを動的ページ」にする。
//👉 useSearchParams()は「ビルド時に確定しない情報」を読む。
//👉 だから、NextはSSG（静的生成）であり、「next build の時点でHTMLを全部作り切り、本番ではそのHTMLを配信するだけ。」
//👉 よって、ページを動的にしてください と指摘されている。
//・解決策はこの「ファイル自体を'force-dynamic'で動的ページ」にすること。
export const dynamic = 'force-dynamic'; //'force-dynamic' は、useSearchParams()を使用している「そのルートを代表する page.js」に書く必要がある

const Page = () => {
  return (
    //■<Suspense fallback={null}> とは「中のコンポーネントが“準備中”の間、何も表示しない」という意味です
    //・useSearchParams()をGalleryClient.jsで使用しているので「ビルド時(SSG)には "URLのクエリ(?selected=123)" は存在しない。」
    //■「このコンポーネントすぐ描画できない（待ちが必要）」→ <Suspense> に任せよう
    //・Suspense「読み込み待ちが必要だな」宣言
    //・fallback={null}「待ってる間に表示するもの。{null}なので待ってる間は何も描画しない」
    <Suspense fallback={null}>
      <GalleryClient />
    </Suspense>
  );
};

export default Page;
