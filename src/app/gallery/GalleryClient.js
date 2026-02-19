////ギャラリーページ
'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'; //Next.jsでは基本的に <Image />コンポーネントを使う
import clsx from 'clsx';

//⬇︎lib/data
import itemsData from '@/data/itemsData.js';
import render from '../lib/render';

//⬇︎コンポーネント
import { Wrapper, Inner } from '../../components/common/LayoutPrimitives';
import styled from 'styled-components';

//styled-components
//上部フィルタボタン
const ListButton = styled.li`
  cursor: pointer;
  /* display: inline-block; */
  border-radius: 3em;
  letter-spacing: 0.1em;
  padding: 2px 5px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  border: 2px solid rgb(15, 118, 144);
  color: rgb(15, 118, 144);

  &:hover {
    opacity: 0.7;
  }

  //⬇︎{ $isActive }は分割代入。propsの中の$isActiveプロパティを取り出して使う。
  ${({ $isActive }) =>
    $isActive &&
    //&& 論理AND演算子で、$isActiveがtrueの場合に下記のcssが適用される
    `
      background-color: rgb(15, 118, 144);
      color: #fff;
      font-weight: bold;
    `}
`;

const Gallery = () => {
  //⬇︎フィルタリングを管理するState
  const [filter, setFilter] = useState(null);

  //⬇︎「選択中の画像」を管理するstate
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('selected');
  const initialImage = itemsData.find((item) => String(item.id) === selectedId) ?? itemsData[0];
  const [selectedImage, setSelectedImage] = useState(initialImage);

  ////⬇︎grouped関数
  //・render関数を実行してフィルタリング+グルーピングを実行 -> 結果を取得する関数
  //・useMemo(値のメモ化)...重い計算処理を毎回実行しないようにするため。
  const grouped = useMemo(() => {
    //⬇左:filterがnullの場合の処理。 render(itemsData)の場合は「全てのitemsDataを取得する。」
    //⬇右:filterに{ categories: 'vegetable' }のように存在する場合の処理。render(itemsData,{ categories: filter })の場合は「フィルタリング+グルーピングされた『items』を取得する。」
    const result = !filter ? render(itemsData) : render(itemsData, { categories: filter });

    return result;
  }, [filter]); //⬅︎再実行の条件。filterが変わったら再実行する。

  return (
    <Wrapper>
      <Inner>
        <div className='mt-[170px]'>
          {/* flex */}
          <div className='flex mt-[50px] items-start justify-center gap-x-5'>
            {/* ⬇︎左表示(画像表示エリア)：サムネイルでクリックされた画像を大きく表示する */}
            <div className='flex-[2] flex justify-start items-center flex-col self-start md:m-[50px_80px] w-full max-w-[900px]'>
              {selectedImage && <Image src={selectedImage.src} alt={selectedImage.name} width={selectedImage.width} height={selectedImage.height} className='w-full h-auto object-cover' priority />}
            </div>

            {/* ⬇︎右表示(サムネイル)：グルーピングされた結果を表示する */}
            <div className='flex-1 flex flex-col p-[0] pb-[30vh]'>
              {/* 上部のカテゴリボタン */}
              <div className='m-[0_0_20px]'>
                <ul className='flex justify-start items-center flex-wrap gap-1'>
                  <ListButton $isActive={filter === null} onClick={() => setFilter(null)}>
                    全て
                  </ListButton>
                  <ListButton $isActive={filter === 'vegetable'} onClick={() => setFilter('vegetable')}>
                    イタリア
                  </ListButton>
                  <ListButton $isActive={filter === 'fruit'} onClick={() => setFilter('fruit')}>
                    ポルトガル
                  </ListButton>
                  <ListButton $isActive={filter === 'fish'} onClick={() => setFilter('fish')}>
                    スペイン
                  </ListButton>
                  <ListButton $isActive={filter === 'fish'} onClick={() => setFilter('fish')}>
                    スペイン
                  </ListButton>{' '}
                  <ListButton $isActive={filter === 'fish'} onClick={() => setFilter('fish')}>
                    スペイン
                  </ListButton>{' '}
                  <ListButton $isActive={filter === 'fish'} onClick={() => setFilter('fish')}>
                    スペイン
                  </ListButton>{' '}
                  <ListButton $isActive={filter === 'fish'} onClick={() => setFilter('fish')}>
                    スペイン
                  </ListButton>
                </ul>
              </div>

              <div className='scroll-area overflow-y-scroll overflow-x-hidden max-h-[65vh] p-[0] pb-[30vh]'>
                {Object.entries(grouped)
                  .sort((a, b) => b[0] - a[0])
                  .map(([year, items]) => (
                    <section key={year}>
                      <div className='flex'>
                        {/* 年 */}
                        <p className='mb-0'>{year}年</p>
                        <div className='ss'></div>
                      </div>

                      {/* ⬇︎「サムネイル画像達を表示」する。つまりitemを表示(フィルタリング+グルーピングされたデータ) */}
                      <div className='flex justify-start flex-nowrap'>
                        {items.map((item) => (
                          <div key={item.name}>
                            {/* 名前を表示 */}
                            {/* <div>
                                <span>{item.name}</span>
                              </div> */}

                            {/* (サムネイル)表示 */}
                            <button
                              type='button'
                              onClick={() => setSelectedImage(item)}
                              className={clsx('cursor-pointer inline-block border-2', selectedImage?.id === item.id ? 'border-sky-400' : 'border-transparent')}
                            >
                              <Image src={item.thumbnail} className=' object-cover' alt={item.name} width={item.thumbWidth} height={item.thumbHeight} priority />
                            </button>

                            {/* 横のカテゴリボタン 表示 */}
                            {/* <div>
                            {item.categories.map((cate) => (
                              <button key={cate} onClick={() => setFilter(cate)}>
                                {cate}
                              </button>
                            ))}
                          </div> */}
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Inner>
    </Wrapper>
  );
};

export default Gallery;
