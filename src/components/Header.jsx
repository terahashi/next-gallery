'use client'; //styled-componentsを使うために必要。

import Link from 'next/link';
import styled from 'styled-components';
import { Wrapper, Inner } from './common/LayoutPrimitives';

//⭐️ダークモード「next-themes」
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

//「Heroiconsライブラリ」月のアイコン、太陽のアイコン
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

//⭐️「アクティブリンク」で現在いるページのリンクに「.is-activeクラス」を付与する。
//・usePathname() × clsx
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
  color: #000;
  //⬇︎ダークモード時
  html.dark & {
    background-color: #1c1c1c;
    color: #fff;
  }
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
    color: #000;
    //⬇︎ダークモード時
    html.dark & {
      color: #fff;
    }
    &.is-active {
      font-weight: bold;
    }
    &.is-active::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 2.5px;
      /* background-color: #000; */
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

  //⬇︎ダークモード「next-themes」のための処理。
  //・useTheme()で現在のテーマ(ライトモードかダークモードか)を取得。
  const { resolvedTheme, setTheme } = useTheme();

  //⬇︎「mounted」はHeaderコンポーネント全体を描画するために使う。
  //なぜ必要か？useTheme()は「クライアント依存」です。
  //クライアントでようやく「localStorageやsystem設定を読める。」
  //mountedが無いと「Hydrationエラー」になる。
  //つまりmountedは「テーマ(ライトモードかダークモードか)がクライアントで確定するまで 描画を待つ仕組み」
  const [mounted, setMounted] = useState(false);

  //⬇︎mounted。useEffectで「mountedをtrueにする。」
  useEffect(() => {
    setMounted(true);
  }, []);

  //・クライアントでマウントされるまで、このコンポーネントは描画しない。」
  // mountedが「trueでない場合」はnullを返す。
  if (!mounted) return null;

  return (
    <HeaderWrap>
      <Wrapper>
        <HeaderInner>
          <div className='logo'>
            <Link href='/'>
              <h1 className='mb-0 font-bold text-[1rem] md:text-[1.5rem]'>GALLERY</h1>
            </Link>
          </div>

          <div className='pc-menu gap-x-4 md:gap-x-7'>
            {/* <Link href='/about' className={clsx(pathname === '/about' && 'is-active')}>
              ABOUT
            </Link> */}
            <Link href='/gallery' className={clsx(pathname === '/gallery' && 'is-active')}>
              GALLERY
            </Link>

            {/* ⬇︎⭐️ダークモードの切り替えボタン */}
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className='cursor-pointer px-2 py-2 rounded border text-black dark:text-white border-[#797979] bg-[#ffffff] dark:bg-[#1c1c1c] transition-colors'
            >
              {resolvedTheme === 'dark' ? <SunIcon className='w-5 h-5' /> : <MoonIcon className='w-5 h-5' />}
            </button>
          </div>
        </HeaderInner>
      </Wrapper>
    </HeaderWrap>
  );
};

export default Header;
