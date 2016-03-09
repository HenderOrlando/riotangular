'use strict';

/**
 * @ngdoc function
 * @name riotangularApp.controller:SidenavrightCtrl
 * @description
 * # SidenavrightCtrl
 * Controller of the riotangularApp
 */
angular.module('riotangularApp')
    .controller('SidenavrightCtrl', function (riot, $mdSidenav, $rootScope) {
        console.log('SIDENAVRIGHT')
        var
            vm = this,
            menu = riot.getMenu()
            ;

        $rootScope.database = riot.getModels();
        vm.getParams = getParams;
        vm.menu = Object.keys(menu);
        vm.getSubmenu = getSubmenu;
        vm.toggleSubmenu = riot.toggleSubmenu;
        vm.isVisibleSubmenu = riot.isVisibleSubmenu;
        vm.openRoute = riot.openRoute;
        vm.close = closeSideNav;
        vm.opciones = riot.getOpcionesVal();

        /*$rootScope.$watch('database', function(oldVal, newVal){
            console.log(oldVal)
            console.log(newVal)
        });*/

        function getSubmenu(menuname){
            //console.log('GETSUBMENU')
            return menu[menuname]
        }

        function closeSideNav(){
            $mdSidenav('right').close();
        }

        function getParams(item, subitem){
            return riot.getParameters(item, subitem);
        }

        /*function getOpciones(item, subitem, param){
            var
                params = riot.getParameters(item, subitem),
                opciones = riot.getOpcionesVal(item, subitem),
                index = params.indexOf(param),
                opts = []
            ;
            if(index > -1){
                opts = opciones[index];
                console.log(opts)
                if(!angular.isArray(opts)){
                    opts = [];
                }
            }
            return opts;
        }*/
    });
