//Next.js公式を参照。
//　https://nextjs.org/docs/app/guides/testing/jest

//■「jest.setup.jsファイル」とはJestを実行する前に、毎回自動で読み込まれる“準備ファイル”
// @testing-library/jest-domは「toBeInTheDocument()」などを使用する。
//「toBeInTheDocument()」を使用するために事前に読み込ませておく。

//■「toBeInTheDocument()」は『DOM（画面）に存在するかどうかを確認するために使うReact、Nextコンポーネントのテスト専用。』
////⬇︎使用例
//render(<Header />)
//expect(screen.getByText('タイトル')).toBeInTheDocument()

import '@testing-library/jest-dom';
