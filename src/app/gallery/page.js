import { Suspense } from 'react';
import GalleryClient from './GalleryClient'; //ギャラリーページのClient Component

//⬇︎export const dynamic = 'force-dynamic';　とはuseSearchParams()を使うために「/gallery/page.jsを動的ページ」にする。
//・nextは デフォルトでSSG。next build 時点では -> URLの?selected=xxx が存在しない。useSearchParams()を実行 -> エラーになる。
//・解決策は、この「ファイル自体を'force-dynamic'で動的ページ」にすること。
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <GalleryClient />
    </Suspense>
  );
}
