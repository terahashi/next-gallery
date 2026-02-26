//Vercel本番はSSG(静的生成)なので「画像ランダム表示の Math.random()が「ビルド時に1回だけ評価されて、そのまま停止」してしまう。
//解決策は Client Component にして、useState, useEffectを使い、クライアント側でランダム表示させる。

'use client';
import { useState, useEffect } from 'react'; //
import Image from 'next/image'; //Next.jsでは基本的に <Image />コンポーネントを使う
import Link from 'next/link'; //Linkコンポーネント

//コンポーネント & Data
import { PageContainer, Wrapper, Inner } from '../components/common/LayoutPrimitives';
import itemsData from '@/data/itemsData.js'; //画像データの配列

export default function Home() {
  //⬇︎stateでランダム画像を管理
  const [randamImages, setRandamImages] = useState(null);

  //⬇︎useEffectでページ更新するたびに画像をランダム表示
  useEffect(() => {
    const img = itemsData[Math.floor(Math.random() * itemsData.length)];
    setRandamImages(img); //setRandamImagesでstateを更新する
  }, []);
  //randamImagesが「null」の場合は何も表示しない
  if (!randamImages) return null;

  return (
    <PageContainer>
      <Wrapper>
        <Inner>
          <div className='flex justify-center items-center'>
            <main className='flex md:min-h-screen justify-start md:justify-center items-center w-full max-w-3xl flex-col pt-[150px] md:py-16 px-0 md:px-16'>
              <Link href={`/gallery?selected=${randamImages.id}`}>
                <div className='text-center'>
                  {/* ⬇︎①「width={数字} height={数字}を指定した場合のImageコンポーネント」 */}
                  <div className='mb-4 w-full max-w-md '>
                    <Image src={randamImages.src} className='w-auto h-auto object-cover' alt={randamImages.name} width={randamImages.width} height={randamImages.height} priority />
                  </div>

                  {/* ⬇︎②「fillを指定した場合のImageコンポーネント」 33vwは条件に当てはまらなかった場合に適用される。 */}
                  {/* <div className='mb-3 relative w-full aspect-[2/3]'>
                  <Image fill src={randomImages} className='object-cover' alt='TopImage' sizes='(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw' priority />
                </div> */}

                  <h1 className='text-[1.1rem]'>VISIT GALLERY PAGE</h1>
                </div>
              </Link>
            </main>
          </div>
        </Inner>
      </Wrapper>
    </PageContainer>
  );
}
