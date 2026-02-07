//⬇︎js版のコード codePen
// https://codepen.io/taka_web2019/pen/jErKqZe

////1️⃣ ボタンが押される
////2️⃣ 押されたボタンを取得
////3️⃣ その値を render関数に渡す
////4️⃣ render関数の中で
////　- カテゴリで絞る(フィルタリング)
////　- 年ごとにまとめる(グルーピング)
////5️⃣表示する

////⭐️フィルタリング＋グルーピング
//（①フィルタリング処理）filters に基づいてデータを絞り込む。（②年ごとにグルーピング（reduce））絞り込んだ結果を「年ごと」にまとめる
// filters = {} の意味は「filters が渡されなかった場合は、空のオブジェクト {} を使う」

const render = (items, filters = {}) => {
  //itemsの中身は galleryItems.jsの全データが渡される。
  //filtersの中身は render({ categories: 'vegetable' }) の部分;

  ////①フィルタリング処理
  const filtered = items.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      //Object.entriesは オブジェクト(filters)を [key と 値value] の配列に変換。
      //つまり[['categories', 'vegetable']] の配列に変換する。
      //key   = 'categories'
      //value = 'vegetable' のこと。

      //⭐️every()の意味は「全ての条件を満たしたらtrue、1つでもダメならfalse」というAND検索の判定。
      //⬇︎every()で判定処理。全ての条件を満たしたらtrueになり下の return item[key] === value は実行されない。
      //Array.isArray(配列なのかどうか)で判定。
      //item[key] はitem.categories = ['vegetable', 'yasai', '北海道']で配列なのでtrue。
      //逆に yearやname は配列ではありませんのでfalse。
      if (Array.isArray(item[key])) {
        //item[key]は『itemオブジェクトの'categoriesプロパティ'のこと。』つまり['vegetable', 'yasai', '北海道']を参照している。
        return item[key].includes(value); //includesで判定処理。item[key]='categoriesプロパティ'のこと。つまり['vegetable', 'yasai', '北海道']の中に　value=('vegetable')がincludesで含まれているなら「true」
      }

      //⭐️⬇︎“単一の値”用の判定処理。下記が実行される条件は、
      //every()で if (Array.isArray(item[key])) が「1つでもダメならfalse」判定になり、下記が実行される。
      //categories以外の「year === 2025 name === 'ニンジン'」などの“単一の値”を持つプロパティをフィルタするための処理
      return item[key] === value;
    });
  });

  ////②reduceで「year年ごとにグルーピング」
  return filtered.reduce((acc, item) => {
    // acc : 途中経過（入れ物）
    // item: 今見ているfilteredの配列。
    // filteredでフィルタリングされた結果 { name: 'ニンジン', categories: ['vegetable', 'yasai','北海道'], year: 2025 } などが入る。

    const key = item.year; //⬅︎item.yearをkeyと言う名前にする。「何をkeyキーにしているか」が一目で分かる
    acc[key] = acc[key] || []; //⬅︎初回ループで「acc[2025] = []。つまり2025年用の[箱]を作った。」//次のループでacc[2025]が存在すればacc[2025]の箱を使う。もしacc[key]が存在しなければ[空]を返す
    acc[key].push(item); //⬅︎acc={2025:[{ name: 'ニンジン', categories: ['vegetable', 'yasai','北海道'], year: 2025 }]} ⬅︎「2025年に該当するデータを箱にpushで入れた」
    return acc;

    //・acc[key]は 動的プロパティアクセスと言う。動的に「プロパティ名」を指定できる。
    //例えば、acc[key]のkeyが2025なら
    //  acc={
    //    2025: [  { name: 'ニンジン', categories: ['vegetable', 'yasai', '北海道'], year: 2025 }],
    //  }
    //のように、2025がプロパティ名になる。
  }, {});
};

export default render;
