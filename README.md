# Next Gallery Site

## 概要

Next.js（App Router）を用いて作成した画像ギャラリーサイトです。
SSR / SSGを活用したレンダリング設計から実装、テスト（Jest）まで一貫して行いました。
パフォーマンスとUXを意識し、実務を想定した構成で開発しています。

## URL

https://next-gallery-azure.vercel.app/

## 使用技術

- Next.js（App Router / SSR / SSG）
- JavaScript
- Tailwind CSS
- Styled-components
- Jest（テスト）
- Git / GitHub
- Vercel（デプロイ）

## 主な機能

- 画像一覧表示
- タグによるフィルタリング機能
- グルーピングによる関連画像表示
- ランダム画像表示（トップページ）
- スクロールや操作に応じた動的UI
- レスポンシブ対応
- テストコードによるロジック検証（Jest）

## 工夫した点

- App Routerを用いたルーティング設計を行い、SSR / SSGを適切に使い分け
- フィルタリングとグルーピング処理を実装し、タグ選択に応じた動的な画像表示を実現
- トップページではforce-dynamicを使用し、ランダム表示をSSRで実現
- コンポーネント設計を意識し、再利用性・保守性の高い構成を構築
- Next.js × Vercelの構成により、最適なデプロイ環境を実現
- Jestを用いてロジックのテストを行い、品質担保を意識

## セットアップ方法

以下の手順でローカル環境で動作確認できます。

```
npm install
npm run dev
```

テスト実行

```
npm run test
```
