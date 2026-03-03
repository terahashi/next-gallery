//・勘違いしないための注意点
//本来「render」とは import { render, screen } from '@testing-library/react'
//を想像してしまいがちだけど「今回使用するのは/lib/render.js」なので名前が被ってしまう。
//将来的にコンポーネントをテストする際に「@testing-library/reactのrenderを使いたい場合」は「as」で名前を変えられる。
//import { render as rtlRender } from '@testing-library/react';

//⬇︎lib/render.jsをテストするためにimportする
import render from './render';

//⬇︎テストの流れ
//①準備
//②実行
//③確認

describe('render関数の単体テスト', () => {
  ////①準備
  const items = [
    {
      id: '2025-001',
      name: 'イタリアにて',
      categories: ['イタリア', '市街地'],
      year: 2025,
    },
    {
      id: '2024-001',
      name: 'イタリアにて',
      categories: ['イタリア', '海'],
      year: 2024,
    },
    {
      id: '2023-001',
      name: 'ポルトガルにて',
      categories: ['ポルトガル', '市街地'],
      year: 2023,
    },
  ];

  ////テスト1
  test('filtersなし(初期表示)の場合、全てカテゴリが表示される', () => {
    //②実行
    const result = render(items);

    //③確認
    expect(result[2025]).toHaveLength(1); //2025年の中身を取得して「toHaveLength(1)で配列の個数を確認する。この場合は配列の長さが1である。」
    expect(result[2024]).toHaveLength(1); //2024年の中身を取得して~
    expect(result[2023]).toHaveLength(1); //2023年の中身を取得して~
  });

  ////テスト2
  test('categoriesでフィルタリングする場合、指定したカテゴリのみ表示する', () => {
    //②実行
    const result = render(items, { categories: 'イタリア' });

    //③確認
    expect(result[2025][0].categories).toEqual(['イタリア', '市街地']); //2025年の中身を取得して「categoriesプロパティは['イタリア', '市街地']」であることを確認。
    expect(result[2024][0].categories).toEqual(['イタリア', '海']); //2024年の中身を取得して「categoriesプロパティは['イタリア', '海']」であることを確認。
    expect(result[2023]).toBeUndefined(); //2023年の中身には「イタリアが存在しないので『undefined』が返る。」
  });

  ////テスト3
  test('yearでフィルタした結果、指定した"年"だけが残るかを確認する', () => {
    //②実行
    const result2025 = render(items, { year: 2025 });
    const result2024 = render(items, { year: 2024 });

    //③確認(2025年)
    expect(Object.keys(result2025)).toEqual(['2025']); //.toEqualで配列とオブジェクトの中身を比較する。result2025のキーは「2025だけ」である。
    expect(result2025[2025]).toHaveLength(1); //「フィルタリング＋グルーピングされた結果、“2025年のキー” が1つだけ存在するか？」を確認する。
    expect(result2025[2024]).toBeUndefined(); //2025年の中身には「2024年が存在しないので『undefindが返る。』」

    //③確認(2024年)
    expect(Object.keys(result2024)).toEqual(['2024']);
    expect(result2024[2024]).toHaveLength(1);
    expect(result2024[2025]).toBeUndefined(); //2024年の中身には「2025年が存在しないので『undefindが返る。』」
  });
});
