var tmp_num = tracker.length;
tracker[tmp_num] = function () {
    var name = 'FreeTorrents';
    var filename = 'free-torrents';
    var id = null;
    var icon = 'data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAQAEAAAAAAAAAAAAAAAEAAAAAAADhkBUAHLUAAB+4AAAhugAA/cgxAB22AAAlvgAA6J4cAOmfHQD4viwAKsMAACS9AAD8xzAA5JUYAOWXGQDnnBsA/MUwAOSXGAD8xjAAE6wAAOKSFgApwgAAM8wAADHKAAAvyAAAILkAAOOUFwDrpB8AFK0AAOKTFgDlmBkA/8wzAACZAADMZgAAAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIiIiIhISEhISIiIiIiIiIiIiIhAA8PISIiIiIiIiIiIiIhABAHISIiIiIiIiIiIiIhAAwPISIiIiIiIiIiIiIhAAQPISIiIiIiIiIiIiIhAAQPISIgICAgICIiIiIiIiEeHwchIiADAwUgIiIiIiIiIQ4fFCEiIAMWBSAiIiIiIiIhER8aISIgAxYBICIiIiIiIiENDx0hIiADGAEgIiIiIiIiISEhISEiIAIYASAiIiIiIiIiIiIiIAMYGSAiIiIiIiIiIiIiIAMYAiAiIiIiIiIiIiIiIAMYAyAiIiIiIiIiIiIiIAMDAyAiIiIiIiIiIiIiICAgICAiIiIiIvg/AADwfwAA4P8AAMH/AACD/wAABB8AAIIPAADBBwAA4IMAAPBBAAD4IAAA/8EAAP+DAAD/BwAA/g8AAPwfAAA%3D';
    var login_url = 'http://login.free-torrents.org/forum/login.php';
    var url = 'http://tr.free-torrents.org/forum/tracker.php';
    var root_url = 'http://tr.free-torrents.org/forum/';
    var about = 'Первый Свободный BitTorrent трекер Free-Torrents.org';
    var flags = {
        a : 1,
        l : 1,
        rs: 1
    }
    var xhr = null;
    var web = function () {
        var calculateCategory = function (f) {
            var groups_arr = [
            /* Сериалы */[2,33,1610,1619,1552,1609,1304,127],
            /* Музыка */[1741,232,178,179,741,740,755,754,766,197,218,219,1191,1192,908,909,1515,1514,901,250,249,145,146,162,161,132,133,157,156,155,154,153,152,151,150,148,147,134,173,172,167,166,165,164,163,135,192,191,190,189,188,187,186,185,184,183,182,181,180,738,750,749,747,748,783,746,744,745,1200,1201,742,743,739,897,898,760,761,758,759,756,757,139,242,233,241,240,239,238,1805,1721,237,236,235,234,1190,1196,1195,1194,1193,136,931,930,929,928,927,926,212,210,208,207,206,205,204,203,201,200,199,198,138,227,226,225,224,223,222,221,140,255,254,253,251,141,798,797,796,795,1241,793,142,779,778,777,776,775,774,773,772,771,770,769,768,767,143,922,921,920,919,918,917,916,915,914,913,912,911,1268,1267,910],
            /* Игры */[1618,169,258,347,346,345,344,220,231,351,350,349,348,245,356,355,354,353,352,252,360,359,358,357,256,257,364,363,259,365,260,202,374,373,372,332,331,330,321,316,313,1454,261,343,342,341,340,339,334,1363,381,380,262,1611,371,370,369,368,366,1371,1787,1421,1740,941,1763,388,1381,1375,1728,1734,1742,424,1379,386,387,390,391,1383,385,384,383,1415,1385,379,1430,1427,1429,1428,1426,1561,1549,1434],
            /* Фильмы */[1603,1604,1605,1782,394,1783,1784,1785,1260,457,1250,456,455,449,453,1743,483,1748,491,482,486,1248,1828,1823,1824,1825,1826,395,1588,463,464,1353,1338,1261,402,476,475],
            /* Мультфтльмы */[396,1252,1585,500,498,499,496,495,497,446,509,1548,514,515,512,517,516,513,511,510,508,506,518,504],
            /* Книги */[1015,1030,1029,1028,1027,1026,1025,1024,1023,1022,1021,1020,969,992,991,1173,1176,990,989,1174,988,1175,986,985,984,983,982,536,979,978,975,974,144,904,903,902,1792,1797,1800,1801,1791,1789,1794,1790,1795,1798,1796,1793,1802],
            /* ПО */[551,1829,1830,1668,1541,561,562,1680,560,563,559,583,600,599,598,597,596,595,594,593,590,589,588,587,586,585,584,603,1595,1596,1594,1587,613,612,611,610,609,607,606,605,604,619,625,624,623,622,1477,621,620,628,642,641,640,639,638,637,636,635,634,633,632,631,630,629,646,659,657,656,655,654,653,651,650,649,648,647,566,574,573,572,571,570,569,568,548,554,555,556,1593,1599,1598,1597,1818],
            /* Анимэ */[401,530,1341,531,529,1543,1542,1546,1545,523],
            /* Док. и юмор */[801,1681,1720,1678,1677,1676,1675,1674,829,826,822,820,1804,1718,819,818,1719,813,810,809,807,803,834,367,1334,853,852,849,848,846,843,842,840,839,838,837,836,835,1503,1764,1648,1504,1505,850,1506,1509,1684,1510,1507,1508,935],
            /* Спорт */[859,1589,877,876,875,874,873,872,871,870,869,868,867,866,865,864,863,862,861,860,1471,1701,1245,1724,1722,1723,1707,1706,1705,1704,1726,1703],
            /*xxx */ [1313,1567,1323,1330,1340,1331,1325,1324,1439,444,1440,403,1686,1316,1739,1730,1317,1315,1311,1322,1321,1320,1319,1562,1564,1563,1478,1314,1536,1312,1590,1501]
            ];
            for (var i=0;i<groups_arr.length;i++)
                if (jQuery.inArray(parseInt(f),groups_arr[i]) > -1) {
                    return i;
                }
            return -1;
        }
        var readCode = function (c) {
            c = view.contentFilter(c);
            var t = $(c);
            view.auth(1,id);
            t = t.find('#main_content_wrap').children('#tor-tbl').children('tbody').children('tr');
            var l = t.length;
            var arr = [];
            var i = 0;
            for (i = 0;i<l;i++) {
                var td = t.eq(i).children('td');
                if (td.eq(5).children('p').children('a').attr('href') == null) continue;
                arr[arr.length] = {
                    'category' : {
                        'title' : td.eq(2).children('a').text(), 
                        'url': root_url+td.eq(2).children('a').attr('href'),
                        'id': calculateCategory(td.eq(2).children('a').attr('href').replace(/.*f=([0-9]*).*$/i,"$1"))
                    },
                    'title' : td.eq(3).children('a').text(),
                    'url' : td.eq(3).children('a').attr('href'),
                    'size' : td.eq(5).children('u').text(),
                    'dl' : td.eq(5).children('p').children('a').attr('href'),
                    'seeds' : td.eq(6).children('b').text(),
                    'leechs' : td.eq(7).children('b').text(),
                    'time' : td.eq(9).children('u').text()
                }
            }
            return arr;
        }
        var loadPage = function (text) {
            var t = text;
            if (xhr != null)
                xhr.abort();
            xhr = $.ajax({
                type: 'POST',
                url: url+'?nm='+encode(text),
                cache : false,
                success: function(data) {
                    view.result(id,readCode(data),t);
                },
                error:function (){
                    view.loadingStatus(2,id);
                    view.auth(0,id);
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
        login_url : login_url,
        name : name,
        icon : icon,
        about : about,
        url : root_url,
        filename : filename,
        flags : flags
    }
}();
engine.ModuleLoaded(tmp_num);