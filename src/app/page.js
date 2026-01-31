import Image from 'next/image'; //Next.jsでは基本的に <Image />コンポーネントを使う
import Link from 'next/link'; //Linkコンポーネント

//コンポーネント & Data
import { Wrapper, Inner } from '../components/common/LayoutPrimitives';
import topImages from '../data/topImages'; //画像データの配列

export default function Home() {
  //⬇︎ランダムで表示する画像を選択
  const randomImages = topImages[Math.floor(Math.random() * topImages.length)];

  return (
    <Wrapper>
      <Inner>
        {/* ⬇︎  ダークモード時の確認用 */}
        {/* <div className='bg-white dark:bg-black'> */}
        <div className='flex min-h-screen justify-center items-center '>
          <main className='flex min-h-screen justify-center items-center w-full max-w-3xl flex-col items-center gap-y-8 py-32 px-16  '>
            <Link href='/gallery'>
              <div className='text-center'>
                {/* ⬇︎①「width={数字} height={数字}を指定した場合のImageコンポーネント」 */}
                <div className='mb-3 w-full max-w-md '>
                  <Image src={randomImages} className='w-auto h-auto object-cover' alt='TopImage' width={randomImages.width} height={randomImages.height} priority />
                </div>

                {/* ⬇︎②「fillを指定した場合のImageコンポーネント」➡︎33vwは条件に当てはまらなかった場合に適用される。 */}
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
  );
}
