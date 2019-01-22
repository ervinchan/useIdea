const {
    injectBabelPlugin
} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewirePreact = require('react-app-rewire-preact');
const rewireMobX = require('react-app-rewire-mobx');

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true
        }],
        config,
    );
    config = rewireLess.withLoaderOptions({
        modifyVars: {
            "@primary-color": "#E50012"
        },
        javascriptEnabled: true,
    })(config, env);
    // use the Preact rewire
    if (env === "production") {
        console.log("⚡ Production build with Preact");
        config = rewirePreact(config, env);
        config.devtool = false;
    }

    //config = rewireMobX(config, env);

    return config;
};