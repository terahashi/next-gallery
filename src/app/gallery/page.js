////ギャラリーページ
'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import Image from 'next/image'; //Next.jsでは基本的に <Image />コンポーネントを使う
import itemsData from '@/data/itemsData.js';
import render from '../lib/render';

//⬇︎コンポーネント
import { Wrapper, Inner } from '../../components/common/LayoutPrimitives';
import styled from 'styled-components';

//styled-components
//・上部のフィルタボタン
const ListButton = styled.li`
  cursor: pointer;
  padding: 8px 16px;
  border-bottom: 2px solid transparent;
  color: #000;
  //⬇︎{ $isActive }は分割代入です。propsの中の$isActiveプロパティを取り出して使う。
  ${({ $isActive }) =>
    $isActive &&
    //&& 論理AND演算子で、$isActiveがtrueの場合に下記のcssが適用される
    `
      color: #e60023;
      font-weight: bold;
      border-bottom: 2px solid #e60023;
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
        <div className='mt-[200px]'>
          <div className='text-[red] font-bold mb-20'>ギャラリーページ</div>

          {/* 上部のカテゴリボタン */}
          <div>
            <ul className='flex justify-center items-center flex-wrap gap-x-10'>
              <ListButton $isActive={filter === null} onClick={() => setFilter(null)}>
                全て
              </ListButton>
              <ListButton $isActive={filter === 'vegetable'} onClick={() => setFilter('vegetable')}>
                野菜
              </ListButton>
              <ListButton $isActive={filter === 'fruit'} onClick={() => setFilter('fruit')}>
                フルーツ
              </ListButton>
              <ListButton $isActive={filter === 'fish'} onClick={() => setFilter('fish')}>
                魚
              </ListButton>
            </ul>
          </div>

          {/* ⬇︎flexエリア */}
          <div className='flex mt-30'>
            {/* 左表示(画像表示エリア)：サムネイルでクリックされた画像を大きく表示する */}
            <div className='w-[60%] flex justify-start items-center flex-col'>
              {/* ⬇︎選択された画像を表示がtrueの場合は表示する、falseの場合はpタグを表示する。 */}
              {selectedImage ? <Image src={selectedImage.src} alt={selectedImage.name} width={800} height={600} className='w-auto h-auto object-cover' priority /> : <p>sss</p>}
            </div>
            {/* 右表示(サムネイル)：グルーピングされた結果を表示する */}
            <div className='flex flex-col w-[40%]'>
              {Object.entries(grouped)
                .sort((a, b) => b[0] - a[0])
                .map(([year, items]) => (
                  <section key={year}>
                    <h3>{year}年</h3>

                    {/* ⬇︎itemを表示(フィルタリング+グルーピングされたデータ) */}
                    <div className='flex flex-wrap'>
                      {items.map((item) => (
                        <div key={item.name}>
                          {/* ⬇︎要素を表示 */}
                          <div>
                            <span>{item.name}</span>
                          </div>

                          {/* ⬇︎(サムネイル画像の役割)画像を表示 */}
                          {/* onClickで更新用関数setSelectedImageを実行して、『item』をselectedImageにセットする。 */}
                          <div onClick={() => setSelectedImage(item)} className='cursor-pointer'>
                            <Image src={item.src} className='w-auto h-auto object-cover' alt={item.name} width={item.width} height={item.height} priority />
                          </div>

                          {/* ⬇︎横のカテゴリボタン 表示 */}
                          <div>
                            {item.categories.map((cate) => (
                              <button key={cate} onClick={() => setFilter(cate)}>
                                {cate}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
            </div>
          </div>
        </div>
      </Inner>
    </Wrapper>
  );
};

export default Gallery;
