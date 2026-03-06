//■テストすべき処理一覧(単体テスト)
//テスト1: {children}が表示されるか？
//テスト2: 共通コンポーネント<Header/><Footer/>が表示されるか

//⚠️「mockを使う」(モック:ダミーのデータや機能を返す「偽物」)」
//HeaderとFooter
//next-themes
//styled-components-registory
//を使用しているのでモック化します。

import { render, screen } from '@testing-library/react';
import RootLayout from './layout'; //layout.jsファイルを「RootLayoutというReactコンポーネント」として使う

//HeaderとFooterをモック化
jest.mock('../components/Header.jsx', () => () => <div>Header</div>); //Headerは「default export」で <div>Header</div>を返すだけ
jest.mock('../components/Footer.jsx', () => () => <div>Footer</div>); //Footerは「default export」で <div>Footer</div>を返すだけ

//next-themseをモック化
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }) => <div>{children}</div>, //ThemeProviderは<div>{children}</div>を返すだけ
}));

//styled-components-registoryをモック化
jest.mock('./lib/styled-components-registry.js', () => ({
  __esModule: true, //ESModuleを有効化
  default: ({ children }) => <div>{children}</div>, //styled-components-registryは「default export」で<div>{children}</div>を返すだけ
}));

////////////////////////
////////単体テスト////////
////////////////////////
describe('Layoutの単体テスト', () => {
  //テスト1: {children}が表示されるか？
  test('テスト1: {children}が表示されるか？', () => {
    /* ターミナルに「In HTML, <html> cannot〜」が出るが『エラーではない』 */
    /* テスト環境は<div>の中に「コンポーネントを入れる仕組み」なので、その結果「構造上仕方なく警告が出る」 */
    /* つまり<div>タグの中にrender自体の<html>タグを、仕方なく入れている */

    //①準備+実行
    render(
      <RootLayout>
        <div>テストコンテンツ</div>
      </RootLayout>,
    );

    //②確認
    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument(); //画面のDOMに「テストコンテンツ」という文字があることを期待する
  });

  //テスト2: 共通コンポーネント<Header/><Footer/>が表示されるか
  test('テスト2: 共通コンポーネント<Header/><Footer/>が表示されるか', () => {
    //①準備+実行
    render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );

    //②確認
    expect(screen.getByText('Header')).toBeInTheDocument(); //画面のDOMに「Header」という文字があることを期待する
    expect(screen.getByText('Footer')).toBeInTheDocument(); //画面のDOMに「Footer」という文字があることを期待する
  });
});
