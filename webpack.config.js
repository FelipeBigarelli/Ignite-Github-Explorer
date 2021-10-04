const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map', //sourcemap: limpar o código para ler somente react
    entry: path.resolve(__dirname, 'src', 'index.jsx'), // arquivo que vai ser lido
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js' // nome do arquivo
    },
    resolve: {
        extensions: ['.js', '.jsx'], // extensões de arquivos que podem ser lidos
    },
    devServer: {
        //contentBase: path.resolve(__dirname, 'public'), 
        static: {
          directory: path.resolve(__dirname, 'public')
        },
        hot: true,
    },
    plugins: [ // injetar o js no html para não precisar importar no index.html por meio do <script>
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html') // arquivo de template para gerar o html
        })
    ].filter(Boolean),
    module: { // como a aplicação irá se comportar com vários tipos de arquivos
        rules: [
            {
                test: /\.jsx$/, // true | false: é js ou não
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ],
    }
};