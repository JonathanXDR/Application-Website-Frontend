export default {
  '**/*.{js,jsx,ts,tsx,vue,json,css,scss,md}': stagedFiles => [
    `prettier --write ${stagedFiles.join(' ')}`,
    `eslint --flag unstable_ts_config --fix ${stagedFiles.join(' ')}`,
  ],
  '**/*.{ts,tsx,vue}': () => 'vue-tsc --noEmit',
}
