'use strict';

/**
 * @ngdoc overview
 * @name riotangularApp
 * @description
 * # riotangularApp
 *
 * Main module of the application.
 */
angular
    .module('riotangularApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ui.router',
        'ngMaterial'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('main', {
                url: '/',
                views: {
                    'mainView': {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl',
                        controllerAs: 'main'
                    },
                    /*'sidenavView': {
                        templateUrl: 'views/sidenav.html',
                        controller: 'SidenavCtrl',
                        controllerAs: 'sidenav'
                    },*/
                    'sidenavRightView': {
                        templateUrl: 'views/sidenavright.html',
                        controller: 'SidenavrightCtrl',
                        controllerAs: 'sidenavright'
                    }
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
        ;
    });
