'use strict';

/**
 * @ngdoc function
 * @name riotangularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the riotangularApp
 */
angular.module('riotangularApp')
    .controller('MainCtrl', function ($mdSidenav, $rootScope, riot) {
        console.log('MAIN')
        var
            vm = this
        ;
        vm.toggleSideNavLeft = toggleSideNavLeft;
        vm.toggleSideNavRight = toggleSideNavRight;

        $rootScope.routes = riot.getRoutes();
        vm.getResultKeys = getResultKeys;
        vm.showJson = showJson;
        vm.showTable = showTable;
        vm.orderBy = orderByResults;
        vm.filter = filterResults;
        vm.query = '';
        $rootScope.show = 'table';


        function toggleSideNavLeft(){
            $mdSidenav('left').toggle();
        }

        function toggleSideNavRight(){
            $mdSidenav('right').toggle();
        }

        function getResultKeys(){
            return Object.keys($rootScope.results)
        }

        function showJson(){
            $rootScope.show = 'json';
        }

        function showTable(){
            $rootScope.show = 'table';
        }

        function orderByResults(obj, id, list){
            var
                keys = Object.keys(obj),
                order = false
            ;
            if(keys.indexOf('id') > -1){
                if(!!obj.id){
                    order = order || obj.id;
                }
            }
            if(keys.indexOf('name') > -1){
                if(!!obj.name){
                    order = order || obj.name;
                }
            }
            if(keys.indexOf('description') > -1){
                if(!!obj.name){
                    order = order || obj.description;
                }
            }
            for(var i = 0; i < keys.length; i++){
                if(keys[i] !== 'id' && keys[i] !== 'name' && keys[i] !== 'description'){
                    order = order || obj[keys[i]];
                }
            }
            return order;
        }

        function filterResults(obj, id, list){
            var
                keys = Object.keys(obj),
                filter = false
            ;
            //if(vm.query.length > 3){
                for(var i = 0; i < keys.length; i++){
                    if(angular.isString(obj[keys[i]])){
                        filter = filter || obj[keys[i]].toLowerCase().indexOf(vm.query.toLowerCase()) > -1;
                    }
                    if(filter){
                        break;
                    }
                }
            /*}else{
                filter = true;
            }*/
            return filter;
        }
    });
