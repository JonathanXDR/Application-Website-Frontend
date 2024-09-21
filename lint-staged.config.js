export default {
  '.': stagedFiles => [
    'eslint .',
    `prettier --write ${stagedFiles.join(' ')}`,
  ],
}
