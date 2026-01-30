import Image from 'next/image'; //Next.jsでは基本的に <Image />コンポーネントを使う
import Link from 'next/link'; //Linkコンポーネント
import { Wrapper, Inner } from '../components/common/LayoutPrimitives';

export default function Home() {
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
                <div className='w-full max-w-md mb-3'>
                  <Image src='/images/img-01.jpg' className='object-cover' alt='TopImage' width={500} height={500} priority />
                </div>

                {/* ⬇︎②「fillを指定した場合のImageコンポーネント」➡︎33vwは条件に当てはまらなかった場合に適用される。 */}
                {/* <div className='relative w-full aspect-square'>
              <Image fill src='/example.png' sizes='(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw' />
            </div> */}

                <h1 className='font-bold'>View Gallery Page</h1>
              </div>
            </Link>
          </main>
        </div>
      </Inner>
    </Wrapper>
  );
}
