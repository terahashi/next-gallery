//「PostCSSに何のプラグインを使うか」を教える設定ファイル

const config = {
  plugins: {
    //Tailwindを「PostCSS経由で動かしている」
    '@tailwindcss/postcss': {},
  },
};

export default config;
