var tmp_num = tracker.length;
tracker[tmp_num] = function () {
    var name = 'X-torrents';
    var filename = 'x-torrents';
    var id = null;
    var icon = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHRztBQUFDQFBNSGNRQ2dNRltAQ0dASEFDSUhST19VR2teSnlSTlNRU01XYVBaaU42MEE4N0AuNTIpNCoqNTNESVhKS21IRXJOS3lKTmczPjw2RjVKT0ZKTklLUE9HSk4qNyEoNC49RFNZXXleWqFraJ9dXoBGSGBeXX1tbJZmZpxVVpNLT2hCRlFLT0pRVkddXoB3dKZuaa5eWKdbYX5BRFNDQUFLST87OTFERFJfXoZmZZ1xc6mDgqp3cYhZUl9EQ4NZUqdRR6RWT6pdU6YnNyxJTFBHQE1IQjcgLDJVVKpYVq9RWZVnX75TS5hHXkgiJSlfS7V5ZvNlYNlvaut4bsswNThHREApKzVyY9xwY+dwZ9Z2ZP1lWrtDSVBZVWAxLCMbHixPR6xwWP9cW/dYSOlzZc4hLDBfX8NcUfNjWexyV/9jXL07S0pXXFNcV1Q9PT0uOSkcIzJUTodJRt9QRfVDOOhSUeM+PetDRu5RT+VjX8hDRE5YZFJNVlNLUVw6PDY+QjctKTUoLCE9P41ANOo0NuIzKfEtMPBEOvhVR7FGTi9TT1tQVFVXXllCTkg5Py48O0UmLCsqMitMULk/M/84Nu07M+s1OO5AQOpgYMpIUmNIT0hUX09LU0xQVFk0NjcpNyUsOUF/c9NUUeJAR9JMPfI7PqBJQdxEO+9dVu1xa+JVXG9ATkNTXFJUVV8pLSg3O1R6bthuWvNlXOhnWfVXUKUnPQ1RUHxsWu1mWvJuYfKDdOBbX3xKUktWV1VETlhLVWdBSmVASmg7RFg2PjdERDZMRD1CPDczMjs+QlpGTmxJTpNZX4hlanNVXVMjJzlAP2ZdWJZuZrNva7ZiZI1NTmI3N0VOTWFta5V1cbhzbsNub5FZV21ST1hXUlM4QjEvOioqNykoNiosPElNVXJZW4RVVYVYWIhSWHs3RVgvP0xJSUlTUVFZVFZbVlg7Nzw1MzkrLTUyNT0/QkpFRV0/QVk8RFFES1xJTFpCRU1FSE1AQkJMUVBRWFVDTEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    var url = 'http://x-torrents.org/browse.php';
    var root_url = 'http://x-torrents.org/';
    var about = 'Крупнейший торрент трекер X-Torrents.org. У нас можно бесплатно скачать игры, фильмы, музыку, ..., музыку. На нашем torrent трекере самые последние новинки фильмов (DVD/HDTV). Все фильмы на x-torrents.org имеют качественное изображение и звук!';
    var flags = {
        a : 1,
        l : 1,
        rs: 1
    }
    var xhr = null;
    var web = function () {
        var calculateCategory = function (f) {
            var groups_arr = [
            /* Сериалы */['tv'],
            /* Музыка */['music','video-clips'],
            /* Игры */['games','games_psp','pda-games'],
            /* Фильмы */['films','dvd','hdtv'],
            /* Мультфтльмы */['mult'],
            /* Книги */['knigi'],
            /* ПО */['soft'],
            /* Анимэ */['anime'],
            /* Док. и юмор */['doc-films']
            ];
            for (var i=0;i<groups_arr.length;i++)
                if (jQuery.inArray(f,groups_arr[i]) > -1) {
                    return i;
                }
            return -1;
        }
        var calculateTime = function (time) {
            time = $.trim(time).split(" ");
            var date = time[0].split('-');
            time = time[1].split(':');
            return Math.round((new Date(parseInt(date[0]),parseInt(1+date[1])-101,parseInt('1'+date[2])-100,parseInt('1'+time[0])-100,parseInt('1'+time[1])-100)).getTime() / 1000);
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
        var readCode = function (c) {
            c = view.contentFilter(c);
            var t = $(c).find('table.embedded').children('#highlighted').children('tr');
            var l = t.length;
            var arr = [];
            var i = 0;
            for (i = 0;i<l;i++) {
                var td = t.eq(i).children('td');
                if (td.length < 5) continue;
                arr[arr.length] = {
                    'category' : {
                        'title' : td.eq(0).children('a').children('img').attr('alt'), 
                        'url': root_url+td.eq(0).children('a').attr('href'),
                        'id': calculateCategory(td.eq(0).children('a').attr('href').replace('.html',''))
                    },
                    'title' : td.eq(1).children('a').text(),
                    'url' : root_url+td.eq(1).children('a').attr('href'),
                    'size' : calculateSize(td.eq(3).text()),
                    'seeds' : $.trim(td.eq(4).text().split('|')[0]),
                    'leechs' : $.trim(td.eq(4).text().split('|')[1]),
                    'time' : calculateTime(td.eq(1).children('i').text())
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
                url: url+'?search='+encode(text),
                cache : false,
                success: function(data) {
                    view.result(id,readCode(data),t);
                },
                error:function (){
                    view.loadingStatus(2,id);
                }
            });
        }
        var encode = function (sValue) {
            var    text = "", Ucode, ExitValue, s;
            for (var i = 0; i < sValue.length; i++) {
                s = sValue.charAt(i);
                Ucode = s.charCodeAt(0);
                var Acode = Ucode;
                if (Ucode > 1039 && Ucode < 1104) {
                    Acode -= 848;
                    ExitValue = "%" + Acode.toString(16);
                }
                else if (Ucode == 1025) {
                    Acode = 168;
                    ExitValue = "%" + Acode.toString(16);
                }
                else if (Ucode == 1105) {
                    Acode = 184;
                    ExitValue = "%" + Acode.toString(16);          
                } 
                else if (Ucode == 32) {
                    Acode = 32;
                    ExitValue = "%" + Acode.toString(16);          
                } 
                else if (Ucode == 10){
                    Acode = 10;
                    ExitValue = "%0A";
                }
                else {
                    ExitValue = s;          
                }
                text = text + ExitValue; 
            }      
            return text; 
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