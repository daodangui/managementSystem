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
        personData: 'common/lcommon/personData',
        square: 'common/lcommon/square',
        summernote: 'base/summernote',
        'summernote-zh-CN': 'base/summernote-zh-CN',
        hot: 'common/ycommon/hot',
        sceneryList: 'common/ycommon/sceneryList',
        pagination: 'common/ycommon/pagination',
        recommend: 'common/ycommon/recommend',
        recommendlist: 'common/ycommon/recommendlist',
        CSpage: 'common/lcommon/CSpage',
        initscenery: 'common/ycommon/initscenery'
    }
});