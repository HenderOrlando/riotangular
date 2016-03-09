'use strict';

/**
 * @ngdoc function
 * @name riotangularApp.controller:SidenavCtrl
 * @description
 * # SidenavCtrl
 * Controller of the riotangularApp
 */
angular.module('riotangularApp')
    .controller('SidenavCtrl', function (riot, $mdSidenav) {
        console.log('SIDENAV')
        var
            vm = this,
            menu = riot.getMenu()
        ;

        vm.menu = Object.keys(menu);
        vm.getSubmenu = getSubmenu;
        vm.toggleSubmenu = riot.toggleSubmenu;
        vm.isVisibleSubmenu = riot.isVisibleSubmenu;
        vm.openRoute = riot.openRoute;
        vm.close = closeSideNav;


        function getSubmenu(menuname){
            //console.log('GETSUBMENU')
            return menu[menuname]
        }

        function closeSideNav(){
            $mdSidenav('left').close();
        }

    });
