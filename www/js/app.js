// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var tic_tac_toe = angular.module('starter', ['ionic','ngCordova'])

tic_tac_toe.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

tic_tac_toe.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
    $ionicConfigProvider.navBar.alignTitle("center"); //Places them at the bottom for all OS
    $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
    $urlRouterProvider.otherwise('/tab/home')
    $stateProvider
        .state('tabs', {
            url: '/tab',
            abstract: true,
            templateUrl: 'template/tabs.html'
        })
        .state('tabs.home', {
            url: '/home',
            views: {
                'home-tab': {
                    templateUrl: 'template/login.html',
                    controller: 'loginCtrl'
                }
            }
        })
        .state('tabs.signup', {
            url: '/signup',
            views: {
                'signup-tab': {
                    templateUrl: 'template/signup.html',
                    controller: 'signupCtrl'
                }
            }
        })
        .state('menu', {
            url: '/menu',
            abstract: true,
            templateUrl: 'template/menus.html',
            controller: 'menuCtrl'
        })
        .state('menu.dashboard', {
            url: '/dashboard',
            views: {
                'menuContent': {
                    templateUrl: 'template/dashboard.html',
                    controller: 'DashboardCtrl'
                }
            }
        })
        .state('menu.game', {
            url: '/game',
            views: {
                'menuContent': {
                    templateUrl: 'template/game.html'
                }
            }
        })
        .state('menu.profile', {
            url: '/profile',
            views: {
                'menuContent': {
                    templateUrl: 'template/signup.html'
                }
            }
        })
        .state('menu.players', {
            url: '/players',
            views: {
                'menuContent': {
                    templateUrl: 'template/players.html'
                }
            }
        })
});
