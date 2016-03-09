'use strict';

/**
 * @ngdoc service
 * @name riotangularApp.riot
 * @description
 * # riot
 * Service in the riotangularApp.
 */
angular.module('riotangularApp')
    .service('riot', function ($http, $q, $mdSidenav, $rootScope, $mdToast) {
        var
            url = 'https://global.api.pvp.net',
            apikey = 'bd59bc2a-9cb5-4b03-ac0d-aff637f8337a',
            database = {},
            menusVisibles = [],
            submenusActivo = ''
            ;

        $rootScope.database = {
            region: 'las'
        };
        $rootScope.opciones = getOpcionesVal();

        return {
            getGroups:          getGroups,
            getRoutes:          getRoutes,
            getSubmenu:         getSubmenu,
            getMenu:            getMenu,
            openRoute:          openRoute,
            toggleSubmenu:      toggleSubmenu,
            isVisibleSubmenu:   isVisibleSubmenu,
            isActiveSubmenu:    isActiveSubmenu,
            getParameters:      getParameters,
            getModels:          getModels,
            getOpcionesVal:     getOpcionesVal
        };

        function getGroups(){
            return [
                'champion',
                'championmastery',
                'current-game',
                'featured-games',
                'game',
                'league',
                'static-data',
                'status',
                'match',
                'matchlist',
                'stats',
                'summoner',
                'team'
            ];
        }

        function getOpcionesVal(route, subroute){
            var opts = {
                'champion': {
                    'champion':       ['region'],
                    'championid':     ['region','id']
                },
                'championmastery': {
                    'championid':     ['platformid','playerid','championid'],
                    'champions':      ['platformid','playerid'],
                    'score':          ['platformid','playerid'],
                    'topchampions':   ['platformid','playerid']
                },
                'current-game': {
                    'observer':       ['platformid','summonerid']
                },
                'featured-games': {
                    'observer':       []
                },
                'game': {
                    'gamesummoner':   ['region','summonerid']
                },
                'league': {
                    'summoner':       ['region','summonerids'],
                    'summonerentry':  ['region','summonerids'],
                    'team':           ['region','teamids'],
                    'teamentry':      ['region','teamids'],
                    'challenger':     [[], [
                        {value: 'RANKED_SOLO_5X5', text: 'RANKED_SOLO_5X5'},
                        {value: 'RANKED_TEAM_3X3', text: 'RANKED_TEAM_3X3'},
                        {value: 'RANKED_TEAM_5X5', text: 'RANKED_TEAM_5X5'}
                    ]],
                    'master':         ['region']
                },
                'static-data': {
                    'champion':       ['region'],
                    'championid':     ['region','championid'],
                    'item':           ['region'],
                    'itemid':         ['region','itemid'],
                    'languagestring': ['region'],
                    'languages':      ['region'],
                    'map':            ['region'],
                    'mastery':        ['region'],
                    'masteryid':      ['region','masteryid'],
                    'realm':          ['region'],
                    'rune':           ['region'],
                    'runeid':         ['region','runeid'],
                    'spell':          ['region'],
                    'spellid':        ['region','spellid'],
                    'version':        ['region']
                },
                'status': {
                    'shard':          [],
                    'shardregion':    ['region']
                },
                'match': {
                    'matchid':        ['region', 'matchid']
                },
                'matchlist': {
                    'summoner':       ['summonerid']
                },
                'stats': {
                    'ranked':         ['summonerid'],
                    'summary':        ['region','summonerid']
                },
                'summoner': {
                    'summoner':       ['region','summonernames'],
                    'perfil':         ['region','summonerids'],
                    'masteries':      ['region','summonerids'],
                    'name':           ['region','summonerids'],
                    'runes':          ['region','summonerids']
                },
                'team': {
                    'summoner':       ['region','summonerids'],
                    'team':           ['region','teamids']
                }
            };
            if(!!route){
                opts = opts[route];
                if(!!subroute){
                    opts = opts[subroute];
                }
            }
            return opts;
        }

        function getParameters(route, subroute){
            var parameters = {
                'champion': {
                    'champion':       ['region'],
                    'championid':     ['region','id']
                },
                'championmastery': {
                    'championid':     ['platformid','playerid','championid'],
                    'champions':      ['platformid','playerid'],
                    'score':          ['platformid','playerid'],
                    'topchampions':   ['platformid','playerid']
                },
                'current-game': {
                    'observer':       ['platformid','summonerid']
                },
                'featured-games': {
                    'observer':       []
                },
                'game': {
                    'gamesummoner':   ['region','summonerid']
                },
                'league': {
                    'summoner':       ['region','summonerids'],
                    'summonerentry':  ['region','summonerids'],
                    'team':           ['region','teamids'],
                    'teamentry':      ['region','teamids'],
                    'challenger':     ['region', 'typechallenger.opts'],
                    'master':         ['region']
                },
                'static-data': {
                    'champion':       ['region'],
                    'championid':     ['region','championid'],
                    'item':           ['region'],
                    'itemid':         ['region','itemid'],
                    'languagestring': ['region'],
                    'languages':      ['region'],
                    'map':            ['region'],
                    'mastery':        ['region'],
                    'masteryid':      ['region','masteryid'],
                    'realm':          ['region'],
                    'rune':           ['region'],
                    'runeid':         ['region','runeid'],
                    'spell':          ['region'],
                    'spellid':        ['region','spellid'],
                    'version':        ['region']
                },
                'status': {
                    'shard':          [],
                    'shardregion':    ['region']
                },
                'match': {
                    'matchid':        ['region', 'matchid']
                },
                'matchlist': {
                    'summoner':       ['summonerid']
                },
                'stats': {
                    'ranked':         ['summonerid'],
                    'summary':        ['region','summonerid']
                },
                'summoner': {
                    'summoner':       ['region','summonernames'],
                    'perfil':         ['region','summonerids'],
                    'masteries':      ['region','summonerids'],
                    'name':           ['region','summonerids'],
                    'runes':          ['region','summonerids']
                },
                'team': {
                    'summoner':       ['region','summonerids'],
                    'team':           ['region','teamids']
                }
            };
            if(!!route){
                parameters = parameters[route];
                if(!!subroute){
                    parameters = parameters[subroute];
                }
            }
            return parameters;
        }

        function getRoutes(route){
            var routes =  {
                'champion': {
                    'champion':     '/api/lol/{region}/v1.2/champion',
                    'championid':   '/api/lol/{region}/v1.2/champion/{id}'
                },
                'championmastery': {
                    'championid':   '/championmastery/location/{platformId}/player/{playerid}/champion/{championid}',
                    'champions':    '/championmastery/location/{platformId}/player/{playerid}/champions',
                    'score':        '/championmastery/location/{platformId}/player/{playerid}/score',
                    'topchampions': '/championmastery/location/{platformId}/player/{playerid}/topchampions'
                },
                'current-game': {
                    'observer':'/observer-mode/rest/consumer/getSpectatorGameInfo/{platformid}/{summonerid}'
                },
                'featured-games': {
                    'observer':'/observer-mode/rest/featured'
                },
                'game': {
                    'gamesummoner':'/api/lol/{region}/v1.3/game/by-summoner/{summonerid}/recent'
                },
                'league': {
                    'summoner':'/api/lol/{region}/v2.5/league/by-summoner/{summonerids}',
                    'summonerentry':'/api/lol/{region}/v2.5/league/by-summoner/{summonerids}/entry',
                    'team':'/api/lol/{region}/v2.5/league/by-team/{teamids}',
                    'teamentry':'/api/lol/{region}/v2.5/league/by-team/{teamids}/entry',
                    'challenger':'/api/lol/{region}/v2.5/league/challenger',
                    'master':'/api/lol/{region}/v2.5/league/master'
                },
                'static-data': {
                    'champion':'/api/lol/static-data/{region}/v1.2/champion',
                    'championid':'/api/lol/static-data/{region}/v1.2/champion/{championid}',
                    'item':'/api/lol/static-data/{region}/v1.2/item',
                    'itemid':'/api/lol/static-data/{region}/v1.2/item/{itemid}',
                    'languagestring':'/api/lol/static-data/{region}/v1.2/language-strings',
                    'languages':'/api/lol/static-data/{region}/v1.2/languages',
                    'map':'/api/lol/static-data/{region}/v1.2/map',
                    'mastery':'/api/lol/static-data/{region}/v1.2/mastery',
                    'masteryid':'/api/lol/static-data/{region}/v1.2/mastery/{masteryid}',
                    'realm':'/api/lol/static-data/{region}/v1.2/realm',
                    'rune':'/api/lol/static-data/{region}/v1.2/rune',
                    'runeid':'/api/lol/static-data/{region}/v1.2/rune/{runeid}',
                    'spell':'/api/lol/static-data/{region}/v1.2/summoner-spell',
                    'spellid':'/api/lol/static-data/{region}/v1.2/summoner-spell/{spellid}',
                    'version':'/api/lol/static-data/{region}/v1.2/versions'
                },
                'status': {
                    'shard':'/shards',
                    'shardregion':'/shards/{region}'
                },
                'match': {
                    'matchid':'/api/lol/{region}/v2.2/match/{matchid}'
                },
                'matchlist': {
                    'summoner':'/api/lol/{region}/v2.2/matchlist/by-summoner/{summonerid}'
                },
                'stats': {
                    'ranked':'/api/lol/{region}/v1.3/stats/by-summoner/{summonerid}/ranked',
                    'summary':'/api/lol/{region}/v1.3/stats/by-summoner/{summonerid}/summary'
                },
                'summoner': {
                    'summoner':'/api/lol/{region}/v1.4/summoner/by-name/{summonernames}',
                    'perfil':'/api/lol/{region}/v1.4/summoner/{summonerids}',
                    'masteries':'/api/lol/{region}/v1.4/summoner/{summonerids}/masteries',
                    'name':'/api/lol/{region}/v1.4/summoner/{summonerids}/name',
                    'runes':'/api/lol/{region}/v1.4/summoner/{summonerids}/runes'
                },
                'team': {
                    'summoner':'/api/lol/{region}/v2.4/team/by-summoner/{summonerids}',
                    'team':'/api/lol/{region}/v2.4/team/{teamids}'
                }
            };
            if(!!route){
                routes = routes[route];
            }
            return routes;
        }

        function getSubmenu(menu){
            var submenu = getRoutes(menu);
            if(!!submenu){
                submenu = Object.keys(submenu);
            }else{
                submenu = [];
            }
            return submenu;
        }

        function getMenu(){
            var
                names = getGroups(),
                list = []
                ;
            for(var i = 0; i < names.length; i++){
                list[names[i]] = getSubmenu(names[i]);
            }
            console.log(list)
            return list;
        }

        function getModels(){
            return $rootScope.database;
        }

        function setParams(key, val){
            $rootScope.database[key] = val;
        }

        function getRoute(item, subitem){
            var
                routes = getRoutes(item),
                route = routes[subitem]
                ;
            if(!!route){
                route = url + route;
            }
            var
                models = getModels(),
                valid = true;
            angular.forEach(getParameters(item, subitem), function(val){
                /*if(val.indexOf('.opts') > -1){
                    val = val.replace('.opts','');
                }*/
                route = route.replace('{' + val + '}', models[val]);
                console.log(models)
                console.log(val)
                console.log(models[val])
                if(valid){
                    valid = !!models[val];
                }
            });
            console.log(route)
            if(!valid){
                route = false;
                $mdSidenav('right').open();
            }
            return route;
        }

        function openRoute(item, subitem){
            var route = getRoute(item, subitem);
            if(!!route){
                return $http.get(route, {params: {api_key: apikey}}).then(function(response){
                    console.log(response)
                    if(response.data){
                        var data = response.data;
                        //console.log(data)
                        if(data.champions){
                            data = data.champions;
                        }else if(data.data){
                            data = data.data;
                        }
                        if(!database[item]){
                            database[item] = {};
                        }
                        database[item][subitem] = data;
                    }
                }).then(function(){
                    submenusActivo = item + subitem;
                    //console.log(database)
                    if(!!database[item] && !!database[item][subitem]){
                        var results = [], element = {};
                        if(angular.isArray(database[item][subitem])){
                            results = database[item][subitem];
                            element = results[0];
                        }else if(angular.isObject(database[item][subitem])){
                            var
                                keys = Object.keys(database[item][subitem]),
                                element = database[item][subitem][keys[0]]
                                ;
                            for(var i = 0; i < keys.length; i++){
                                results.push(database[item][subitem][keys[i]]);
                            }
                        }
                        if(results.length){
                            $rootScope.results = angular.toJson(database[item][subitem], true);
                            $rootScope.resultsTable = results;
                            if( angular.isObject(element)){
                                $rootScope.resultsKeys = Object.keys(element);
                            }else{
                                $rootScope.resultsKeys = [];
                                $rootScope.resultsTable = [];
                                $rootScope.show = 'json';
                            }
                        }
                    }
                }, function(rejection){
                    console.log(rejection);
                    $mdToast.show('Error procesando datos')
                });
            }
            return $q.reject('Ruta no válida');
        }

        function isVisibleSubmenu(menuname){
            //console.log('IS VISIBLE SUBMENU')
            return menusVisibles.indexOf(menuname) > -1;
        }

        function isActiveSubmenu(menuname, submenuname){
            //console.log('IS ACTIVE SUBMENU')
            return submenusActivo === (menuname + submenuname);
        }

        function toggleSubmenu(menuname){
            //console.log(menuname)
            var index = menusVisibles.indexOf(menuname);
            if(index > -1){
                menusVisibles.splice(index,1);
            }else{
                menusVisibles.push(menuname);
            }
        }
    });
/*
public function eliminarModelo($em,$id)
{
    $elementos = $em->getRepository('PempoAdminBundle:Modelo')->findOneBy(array('marco'=> $id));
    if(!empty($elementos))
    {
        foreach($elementos as $item)
        {
            if($this->eliminarModelo($em, $item->getMarcoSiguiente()))
            {
                $em->remove($item);
                $em->flush();
            }
            if(is_null($item->getMarcoSiguiente()))
            {
                $exist_item = $em->getRepository('PempoAdminBundle:Modelo')->findBy(array('marcoSiguiente'=> $item->getMarco()));
                if(!empty($exist_item))
                    continue;
            }

            $rta_elim=$this->eliminarModelo($em, $item->getMarcoSiguiente());
        }
    }

    return true;
}
*/
