const path = require('path');
module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve("babel-loader"),
        options: {
            presets: [["react-app", { flow: false, typescript: true }], 
            ['import', {libraryName: "antd", style: true}],
            '@babel/react'],
        }
    });
    config.resolve.alias = {
        ...config.resolve.alias,
        'fs': path.resolve(__dirname, 'fsMock.js'),
    };
    config.module.rules.push({
        test: /\.less$/,
        loaders: [
            'style-loader',
            'css-loader',
            {
                loader: 'less-loader',
                options: {
                    modifyVars: {'@primary-color': '#f00'},
                    javascriptEnabled: true
                }
            }
        ],
        include: [
          path.resolve(__dirname, '../src'),
          /[\\/]node_modules[\\/].*antd/
        ]
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
};