'use client'; //styled-componentsを使うために必要。

import Link from 'next/link';
import styled from 'styled-components';
import { Wrapper, Inner } from './common/LayoutPrimitives';

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
            <Link href='/about'>ABOUT</Link>
            <Link href='/gallery'>GALLERY</Link>
          </div>
        </HeaderInner>
      </Wrapper>
    </HeaderWrap>
  );
};

export default Header;
