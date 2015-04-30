'use strict';



angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
  $stateProvider
    .state('index', {
      url: '/index',
      views: {
        '': {
          templateUrl: 'tpl/index.html'
        },
        'header@index': {
          templateUrl: 'tpl/header.html'
        },
        'wrapper@index': {
          templateUrl: 'tpl/content/wrapper.html'
        },
        'tagCloud@index': {
          templateUrl: 'tpl/aside/tagCloud.html',
          controller: 'tagCloud'
        },
        'tagArticle@index': {
          templateUrl: 'tpl/aside/tagArticle.html',
          controller: 'tagArticle'
        },
        'footer@index': {
          templateUrl: 'tpl/footer.html'
        }
      }
    })
    .state('index.article', {
      url: '/article/:id',
      views: {
        'wrapper@index': {
          templateUrl: function (stateParam) {
            return 'tpl/article/' + stateParam.id + '.html'
          }
        }
      }
    })
    .state('index.archives', {
      url: '/archives',
      views: {
        'wrapper@index': {
          templateUrl: 'tpl/content/allArchive.html',
          controller: 'allArchive'
        }
      }
    })
    .state('index.tagCloud', {
      url: '/tagCloud/:id',
      views: {
        'wrapper@index': {
          templateUrl: 'tpl/content/tagArchive.html',
          controller: 'archive'
        }
      }
    })
});


