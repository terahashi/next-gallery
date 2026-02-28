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
import { PageContainer, Wrapper, Inner } from '../../components/common/LayoutPrimitives';
import styled from 'styled-components';
import YearSepalatorLine from '@/components/common/YearSepalatorLine';

//styled-components
//上部フィルタボタン
const ListButton = styled.li`
  cursor: pointer;
  display: inline-block;
  border-radius: 3em;
  letter-spacing: 0.1em;
  padding: 2px 5px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  border: 2px solid rgb(15, 118, 144);
  color: rgb(15, 118, 144);
  list-style-type: none;
  &:nth-of-type(1) {
    margin-left: 0;
  }
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

const ListButton2 = styled(ListButton)`
  border: 2px solid rgb(138, 137, 137);
  color: rgb(138, 137, 137);
`;

const Gallery = () => {
  //⬇︎フィルタリングを管理するState
  const [filter, setFilter] = useState(null);

  //⬇︎「選択中の画像」を管理するstate
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('selected');
  const initialImage = itemsData.find((item) => String(item.id) === selectedId) ?? itemsData[0];
  const [selectedImage, setSelectedImage] = useState(initialImage);

  //⬇︎スマホ用 モーダル表示管理
  const [isModalOpen, setModalOpen] = useState(false);

  //ローディングする
  const [isLoading, setIsLoading] = useState(false);

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
    <PageContainer>
      <Wrapper>
        <Inner>
          {/* Flex start */}
          <div className='flex mt-[100px] md:mt-[100px] md:mb-[100px] items-start justify-center'>
            {/* ⬇︎左表示(画像表示エリア)：サムネイルでクリックされた画像を大きく表示する */}
            <div className='hidden flex-[2] md:flex justify-start items-start flex-col self-start md:m-[30px] w-full max-w-[900px]'>
              <div className='flex justify-center relative w-full '>
                <div className='w-full'>
                  {/* ⬇ローディングの回転を表示 */}
                  {isLoading && (
                    <div className='absolute inset-0 flex items-center justify-center bg-white/60 z-10'>
                      <div className='w-[40px] h-[40px] border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin' />
                    </div>
                  )}
                  {/* ⬇選択された画像を表示 */}
                  {selectedImage && (
                    <Image
                      key={selectedImage.id}
                      src={selectedImage.src}
                      alt={selectedImage.name}
                      width={selectedImage.width}
                      height={selectedImage.height}
                      className='w-full h-auto object-cover'
                      priority
                      onLoad={() => setIsLoading(false)}
                    />
                  )}
                </div>
              </div>
              {/* (選択中画像に適応した)名前 を表示させる */}
              {selectedImage && <div className='title__ja md:text-[1.2rem] font-bold md:mt-[24px]'>{selectedImage.name}</div>}

              {/* (選択中画像に適応した)カテゴリボタン を表示させる */}
              {selectedImage && (
                <ul className='flex justify-start items-center flex-wrap gap-1 md:mt-[4px]'>
                  {selectedImage.categories.map((cate) => (
                    <ListButton2 key={cate} onClick={() => setFilter(cate)}>
                      {cate}
                    </ListButton2>
                  ))}
                </ul>
              )}
            </div>

            {/* ⬇︎右表示(サムネイル)：グルーピングされた結果を表示する */}
            <div className='w-full md:w-[380px] md:flex-none flex flex-col p-[0] pb-[15vh] md:pb-[30vh]'>
              <h3 className='text-[var(--color-gray)] font-bold'>Location</h3>
              {/* 上部のカテゴリボタン */}
              <div className='m-[0_0_40px]'>
                <ul className='flex justify-start items-center flex-wrap gap-1'>
                  <ListButton $isActive={filter === null} onClick={() => setFilter(null)}>
                    全て
                  </ListButton>
                  <ListButton $isActive={filter === 'フランス'} onClick={() => setFilter('フランス')}>
                    フランス
                  </ListButton>
                  <ListButton $isActive={filter === 'スイス'} onClick={() => setFilter('スイス')}>
                    スイス
                  </ListButton>
                  <ListButton $isActive={filter === 'ポーランド'} onClick={() => setFilter('ポーランド')}>
                    ポーランド
                  </ListButton>
                  <ListButton $isActive={filter === 'オランダ'} onClick={() => setFilter('オランダ')}>
                    オランダ
                  </ListButton>{' '}
                  <ListButton $isActive={filter === 'イギリス'} onClick={() => setFilter('イギリス')}>
                    イギリス
                  </ListButton>{' '}
                  <ListButton $isActive={filter === 'アメリカ'} onClick={() => setFilter('アメリカ')}>
                    アメリカ
                  </ListButton>{' '}
                  <ListButton $isActive={filter === '台湾'} onClick={() => setFilter('台湾')}>
                    台湾
                  </ListButton>
                </ul>
              </div>

              {/* 下部のサムネイル */}
              <div className='scroll-area md:overflow-y-scroll md:overflow-x-hidden max-h-[100vh] md:max-h-[65vh] p-[0] pb-[30vh]'>
                {Object.entries(grouped)
                  .sort((a, b) => b[0] - a[0])
                  .map(([year, items]) => (
                    <section className='mb-[4px]' key={year}>
                      <div className='flex'>
                        {/* 年 */}
                        <p className='mb-0 whitespace-nowrap'>{year}年</p>
                        <YearSepalatorLine />
                      </div>

                      {/* ⬇︎「サムネイル画像達を表示」する。つまりitemを表示(フィルタリング+グルーピングされたデータ) */}
                      {/* auto-rows-[90px] は、行の高さを90pxで固定 */}
                      <div className='grid grid-cols-[repeat(4,80px)] gap-1 auto-rows-[80px] justify-start'>
                        {items.map((item) => (
                          <div key={item.id} className='w-[80px] h-[80px]'>
                            {/* (サムネイル)表示 */}
                            <button
                              type='button'
                              className={clsx('w-[80px] h-[80px] rounded-[0.2em] cursor-pointer border-2', selectedImage?.id === item.id ? 'border-sky-400' : 'border-transparent')}
                              onClick={() => {
                                //⬇︎もしも「今左に表示している画像」と「今クリックしたサムネイル画像」が『同一の場合』は、
                                if (selectedImage?.id === item.id) {
                                  //モーダルだけ再表示する。
                                  setModalOpen(true);
                                  return;
                                }
                                //⬇︎それ以外の「今左に表示している画像」と「今クリックしたサムネイル画像」が『違う場合』は、
                                setIsLoading(true); //別の画像をクリックした場合のみローディングの回転を開始。
                                setSelectedImage(item); //画像が左側に表示される。
                                setModalOpen(true); //モーダルを開く。
                              }}
                            >
                              <Image src={item.thumbnail} className='w-full h-auto object-cover' alt={item.name} width={item.thumbWidth} height={item.thumbHeight} priority />
                            </button>

                            {/* 名前を表示 */}
                            {/* <div>
                                <span>{item.name}</span>
                              </div> */}

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
        </Inner>

        {/* ⬇︎⭐️スマホ用/モーダル表示エリア */}
        {isModalOpen && selectedImage && (
          <div className='md:hidden fixed inset-0 z-1000 flex items-center justify-center bg-black/75' onClick={() => setModalOpen(false)}>
            <div className='relative max-w-[95%] w-full rounded-lg'>
              <Image src={selectedImage.src} className='w-full h-auto object-cover' alt={selectedImage.name} width={selectedImage.width} height={selectedImage.height} />
              {/* ⬇︎写真の名前 */}
              <div className='title__ja text-[1.2rem] text-center text-[var(--color-white)] mt-2 font-bold'>{selectedImage.name}</div>
            </div>
          </div>
        )}
      </Wrapper>
    </PageContainer>
  );
};

export default Gallery;
