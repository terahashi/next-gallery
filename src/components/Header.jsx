'use client'; //styled-componentsを使うために必要。

import Link from 'next/link';
import styled from 'styled-components';
import { Wrapper, Inner } from './common/LayoutPrimitives';

//⭐️アクティブリンクで現在いるページのリンクに目印を付与する。
// 「usePathname() × clsx」
//clsxとは？ -> クラス制御。「条件付き className を超シンプルに書けるツール」
//普通だと <Link href="/gallery" className={pathname === '/gallery' ? 'active' : ''} だが今回は勉強のためにclsxを使う。
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  z-index: 1000;
  .logo {
    position: relative;
  }
  .pc-menu {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
  }
  a {
    font-size: 1.1rem;
    position: relative; //::after用に必須
    &.is-active {
      color: #000;
      font-weight: bold;
    }
    &.is-active::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 2.5px;
      background-color: #000;
    }
  }
`;

//メモ:import { Inner }を上書きして使用できます。
const HeaderInner = styled(Inner)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--layout-padding);
`;

const Header = () => {
  //⬇︎usePathname()で現在のルートのパス名を文字列として取得
  const pathname = usePathname();

  return (
    <HeaderWrap>
      <Wrapper>
        <HeaderInner>
          <div className='logo'>
            <Link href='/'>
              <h1 className='mb-0 font-bold'>GALLERY</h1>
            </Link>
          </div>

          <div className='pc-menu gap-x-10'>
            {/* <Link href='/about' className={clsx(pathname === '/about' && 'is-active')}>
              ABOUT
            </Link> */}
            <Link href='/gallery' className={clsx(pathname === '/gallery' && 'is-active')}>
              GALLERY
            </Link>
          </div>
        </HeaderInner>
      </Wrapper>
    </HeaderWrap>
  );
};

export default Header;
