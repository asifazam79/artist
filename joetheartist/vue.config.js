module.exports = {
    publicPath: './',
    runtimeCompiler: true,
    pages: {
        index: {
            // entry for the page
            entry: './src/main.js'
        }
    },
    devServer: {
        // listens only on localhost
        host: '0.0.0.0',
        // webpack-dev-server adds a host check, reports 'Invalid Host Header' and host check is disabled
        disableHostCheck: true
    },
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false
        }
    }
};
