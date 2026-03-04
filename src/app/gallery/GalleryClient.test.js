//このファイルは「結合テスト」です。
//・GalleryClient.jsは何の「処理か？」
//1:カテゴリボタンを押したら、フィルタリングされたものを「右側のサムネイルに表示させる。」
//2:サムネイルを押したら「左側に選択された画像を表示させる。」

//■テストすべき処理一覧(これで結合テスト)
//①初期表示で最初の画像と全データが表示される
//②カテゴリボタン押下
//③サムネイルクリックで左画像が変わる

//⚠️「mockを使う」(モック:ダミーのデータや機能を返す「偽物」)」
//なぜか？GalleryClient.jsは next/navigation と next/image を使っているので「モック」を使う。

import { render, screen } from '@testing-library/react';
import GalleryClient from './GalleryClient';
import { useSearchParams } from 'next/navigation';

////mock
jest.mock('next/navigation', () => {
  useSearchParams: () => ({
    get: () => null, //getが呼ばれても常にnull(何もない)を返す
  });
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

////テスト1: ①初期表示で最初の画像と全データが表示される
