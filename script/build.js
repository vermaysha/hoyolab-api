const { buildSync } = require('esbuild')
const { rimrafSync } = require('rimraf')
const { sync: globSync } = require('fast-glob')

rimrafSync('dist')

try {
  buildSync({
    entryPoints: globSync('src/**/*.ts'),
    charset: 'utf8',
    format: 'cjs',
    outdir: 'dist',
    platform: 'node',
    target: ['esnext'],
  })

  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(1)
}
