require.config({
    baseUrl : '/scripts/',
    shim: {
　　　　 ejs: {
　　　　　　 exports: 'EJS'
　　　　 },
        bootstrap: {
            deps: ['jquery']
        }
　　},
    paths : {
        jquery: 'base/jquery',
        bootstrap: 'base/bootstrap',
        ejs: 'base/ejs',
        content: 'common/content',
        header: 'common/header',
        login: 'common/login',
        register: 'common/register',
        main: 'common/main',
        
        hot: 'common/ycommon/hot',
        sceneryList: 'common/ycommon/sceneryList',
        pagination: 'common/ycommon/pagination'
    }
});