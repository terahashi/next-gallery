////このjsxファイルは「Wrapper」や「Inner」を部品化して 全てのJSXファイルで使えるようにするためのもの。

'use client'; //styled-componentsを使うために必要。
import styled from 'styled-components'; //styled-components

const PageContainer = styled.div`
  padding-top: var(--header-height);
  min-height: 100dvh; //「コンテンツが少ないときでも、フッターを画面の一番下に押し止めるため」にmin-heightを設定
`;

//Wrapper
const Wrapper = styled.div`
  padding-left: clamp(16px, 4vw, 32px);
  padding-right: clamp(16px, 4vw, 32px);
`;

//Inner
const Inner = styled.div`
  width: 100%;
  max-width: var(--layout-max-width);
  padding-inline: var(--layout-padding);
  margin: 0 auto;
`;

//⬇︎名前付きexport
export { PageContainer, Wrapper, Inner };
