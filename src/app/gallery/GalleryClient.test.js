//このファイルは「結合テスト」です。
//・GalleryClient.jsは何の「処理か？」
//1:カテゴリボタンを押したら、フィルタリングされたものを「右側のサムネイルに表示させる。」
//2:サムネイルを押したら「左側に選択された画像を表示させる。」

//■テストすべき処理一覧(これで結合テスト)
//テスト1: ①初期表示で最初の画像と全データが表示される
//テスト2: ②カテゴリボタン押下
//テスト3: ③サムネイルクリックで左画像が変わる

//⚠️「mockを使う」(モック:ダミーのデータや機能を返す「偽物」)」
//なぜか？GalleryClient.jsは、
//「next/navigation」と
//「next/image」を使っているので
//テスト環境では正しく動かないので「モック」を使う。

import { render, screen, fireEvent } from '@testing-library/react';
import GalleryClient from './GalleryClient';

////モックを作成する。
//・next/navigationは「useSearchParams(URLのクエリパラメーターを取得する)」ので『テスト環境では正しく動かない』のでモックを作ります。
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => null, //getが呼ばれても常に「null(何もない)」を返す。つまりselected = nullになる。
  }),
}));

//・next/imageは「画像最適化、lazy loading」などをしているので『テスト環境では正しく動かない』のでモックを作ります。
jest.mock('next/image', () => ({
  __esModule: true, //このモックはESModuleです。
  default: ({ priority, ...props }) => {
    //⬆︎next/imageは「default exportで『Imageコンポーネントを出力している』」ので、モックでも「default:」を作る。
    //({ priority, ...props }) ➡️ 意味は「priorityはimgに渡さない」「..propsは残りのpropsを<img>に渡す。」
    return <img {...props} />;
    //⬆︎そして<img src=''/>に置き換える。
  },
}));

////////////////////////
////////結合テスト////////
////////////////////////
describe('GalleryClientの結合テスト', () => {
  ////テスト1: ①初期表示で最初の画像と全データが表示される
  test('テスト1: ①初期表示で最初の画像と全データが表示される', () => {
    //準備
    render(<GalleryClient />);

    //実行
    const images = screen.getAllByRole('img');

    //確認
    expect(images.length).toBeGreaterThan(0); //「toBeGreaterThan」は数値または大きな整数値を比較するために使用します。つまりimages.lengthが「0より大きいか？(画像が1枚以上存在する)」
  });

  ////テスト2: ②カテゴリボタン押下
  test('テスト2: ②カテゴリボタン押下', () => {
    //準備
    render(<GalleryClient />);

    //実行
    const categoryButton = screen.getByText('フランス'); //screenは画面のDOM検索。ボタンは<li>で作成しているので「getByText('イタリア')」で取得する。
    fireEvent.click(categoryButton); //fireEventで「ユーザーがクリックした」をいう再現。

    //確認
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  ////テスト3: ③サムネイルクリックで左画像が変わる
  test('テスト3: ③サムネイルクリックで左画像が変わる', () => {
    //準備
    render(<GalleryClient />);
    // screen.debug(); //デバッグで表示

    //実行1: まずは「初期表示」の左側のメイン画像を保存
    const beforeImage = screen.getAllByRole('img'); //画面にある「すべてのimg要素」を上から順番に配列で返す。
    const beforeMainImage = beforeImage[0].getAttribute('src'); //getAttributeで「左側のメイン画像」を取得。
    //⬆︎beforeImage[0]は「なぜ左側のメイン画像」なのか？
    //「DOM要素の順番」が『そのまま配列の順番』になる。
    //つまり「左側のメイン画像はDOM要素が1個だけ」なので『beforeImage[0]は、左側のメイン画像が指定される。』

    //実行2: サムネイル画像をクリックする。
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);
    //⬆︎buttons[0]は「右側の1枚目のサムネイル画像ボタン」
    //つまりbuttons[1]は「右側の2枚目のサムネイル画像ボタン」になる。

    //実行3: サムネイルをクリック後「メイン画像を取得する。」
    const afterImages = screen.getAllByRole('img');
    const afterMainImage = afterImages[0].getAttribute('src');

    //確認: メイン画像が切り替わっているか(クリック前の"afterMainImage"と"beforeMainImage"を比較する)
    expect(afterMainImage).not.toBe(beforeMainImage);
    //⬆︎「not」の意味は『否定』
    //「toBe」の意味は『お互いが同じか比較する』
    //「.not.toBe」で『AとBが同じではないことを確認する。』
  });
});
