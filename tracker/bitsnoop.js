var tmp_num = tracker.length;
tracker[tmp_num] = function () {
    var name = 'BitSnoop';
    var filename = 'bitsnoop';
    var id = null;
    var icon = 'data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAN5SQADG6tQA0pKAAM6ikADt4dgAuy8UAMrWwADWgmwA8c3EAO3d1ADKvqwAwwLoAM6qlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYGBgYGBgYGBgYAAAAGBgYGBgYGBgYGBgYGBgAGBgYGBgYGBgYGBgYGBgYGBgYGBgwBCQkJCQEMBgYGBgYGBgwFCQkJCQkJBQwGBgYGBgYBCQkFDQgKCQkBBgYGBgYGCQkJAwIJCQkJCQYGBgYGBgkJCQcCCQkJCQkGBgYGBgYJCQkHBgIECQkJBgYGBgYGCQkJAwYGAwkJCQYGBgYGBgEJCQULCwUJCQEGBgYGBgYMBQkJCQkJCQUMBgYGBgYGBgwBCQkJCQEMBgYGBgYGBgYGBgYGBgYGBgYGBgYABgYGBgYGBgYGBgYGBgYAAAAGBgYGBgYGBgYGBgYAAMADAACAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAMADAAA%3D';
    var url = 'http://bitsnoop.com/search';
    var root_url = 'http://bitsnoop.com';
    var about = 'The best torrent search in the world. Aggregated torrents from numerous sites and groups, automated verification, super-fast search.';
    var flags = {
        a : 0,
        l : 0,
        rs: 1
    }
    var xhr = null;
    var web = function () {
        var calculateCategory = function (f) {
            var groups_arr = [
            /* Сериалы */['tv'],
            /* Музыка */['audio'],
            /* Игры */['games','game_pc','xbox'],
            /* Фильмы */['video'],
            /* Мультфтльмы */[],
            /* Книги */['books','abooks'],
            /* ПО */['software'],
            /* Анимэ */[],
            /* Док. и юмор */[],
            /* Спорт */[],
            /* XXX */['x3']
            ];
            for (var i=0;i<groups_arr.length;i++)
                if (jQuery.inArray(f,groups_arr[i]) > -1) {
                    return i;
                }
            return -1;
        }
        var calculateSize = function (s) {
            var type = '';
            var size = s.replace(' ','');
            var t = size.replace('KB','');
            if (t.length!= size.length) {
                t = parseFloat(t);
                return Math.round(t*1024);
            }
            var t = size.replace('MB','');
            if (t.length!= size.length) {
                t = parseFloat(t);
                return Math.round(t*1024*1024);
            }
            var t = size.replace('GB','');
            if (t.length!= size.length) {
                t = parseFloat(t);
                return Math.round(t*1024*1024*1024);
            }
            var t = size.replace('TB','');
            if (t.length!= size.length) {
                t = parseFloat(t);
                return Math.round(t*1024*1024*1024*1024);
            }
            return 0;
        }
        var calculateTime = function (t) {
            if ($.trim(t.substr(0, 1)).length == 0) return 0;
            if ((/today/).test(t)) {
                return Math.round((new Date().getTime() / 1000)/(60*60*24))*(60*60*24);
            } else
            if ((/yesterday/).test(t)) {
                return (Math.round((new Date().getTime() / 1000)/(60*60*24))*(60*60*24))-(60*60*24);
            } else
            if ((/ old/).test(t)) {
                var time = parseInt(t.replace(/([0-9]*).*/,'$1'));
                var nowTime = Math.round(new Date().getTime() / 1000);
                if ((/second/).test(t)) {
                    return nowTime - time;
                } else
                if ((/minute/).test(t)) {
                    return nowTime - time*60;
                } else
                if ((/hour/).test(t)) {
                    return nowTime - time*60*60;
                } else
                if ((/day/).test(t)) {
                    return nowTime - time*60*60*24;
                } else
                if ((/week/).test(t)) {
                    return nowTime - time*60*60*24*7;
                } else
                if ((/month/).test(t)) {
                    return nowTime - time*60*60*24*30;
                } else
                if ((/year/).test(t)) {
                    return nowTime - time*60*60*24*365;
                }
            }
            return 0;
        }
        var readCode = function (c) {
            c = view.contentFilter(c);
            var t = $(c);//.contents();
            t = t.find('#torrents').children('li');
            var l = t.length;
            var arr = [];
            var i = 0;
            for (i = 0;i<l;i++) {
                var li = t.eq(i);
                li.children('div[id="sz"]').find('td').eq(0).children('div.nfiles').remove();
                var ss = li.children('div.torInfo').children('span.seeders').text().replace(',','');
                var ls = li.children('div.torInfo').children('span.leechers').text().replace(',','');
                if (ls.length == 0) ls = 0;
                if (ss.length == 0) ss = 0;
                arr[arr.length] = {
                    'category' : {
                        'title' : li.children('span.icon').attr('title'),
                        'id': calculateCategory(li.children('span.icon').attr('class').replace(/icon cat_(.*)/,'$1'))
                    },
                    'title' : li.children('a').text(),
                    'url' : root_url+li.children('a').attr('href'),
                    'size' : calculateSize(li.children('div[id="sz"]').find('td').eq(0).text()),
                    'seeds' : ss,
                    'leechs' : ls,
                    'time' : calculateTime(li.children('div.torInfo').text().replace(/.*— .* — (.*)/,'$1'))
                }
            }
            return arr;
        }
        var loadPage = function (text) {
            var t = text;
            if (xhr != null)
                xhr.abort();
            xhr = $.ajax({
                type: 'GET',
                url: url,
                cache : false,
                data: {
                    'q' : text+' safe:no',
                    't' : 'all'
                },
                success: function(data) {
                    view.result(id,readCode(data),t);
                },
                error:function (xhr, ajaxOptions, thrownError){
                    view.loadingStatus(2,id);
                }
            });
        }
        return {
            getPage : function (a) {
                return loadPage(a);
            }
        }
    }();
    var find = function (text) {
        return web.getPage(text);
    }
    return {
        find : function (a) {
            return find(a);
        },
        setId : function (a) {
            id = a;
        },
        id : id,
        name : name,
        icon : icon,
        about : about,
        url : root_url,
        filename : filename,
        flags : flags
    }
}();
engine.ModuleLoaded(tmp_num);