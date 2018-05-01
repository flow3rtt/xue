import babel from 'rollup-plugin-babel'

export default {
    input: './src/index.js',
    output: {
        file: './build/xue.js',
        format: 'iife',
        name: 'Xue'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
}