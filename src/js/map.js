if ($('#x3-map-wrap').length > 0) {
    function is_array(mixed_var) {
        return (mixed_var instanceof Array);
    }

    function empty(mixed_var) {
        return (mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || (is_array(mixed_var) && mixed_var.length === 0) || mixed_var === undefined);
    }
    var map = null,
        points,
        cpoints,
        spoints,
        way_on_map = null,
        sel_way = 0,
        sel_region = 0,
        group = null,
        params = [],
        search_length = 0,
        balloon = null;

    var options = {
        zoom: 12,
        cLat: 53.35451615083649, // center
        cLng: 83.72724894482427
    }


    var MyMap = function () { }

    MyMap.prototype = {

        getPoints: function (param) {

            var m = this;
            cpoints = {
                "99": {
                    "id": "99",
                    "lo": "53.333812",
                    "la": "83.790933",
                    "ph": "iblock/5a5/3yufq3g20ncgputs04ikpp5zzpmiqdra/foto.jpg",
                    "po": 1,
                    "ir": "7",
                    "n": "Ресторан-поэма «Живые души»",
                    "m": "",
                    "nur": "/objects/where_eat/restaurants/restoran-poema-zhivye-dushi/",
                    "ico": null,
                    "pr": "Да"
                },
                "100": {
                    "id": "100",
                    "lo": "53.330999",
                    "la": "83.801803",
                    "ph": "iblock/999/3asb8qtjko7j5ia0d6haprphzt3r7jra/foto-birdok.jpg",
                    "po": 1,
                    "ir": "7",
                    "n": "Ресторан «Бирдок»",
                    "m": "",
                    "nur": "/objects/where_eat/restaurants/restoran-birdok/",
                    "ico": null,
                    "pr": ""
                },
                "102": {
                    "id": "102",
                    "lo": "53.351975644361",
                    "la": "83.762269642833",
                    "ph": "iblock/b23/ule5al3r9u01v5d3gb17rojxnbmg39gk/Фасад !.JPG",
                    "po": 1,
                    "ir": "12",
                    "n": "Отель Александр Хаус",
                    "m": "",
                    "nur": "/objects/where_stay/hotels/test2/",
                    "ico": null,
                    "pr": ""
                },
                "115": {
                    "id": "115",
                    "lo": "53.340847",
                    "la": "83.783245",
                    "ph": "iblock/0ad/fyo85p8ekgpgfe5ms2y03g7q7g23c1yk/210742051.jpg",
                    "po": 1,
                    "ir": "12",
                    "n": " Гостиница Русь",
                    "m": "Гостиница «Русь — расположена в самом центре деловой активности города.",
                    "nur": "/objects/where_stay/hotels/rus/",
                    "ico": null,
                    "pr": "Да"
                },
                "116": {
                    "id": "116",
                    "lo": "53.348148667382",
                    "la": "83.770128269552",
                    "ph": "iblock/701/tfk7gahg8rn0n4253anera3pzybegj5b/Скриншот 15-09-2022 001914.jpg",
                    "po": 1,
                    "ir": "12",
                    "n": "Гостиница Сибирь",
                    "m": "<p>\r\n\t Гостиница «Сибирь», расположенная в центре города Барнаула.\r\n</p>\r\n<p>\r\n\t К вашим услугам:\r\n</p>\r\n<ul>\r\n\t<li>номерной фонд гостиницы составляет 91 номер. Гостиница предлагаем своим гостям номера большей площади, чем принято по стандартам гостиничного бизнеса;</li>\r\n\t<li>ежедневно в ресторане «Сибирь» сервируют завтраки по системе «шведский стол»;</li>\r\n\t<li>конференц-зал на 35 человек, оснащенный оборудованием для проведения переговоров и конференций, соответствующих современным требованиям;</li>\r\n\t<li>банкетный зал на 45 человек;</li>\r\n\t<li>бесплатная автомобильная парковка перед гостиницей;</li>\r\n\t<li>платная охраняемая парковка на закрытой территории;</li>\r\n\t<li>камера хранения багажа;</li>\r\n\t<li>автопарк;</li>\r\n\t<li>ресторан, бар;</li>\r\n\t<li>сауна с бассейном</li>\r\n</ul>",
                    "nur": "/objects/where_stay/hotels/sibir/",
                    "ico": null,
                    "pr": ""
                },
                "118": {
                    "id": "118",
                    "lo": "53.334418793721",
                    "la": "83.788907566509",
                    "ph": "iblock/7ab/ulds0rc37e67v1vqhriip6wtwuls63jm/canvas.png",
                    "po": 1,
                    "ir": "12",
                    "n": "Бизнес-отель Улитка",
                    "m": "<p>\r\n\t Отель «Улитка» удобен как для работы, так и для отдыха. «Улитка» расположен в деловом центре Барнаула.\r\n</p>\r\n<p>\r\n\t В радиусе 1-2 км от отеля находятся самые известные городские и исторические достопримечательности, театры и рестораны, туристско-рекреационная зона.\r\n</p>\r\n<p>\r\n\t К вашим услугам:\r\n</p>\r\n<ul>\r\n\t<li>47 номера с различной ценовой категорией;</li>\r\n\t<li>конференц-залы на 15,35,50, 85, 110 человек;</li>\r\n\t<li>лаундж бар на 20 человек;</li>\r\n\t<li>организация питания (завтраки) по программе «шведский стол» включены в стоимость проживания;</li>\r\n\t<li>доступно питание по меню, бар.</li>\r\n\t<li>салон красоты;</li>\r\n\t<li>SPA салон;</li>\r\n\t<li>камера хранения багажа;</li>\r\n\t<li>услуги прачечной;</li>\r\n\t<li>сувенирная лавка;</li>\r\n\t<li>автостоянка с постоянным видеонаблюдением.</li>\r\n</ul>",
                    "nur": "/objects/where_stay/hotels/ulitka/",
                    "ico": null,
                    "pr": "Да"
                },
                "119": {
                    "id": "119",
                    "lo": "53.327200003901",
                    "la": "83.753344713996",
                    "ph": "iblock/e86/mx0b82twjbo5fis5mgy1tw1y60l4tma9/DSCF9237-min.jpg",
                    "po": 1,
                    "ir": "12",
                    "n": "Гостиный двор На прудах",
                    "m": "<p>\r\n\t Гостиный двор расположен в центре Барнаула рядом с крупными торговыми и деловыми центрами города.\r\n</p>\r\n <br>",
                    "nur": "/objects/where_stay/hotels/gostinyy-dvor-na-prudakh/",
                    "ico": null,
                    "pr": "Да"
                },
                "120": {
                    "id": "120",
                    "lo": "53.339109799147",
                    "la": "83.689439971669",
                    "ph": "iblock/f96/hvrqtw2b62yrj98a65na3tsrw5g74d2y/WhatsApp Image 2022-08-08 at 15.13.26 (1).jpeg",
                    "po": 1,
                    "ir": "12",
                    "n": "Отель Fox",
                    "m": "<p>\r\n\t Отель\"Фокс\" расположен в бизнес-центре города Барнаула, расстояние до международного аэропорта составляет 12 км.\r\n</p>\r\n<p>\r\n\t К вашим услугам:\r\n</p>\r\n<ul>\r\n\t<li>номера с различной ценовой категорией;</li>\r\n\t<li>кофе-холл;</li>\r\n\t<li>организация питания (завтраки) сервируются по меню;</li>\r\n\t<li>услуги будильника;</li>\r\n\t<li>услуги прачечной;</li>\r\n\t<li>охраняемая автостоянка</li>\r\n</ul>",
                    "nur": "/objects/where_stay/hotels/set-oteley-foks/",
                    "ico": null,
                    "pr": "Да"
                },
                "121": {
                    "id": "121",
                    "lo": "53.339618720777",
                    "la": "83.678758088869",
                    "ph": "iblock/436/rdd4azznm3z801vzt8igtf587ojekose/image-31-08-22-03-09-4.jpeg",
                    "po": 1,
                    "ir": "12",
                    "n": "Отель City Fox",
                    "m": "<p>\r\n\t Отель \"Сити Фокс\" удобно расположен в городе в Барнауле. Расстояние до международного аэропорта Барнаул составляет 10 км.\r\n</p>",
                    "nur": "/objects/where_stay/hotels/siti-foks/",
                    "ico": null,
                    "pr": "Да"
                },
                "122": {
                    "id": "122",
                    "lo": "53.347968981809",
                    "la": "83.786902942833",
                    "ph": "iblock/741/r27v9wv3lrx318ruqumpv12fi3t40ogb/IMG-20221014-WA0030.jpg",
                    "po": 1,
                    "ir": "12",
                    "n": "Отель Red Fox",
                    "m": "<p>\r\n\t Отель \"Ред Фокс\" находится в исторической части города, расположен 1 км от центра города.\r\n</p>",
                    "nur": "/objects/where_stay/hotels/red-foks/",
                    "ico": null,
                    "pr": "Да"
                },
                "135": {
                    "id": "135",
                    "lo": "53.329477",
                    "la": "83.787582",
                    "ph": "iblock/48d/ths0x0teg6rbw2ommdf53dmqziuytyn0/2 краеведческий.jpg",
                    "po": 1,
                    "ir": "21",
                    "n": "Алтайский государственный краеведческий музей",
                    "m": "",
                    "nur": "/objects/where_visit/Museums/altayskiy-gosudarstvennyy-kraevedcheskiy-muzey/",
                    "ico": null,
                    "pr": ""
                },
                "136": {
                    "id": "136",
                    "lo": "53.330058",
                    "la": "83.789011",
                    "ph": "iblock/dbb/k225hue82d77sz650yo0q244dn0wyt1g/IMG_9519.jpg",
                    "po": 1,
                    "ir": "21",
                    "n": "Горная аптека",
                    "m": "",
                    "nur": "/objects/where_visit/Museums/gornaya-apteka/",
                    "ico": null,
                    "pr": ""
                },
                "137": {
                    "id": "137",
                    "lo": "53.329009",
                    "la": "83.787798",
                    "ph": "iblock/dc2/byg7mgzwocsyxo1gqih9nbfp451a20ch/IMG-20221006-WA0042.jpg",
                    "po": 1,
                    "ir": "21",
                    "n": "Музей &quot;Мир камня&quot;",
                    "m": "",
                    "nur": "/objects/where_visit/Museums/mir-kamnya/",
                    "ico": null,
                    "pr": "Да"
                },
                "138": {
                    "id": "138",
                    "lo": "53.334435",
                    "la": "83.801371",
                    "ph": "iblock/746/rrq7mxg7auyum935sdzb1q1kywz95e6b/ГМИЛИКА.jpg",
                    "po": 1,
                    "ir": "21",
                    "n": "Государственный музей истории литературы, искусства и культуры Алтая",
                    "m": "",
                    "nur": "/objects/where_visit/Museums/gosudarstvennyy-muzey-istorii-literatury-iskusstva-i-kultury-altaya/",
                    "ico": null,
                    "pr": ""
                },
                "139": {
                    "id": "139",
                    "lo": "53.331241",
                    "la": "83.787735",
                    "ph": "iblock/dbb/s6ejn55e3tzaursogrfzbwtjmbzgkire/18f589d6-cde1-4fc6-b148-b01585897a1d.jpg",
                    "po": 1,
                    "ir": "21",
                    "n": "Музей шоколадного мастерства",
                    "m": "",
                    "nur": "/objects/where_visit/Museums/muzey-shokoladnogo-masterstva/",
                    "ico": null,
                    "pr": "Да"
                },
                "140": {
                    "id": "140",
                    "lo": "53.365052",
                    "la": "83.752135",
                    "ph": "iblock/1d3/qqhm7h19gd7g0b2osejh72v6obq1uyvx/mir-vremeni.jpg",
                    "po": 1,
                    "ir": "21",
                    "n": "Мир времени",
                    "m": "",
                    "nur": "/objects/where_visit/Museums/mir-vremeni/",
                    "ico": null,
                    "pr": ""
                },
                "141": {
                    "id": "141",
                    "lo": "53.332413",
                    "la": "83.799251",
                    "ph": "iblock/8de/u2pqjpdz9v8lf915d2drugxuj9dtetgn/Художественный музей.jpg",
                    "po": 1,
                    "ir": "21",
                    "n": "Государственный художественный музей Алтайского края",
                    "m": "",
                    "nur": "/objects/where_visit/Museums/gosudarstvennyy-khudozhestvennyy-muzey-altayskogo-kraya/",
                    "ico": null,
                    "pr": ""
                },
                "143": {
                    "id": "143",
                    "lo": "53.332612",
                    "la": "83.792811",
                    "ph": "iblock/73c/tlfdqoopt2hpvqoyjk5orfjcxlxfa924/sibir.jpg",
                    "po": 1,
                    "ir": "16",
                    "n": "Концертный зал «Сибирь»",
                    "m": "",
                    "nur": "/objects/where_visit/theaters/kontsertnyy-zal-sibir/",
                    "ico": null,
                    "pr": ""
                },
                "144": {
                    "id": "144",
                    "lo": "53.346876",
                    "la": "83.773488",
                    "ph": "iblock/699/ednyzco3yo74ywivfc5cawf18mfzs3yi/teatr-drama.jpg",
                    "po": 1,
                    "ir": "16",
                    "n": "Алтайский краевой театр драмы имени В. М. Шукшина",
                    "m": "",
                    "nur": "/objects/where_visit/theaters/altayskiy-kraevoy-teatr-dramy-imeni-v-m-shukshina/",
                    "ico": null,
                    "pr": ""
                },
                "145": {
                    "id": "145",
                    "lo": "53.350483",
                    "la": "83.783953",
                    "ph": "iblock/583/q91bry2xupz10oqw2f0xkl3kww9938ei/фасад 1.jpg",
                    "po": 1,
                    "ir": "16",
                    "n": "Алтайский государственный музыкальный театр",
                    "m": "",
                    "nur": "/objects/where_visit/theaters/altayskiy-gosudarstvennyy-muzykalnyy-teatr/",
                    "ico": null,
                    "pr": ""
                },
                "146": {
                    "id": "146",
                    "lo": "53.355422",
                    "la": "83.771053",
                    "ph": "iblock/e1e/nuj3m7hx7utq2jro2iq1wd91gh6kzp8j/mta.jpg",
                    "po": 1,
                    "ir": "16",
                    "n": "Молодёжный театр Алтая им.В.С.Золотухина",
                    "m": "",
                    "nur": "/objects/where_visit/theaters/molodyezhnyy-teatr-altaya-im-v-s-zolotukhina/",
                    "ico": null,
                    "pr": ""
                },
                "147": {
                    "id": "147",
                    "lo": "53.332182",
                    "la": "83.791544",
                    "ph": "iblock/b24/wge8hy2h2ftcljhph1dydpfww0pjgvgg/театр Сказка.jpg",
                    "po": 1,
                    "ir": "16",
                    "n": "Алтайский государственный театр кукол «Сказка»",
                    "m": "",
                    "nur": "/objects/where_visit/theaters/altayskiy-gosudarstvennyy-teatr-kukol-skazka/",
                    "ico": null,
                    "pr": ""
                },
                "148": {
                    "id": "148",
                    "lo": "53.329133",
                    "la": "83.788795",
                    "ph": "iblock/f8e/d58s1lgd71sebyabk90vaqr7hzb6vj7d/филармония.jpg",
                    "po": 1,
                    "ir": "16",
                    "n": "Государственная филармония Алтайского края",
                    "m": "",
                    "nur": "/objects/where_visit/theaters/gosudarstvennaya-filarmoniya-altayskogo-kraya/",
                    "ico": null,
                    "pr": ""
                },
                "160": {
                    "id": "160",
                    "lo": "53.34657",
                    "la": "83.779246",
                    "ph": "iblock/d54/yln3in4xvn2cnkz5a9fsbzjy0flf1rq3/lakomka.jpg",
                    "po": 1,
                    "ir": "8",
                    "n": "Кафе «Lakomka»",
                    "m": "",
                    "nur": "/objects/where_eat/kafe/kafe-lakomka/",
                    "ico": null,
                    "pr": ""
                },
                "161": {
                    "id": "161",
                    "lo": "53.348021",
                    "la": "83.768026",
                    "ph": "iblock/2ca/7i1py8mv1qpapyhs9m46lyxjzkr29bo3/adjika.jpg",
                    "po": 1,
                    "ir": "7",
                    "n": "Ресторан «Аджика»",
                    "m": "",
                    "nur": "/objects/where_eat/restaurants/restoran-adzhika/",
                    "ico": null,
                    "pr": "Да"
                },
                "162": {
                    "id": "162",
                    "lo": "53.333107",
                    "la": "83.786864",
                    "ph": "iblock/bdd/nwnmbfjug0jg7jadj004r378bd2jky2r/IMG-20221028-WA0008.jpg",
                    "po": 1,
                    "ir": "8",
                    "n": "Кафе правильного питания «Кунжут и тыква» ",
                    "m": "",
                    "nur": "/objects/where_eat/kafe/kafe-pravilnogo-pitaniya-kunzhut-i-tykva/",
                    "ico": null,
                    "pr": "Да"
                },
                "163": {
                    "id": "163",
                    "lo": "53.329574",
                    "la": "83.795101",
                    "ph": "iblock/72d/r3cq1ry9gzuyzzqtxboo67k2sfrjaprn/image-13-09-22-03-50.jpeg",
                    "po": 1,
                    "ir": "7",
                    "n": "TomYumBar",
                    "m": "",
                    "nur": "/objects/where_eat/restaurants/tomyumbar/",
                    "ico": null,
                    "pr": ""
                },
                "167": {
                    "id": "167",
                    "lo": "53.348021",
                    "la": "83.768026",
                    "ph": "iblock/c06/2c3et07p8rrzrlwcs2siuml810t16n3g/66648821_218663472443405_1075440219340432270_n (1).jpg",
                    "po": 1,
                    "ir": "7",
                    "n": "Ресторан «Иероглиф»",
                    "m": "",
                    "nur": "/objects/where_eat/restaurants/restoran-ieroglif/",
                    "ico": null,
                    "pr": ""
                },
                "191": {
                    "id": "191",
                    "lo": "53.345677",
                    "la": "83.759339",
                    "ph": "iblock/9dc/bfwqu4yl390rpxourj67ca106zdv4m9e/1.jpg",
                    "po": 1,
                    "ir": "7",
                    "n": "Семейный ресторан «Damiani»",
                    "m": "",
                    "nur": "/objects/where_eat/restaurants/semeynyy-restoran-damiani/",
                    "ico": null,
                    "pr": ""
                },
                "194": {
                    "id": "194",
                    "lo": "53.345774",
                    "la": "83.769975",
                    "ph": "iblock/e55/9m5fl8ibjti8svmiyjm553b95uz588u1/DSC_0519о.jpg",
                    "po": 1,
                    "ir": "12",
                    "n": "Гостиница Колос",
                    "m": "",
                    "nur": "/objects/where_stay/hotels/gostinitsa-kolos/",
                    "ico": null,
                    "pr": "Да"
                },
                "195": {
                    "id": "195",
                    "lo": "53.337086",
                    "la": "83.789729",
                    "ph": "iblock/629/jj5bx9z972pcmfxez6hc1g6nljavky12/Фасад.JPG",
                    "po": 1,
                    "ir": "12",
                    "n": "Гостиница Алтай ",
                    "m": "",
                    "nur": "/objects/where_stay/hotels/gostinitsa-altay-/",
                    "ico": null,
                    "pr": "Да"
                },
                "196": {
                    "id": "196",
                    "lo": "53.280506",
                    "la": "83.753186",
                    "ph": "iblock/9a6/laq9etn5a3rm4zmdvc4rknxamcm6txvc/Фоновая.JPG",
                    "po": 1,
                    "ir": "12",
                    "n": "Гостиный дом Прага",
                    "m": "",
                    "nur": "/objects/where_stay/hotels/praga/",
                    "ico": null,
                    "pr": "Да"
                },
                "197": {
                    "id": "197",
                    "lo": "53.347441",
                    "la": "83.762133",
                    "ph": "iblock/d4f/4wsbo4xwerahsdsdcyv5yao73b1mxjg0/00001.jpg",
                    "po": 1,
                    "ir": "12",
                    "n": "Гостиница Барнаул",
                    "m": "Гостиница «Барнаул» – крупнейший отель столицы Алтайского края.",
                    "nur": "/objects/where_stay/hotels/gostinitsa-barnaul/",
                    "ico": null,
                    "pr": "Да"
                },
                "198": {
                    "id": "198",
                    "lo": "53.340065",
                    "la": "83.772841",
                    "ph": "iblock/e23/u5dgk5rsjimcwx4dsui3l9svfe3sneuj/KZR_4507.jpg",
                    "po": 1,
                    "ir": "12",
                    "n": "Гостиница Турист",
                    "m": "Гостиница «Турист» расположена в самом центре Барнаула.",
                    "nur": "/objects/where_stay/hotels/gostinitsa-turist/",
                    "ico": null,
                    "pr": "Да"
                },
                "199": {
                    "id": "199",
                    "lo": "53.330058",
                    "la": "83.789011",
                    "ph": "iblock/972/093venxczn57mv2p1unawk631as829n3/6. Фасад здания. Памятник 18 века.JPG",
                    "po": 1,
                    "ir": "7",
                    "n": "Ресторация сибирской кухни Центра алтайского гостеприимства «Горная аптека»",
                    "m": "Ресторация - одно из самых старых каменных зданий города Барнаула.",
                    "nur": "/objects/where_eat/restaurants/restoratsiya-sibirskoy-kukhni-tsentra-altayskogo-gostepriimstva-gornaya-apteka/",
                    "ico": null,
                    "pr": "Да"
                },
                "200": {
                    "id": "200",
                    "lo": "53.314508",
                    "la": "83.819958",
                    "ph": "iblock/a2d/tli3tv6t4m8h1r4k7r4oqz4jcqoe63kk/0237.jpg",
                    "po": 1,
                    "ir": "7",
                    "n": "Ресторан «Заречье»",
                    "m": "Ресторан «Заречье» расположился на территории одноименного яхт-клуба.",
                    "nur": "/objects/where_eat/restaurants/restoran-zareche/",
                    "ico": null,
                    "pr": ""
                },
                "203": {
                    "id": "203",
                    "lo": "53.347441",
                    "la": "83.762133",
                    "ph": "iblock/7a7/1sla4j1kew2db3j9eow7mio1og8t3ga0/IMG-20221013-WA0026.jpg",
                    "po": 1,
                    "ir": "7",
                    "n": "Ресторан «Барнаул»",
                    "m": "Атмосферное место для встречи людей в самом центре Барнаула.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
                    "nur": "/objects/where_eat/restaurants/restoran-barnaul/",
                    "ico": null,
                    "pr": "Да"
                },
                "204": {
                    "id": "204",
                    "lo": "53.346962",
                    "la": "83.764729",
                    "ph": "iblock/399/ou51t13vrxysb8myefn3yj96z8d64wzh/IMG-20221027-WA0006.jpg",
                    "po": 1,
                    "ir": "7",
                    "n": "Ресторан «Ползуновъ»",
                    "m": "Роскошный ресторан в центре города с изысканной кухней народов России. ",
                    "nur": "/objects/where_eat/restaurants/restoran-polzunov/",
                    "ico": null,
                    "pr": "Да"
                },
                "205": {
                    "id": "205",
                    "lo": "53.344041",
                    "la": "83.781901",
                    "ph": "iblock/b9f/c5ls6mezelr5v75c5muwz24jt2p8y8z7/IMG_0733.JPG",
                    "po": 1,
                    "ir": "7",
                    "n": "Кавказский ресторан «Пили-швили»",
                    "m": "Вас ждет уютная обстановка и вкуснейшая разнообразная кухня.",
                    "nur": "/objects/where_eat/restaurants/kavkazskiy-restoran-pili-shvili/",
                    "ico": null,
                    "pr": "Да"
                },
                "212": {
                    "id": "212",
                    "lo": "53.331031",
                    "la": "83.793233",
                    "ph": "iblock/033/dxznw24nwrkzirypf3k2ymsi3169z7um/0018.jpg",
                    "po": 1,
                    "ir": "7",
                    "n": "Дом-ресторан «Ясная поляна»",
                    "m": "",
                    "nur": "/objects/where_eat/restaurants/dom-restoran-yasnaya-polyana/",
                    "ico": null,
                    "pr": ""
                },
                "214": {
                    "id": "214",
                    "lo": "53.34589",
                    "la": "83.77745",
                    "ph": "iblock/29f/ph07ae3woptx1fq7xcjtnrpaucuf303p/003.jpg",
                    "po": 1,
                    "ir": "12",
                    "n": "Отель Центральный ",
                    "m": "Отель &quot;Центральный&quot; - бизнес-отель в центре города.",
                    "nur": "/objects/where_stay/hotels/tsentralnyy/",
                    "ico": null,
                    "pr": ""
                },
                "215": {
                    "id": "215",
                    "lo": "53.3458913",
                    "la": "83.7749678",
                    "ph": "iblock/a53/5ck68fdoyfrh1rdy5vctoibxeecz6d27/Анонс 11.png",
                    "po": 1,
                    "ir": "8",
                    "n": "FreeMan's coffee-bar",
                    "m": "",
                    "nur": "/objects/where_eat/kafe/freeman-s-coffee-bar/",
                    "ico": null,
                    "pr": ""
                },
                "216": {
                    "id": "216",
                    "lo": "53.3459606",
                    "la": "83.7753141",
                    "ph": "iblock/29b/rxxchbqkdbeelypk7e32i5ouq6dtqkv8/Анонс 1.png",
                    "po": 1,
                    "ir": "8",
                    "n": "Кофейня «Центральная» ",
                    "m": "Центральная кофейня - это место, где атмосфера, качество блюд и скорость обслуживания соединяются в одно целое.&nbsp;<br>",
                    "nur": "/objects/where_eat/kafe/tsentralnaya/",
                    "ico": null,
                    "pr": ""
                },
                "217": {
                    "id": "217",
                    "lo": "53.3458913",
                    "la": "83.7749678",
                    "ph": "iblock/043/m69c653osgyr2jzguvpefdko0l5k2v37/Анонс 1.png",
                    "po": 1,
                    "ir": "8",
                    "n": "Asia bar freeman`s",
                    "m": "",
                    "nur": "/objects/where_eat/kafe/asia-bar-freeman-s/",
                    "ico": null,
                    "pr": ""
                },
                "218": {
                    "id": "218",
                    "lo": "53.3294868",
                    "la": "83.7904772",
                    "ph": "iblock/48f/r1ftt4cqmo2du8qpkplyu9d0fi0j0lxu/Лалетин общий вид.jpeg",
                    "po": 1,
                    "ir": "12",
                    "n": "Гостиница Лалетин",
                    "m": "",
                    "nur": "/objects/where_stay/hotels/gostinitsa-laletin/",
                    "ico": null,
                    "pr": "Да"
                },
                "219": {
                    "id": "219",
                    "lo": "53.344081",
                    "la": "83.782004",
                    "ph": "iblock/f55/05n5teph5eazqpv45mx0i3t0aactt8u0/IMG_0747.PNG",
                    "po": 1,
                    "ir": "7",
                    "n": "Караоке-ресторан «Jackson»",
                    "m": "",
                    "nur": "/objects/where_eat/restaurants/dzhekson/",
                    "ico": null,
                    "pr": ""
                },
                "220": {
                    "id": "220",
                    "lo": "53.338855",
                    "la": "83.786208",
                    "ph": "iblock/201/1sgzoz9et3ooi8iefj34u75xoatp26bm/IMG_0736.JPG",
                    "po": 1,
                    "ir": "7",
                    "n": "Гриль-бар «Пожарка»",
                    "m": "",
                    "nur": "/objects/where_eat/restaurants/kafe-pozharka/",
                    "ico": null,
                    "pr": "Да"
                },
                "223": {
                    "id": "223",
                    "lo": "53.3338155",
                    "la": "83.7843382",
                    "ph": "iblock/574/wqabx9nb4las6bhl2c3n8gqusqowtthq/IMG-20221108-WA0003.jpg",
                    "po": 1,
                    "ir": "7",
                    "n": "Ресторан «Atlas»",
                    "m": "Атмосферный интерьер, живой камин, уютная терраса и профессионализм нашей команды - это всё Атлас.",
                    "nur": "/objects/where_eat/restaurants/atlas/",
                    "ico": null,
                    "pr": ""
                },
                "224": {
                    "id": "224",
                    "lo": "53.3372309",
                    "la": "83.7779409",
                    "ph": "iblock/ad9/1xnf2g6qoywyztglc5llflsgtbnv0jzm/IMG-20221108-WA0002.jpg",
                    "po": 1,
                    "ir": "7",
                    "n": "Ресторан-бар «KAKTUS»",
                    "m": "Колоритный ресторан в самом центре города.",
                    "nur": "/objects/where_eat/restaurants/restoran-bar-kaktus/",
                    "ico": null,
                    "pr": "Да"
                },
                "232": {
                    "id": "232",
                    "lo": "53.3144864",
                    "la": "83.8176425",
                    "ph": "iblock/ce6/ub88uw5i8iuz62hfg6g22j2efrymoszw/IMG-20221108-WA0016.jpg",
                    "po": 1,
                    "ir": "12",
                    "n": "Отель Заречье",
                    "m": "Отель расположился в живописном месте на берегу залива реки Обь, всего в 10 минутах езды от центра города.",
                    "nur": "/objects/where_stay/hotels/otel-zareche/",
                    "ico": null,
                    "pr": ""
                },
                "1280": {
                    "id": "1280",
                    "lo": "53.350456",
                    "la": "83.771925",
                    "ph": "iblock/963/5y41b1r11v9nfq4w2ibujcqhhhq3g112/2022-10-04 10-50-17 (9).jpeg",
                    "po": 1,
                    "ir": "12",
                    "n": "Гостиница Алтай Лофт",
                    "m": "Гостиница в самом центре Барнаула в стиле лофт, недалеко от проспекта Ленина и всех значимых объектов города.<br />\n",
                    "nur": "/objects/where_stay/hotels/gostinitsa-altay-loft/",
                    "ico": null,
                    "pr": "Да"
                },
                "1288": {
                    "id": "1288",
                    "lo": "53.346554",
                    "la": "83.760013",
                    "ph": "iblock/895/fz0e3hppklb0zj3bdsua69iggs7mqaop/12.jpg",
                    "po": 1,
                    "ir": "14",
                    "n": "Хостел Прованс",
                    "m": "<span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\">Уютный домашний хостел расположился в историческом центре города Барнаула. Стильный дизайн интерьера создает домашний уют и неповторимую атмосферу французского Прованса.</span>",
                    "nur": "/objects/where_stay/hostels/khostel-provans/",
                    "ico": null,
                    "pr": "Да"
                },
                "1289": {
                    "id": "1289",
                    "lo": "53.351719",
                    "la": "83.777584",
                    "ph": "iblock/662/b91gxehme7xlzn2yux8a0a1ede39awro/фото (92).jpg",
                    "po": 1,
                    "ir": "14",
                    "n": "Хостел Вагон",
                    "m": "<span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\">Современный хостел в самом центре города Барнаула, в пешей доступности от железнодорожного и автовокзала.</span>",
                    "nur": "/objects/where_stay/hostels/khostel-vagon/",
                    "ico": null,
                    "pr": "Да"
                },
                "1292": {
                    "id": "1292",
                    "lo": "53.281362",
                    "la": "83.752557",
                    "ph": "iblock/0da/op4ybwqqqk1l5plbqjuraapxa717wl36/_DSC1397.JPG",
                    "po": 1,
                    "ir": "13",
                    "n": "Санаторий Обь",
                    "m": "<span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\">Санаторий «Обь» нацелен на то, чтобы при любой продолжительности пребывания в санатории Вы смогли извлечь максимальную пользу для своего здоровья, и уехали с желанием вернуться сюда вновь.</span>",
                    "nur": "/objects/where_stay/sanatoriums/sanatoriy-ob/",
                    "ico": null,
                    "pr": "Да"
                },
                "1310": {
                    "id": "1310",
                    "lo": "53.337538",
                    "la": "83.786441",
                    "ph": "iblock/d6d/w9wpjm31cypqihvwj9h7sky53d6wnbyu/2.jpg",
                    "po": 1,
                    "ir": "7",
                    "n": "Ресторан Место Пасты",
                    "m": "Ресторан-фабрика, где при тебе делают свежую пасту и не только......",
                    "nur": "/objects/where_eat/restaurants/restoran-mesto-pasty/",
                    "ico": null,
                    "pr": "Да"
                },
                "1400": {
                    "id": "1400",
                    "lo": "53.330432945378",
                    "la": "83.79297203452",
                    "ph": "iblock/9c6/otu0svmx0h7a3py61v6p4wci6l7bjej8/IMG_9578.jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "Улица Мало-Тобольская",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/ulitsa-malo-tobolskaya/",
                    "ico": null,
                    "pr": ""
                },
                "1402": {
                    "id": "1402",
                    "lo": "53.329075953848",
                    "la": "83.792126475375",
                    "ph": "iblock/da4/s76fmrdqnu2tyih74eszvruuktlj3sod/1.jpeg",
                    "po": 1,
                    "ir": "22",
                    "n": "Универмаг торгового дома «Д. Н. Сухова сыновья»",
                    "m": "<div>\r\n <br>\r\n</div>\r\n <br>",
                    "nur": "/objects/where_visit/Monuments/univermag-torgovogo-doma-d-n-sukhova-synovya/",
                    "ico": null,
                    "pr": ""
                },
                "1403": {
                    "id": "1403",
                    "lo": "53.324024600052",
                    "la": "83.795256080375",
                    "ph": "iblock/a09/ajc0w7pkh2vsilfaowjdqzuxk58xh7tz/Панорама.jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "Нагорный парк",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/nagornyy-park/",
                    "ico": null,
                    "pr": ""
                },
                "1404": {
                    "id": "1404",
                    "lo": "53.329044415752",
                    "la": "83.791246710684",
                    "ph": "iblock/e3b/kfsvlkdy8f122xvx1dkqhks9jyziw0wu/FIB_3187.JPG",
                    "po": 1,
                    "ir": "22",
                    "n": "Здание диспетчерской ",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/dispetcherskiy-punkt-tramvaev-ploshchad-svobody/",
                    "ico": null,
                    "pr": ""
                },
                "1405": {
                    "id": "1405",
                    "lo": "53.328868434514",
                    "la": "83.789691738119",
                    "ph": "iblock/f22/fjyx15lk1dru338e3cujxo4ptmf91p3a/961A8032.jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "Ботанический сад",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/aptekarskiy-sad/",
                    "ico": null,
                    "pr": ""
                },
                "1406": {
                    "id": "1406",
                    "lo": "53.329323722626",
                    "la": "83.788639683033",
                    "ph": "iblock/e51/qe70f1x9dk8g406qc7u6ze9bvli8elav/IMG_0315.jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "Народный дом",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/narodnyy-dom/",
                    "ico": null,
                    "pr": ""
                },
                "1407": {
                    "id": "1407",
                    "lo": "53.329014201766",
                    "la": "83.787770799719",
                    "ph": "iblock/9a8/3ryhx3jpigwhxu10zkinb2caaaeczmkq/721-1.jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "Здание инструментального магазина",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/zdanie-instrumentalnogo-magazina/",
                    "ico": null,
                    "pr": ""
                },
                "1408": {
                    "id": "1408",
                    "lo": "53.328736601218",
                    "la": "83.787190250373",
                    "ph": "iblock/569/vxsasc41ydiwg10vmbthlzgdry8wea3b/первая.JPG",
                    "po": 1,
                    "ir": "22",
                    "n": "Здание канцелярии Колывано-Воскресенского завода",
                    "m": "<div>\r\n <span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\">Канцелярия Колывано-Воскресенского завода - первое каменное двухэтажное здание города. Оно было построено во второй половине XVIII&nbsp;века для Горного правления. <br>\r\n </span><br>\r\n <span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\">\r\n\tВ первом здании канцелярии, середины XVIII века, которое не дошло до наших дней, работал изобретатель первой в России паросиловой установки и первого в мире двухцилиндрового парового двигателя Иван Иванович Ползунов. </span><br>\r\n <span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\"><br>\r\n </span><span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\">&nbsp;На башне здания был установлен колокол. Он сигнализировал о начале и окончании работ на сереброплавильном заводе. Позже башню демонтировали.<br>\r\n </span><br>\r\n <span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\">\r\n\tС конца XIX до начало XX&nbsp;века здесь хранили коллекции горного музея: минералы, модели горных машин и устройств. Позднее здание было занято Губернским комитетом красноармейских хозяйств, земельным комитетом и другими государственными учреждениями. </span><br>\r\n <span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\"><br>\r\n </span><span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\">В 2000&nbsp;годах канцелярию отреставрировали, башню восстановили. Это одно из четырех зданий XVIII&nbsp;века, которое сохранилось в Барнауле до наших дней. Является памятником архитектуры федерального значения.<br>\r\n </span><br>\r\n <br>\r\n <span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\">Фото: Вечерний Барнаул</span><span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\"><br>\r\n </span><span style=\"font-family: &quot;Times New Roman&quot;, Times; font-size: 14pt;\"> </span>\r\n</div>\r\n <br>",
                    "nur": "/objects/where_visit/Monuments/zdanie-kantselyarii-kolyvano-voskresenskogo-zavoda/",
                    "ico": null,
                    "pr": ""
                },
                "1409": {
                    "id": "1409",
                    "lo": "53.327365996003",
                    "la": "83.787007939895",
                    "ph": "iblock/e26/qatk00lp4wklnqw83el5ut9w2ebzrje2/FIB_9969.JPG",
                    "po": 1,
                    "ir": "22",
                    "n": "Комплекс сооружений Сереброплавильного завода",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/kompleks-sooruzheniy-serebroplavilnogo-zavoda/",
                    "ico": null,
                    "pr": ""
                },
                "1410": {
                    "id": "1410",
                    "lo": "53.328957253571",
                    "la": "83.7837807571",
                    "ph": "iblock/d07/mv2golr6rrzhlsq8yt1t7nkklgdiqg9x/первая.JPG",
                    "po": 1,
                    "ir": "22",
                    "n": "Демидовская площадь",
                    "m": "<p>\r\n <br>\r\n</p>",
                    "nur": "/objects/where_visit/Monuments/demidovskaya-ploshchad/",
                    "ico": null,
                    "pr": ""
                },
                "1411": {
                    "id": "1411",
                    "lo": "53.329215",
                    "la": "83.787151",
                    "ph": "iblock/b28/e90p8unj9cyyv7fxuq5hdnvmot05e4k6/первая.JPG",
                    "po": 1,
                    "ir": "22",
                    "n": "Здание чертёжной",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/zdanie-chertyezhnoy/",
                    "ico": null,
                    "pr": ""
                },
                "1412": {
                    "id": "1412",
                    "lo": "53.32959391629",
                    "la": "83.787657109216",
                    "ph": "iblock/9a0/38p13pzhjx9mhyltfsmq4h60t19tnfzs/Нартыш.jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "Здание горной лаборатории",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/zdanie-gornoy-laboratorii/",
                    "ico": null,
                    "pr": ""
                },
                "1413": {
                    "id": "1413",
                    "lo": "53.33018714019",
                    "la": "83.788940011067",
                    "ph": "iblock/dbb/k225hue82d77sz650yo0q244dn0wyt1g/IMG_9519.jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "Здание аптеки",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/zdanie-apteki/",
                    "ico": null,
                    "pr": ""
                },
                "1414": {
                    "id": "1414",
                    "lo": "53.330265381439",
                    "la": "83.789468338623",
                    "ph": "iblock/b3f/1n1uwf961188n1wfdwzxu8iffvcbm1uk/961A3901.jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "Управление Алтайского округа",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/upravlenie-altayskogo-okruga/",
                    "ico": null,
                    "pr": ""
                },
                "1415": {
                    "id": "1415",
                    "lo": "53.331276187184",
                    "la": "83.790376155421",
                    "ph": "iblock/54f/xrrkdiy1fzmyl0v4vvxwaqsvnv0owjk2/первая.jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "площадь Свободы",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/sobornaya-ploshchad/",
                    "ico": null,
                    "pr": ""
                },
                "1416": {
                    "id": "1416",
                    "lo": "53.329770696678",
                    "la": "83.784598427212",
                    "ph": "iblock/6a2/habm4b9hhpwjxsfxr08q4tbskz4v6c0w/961A3889(1).jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "Улица Пушкина",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/ulitsa-pushkina/",
                    "ico": null,
                    "pr": ""
                },
                "1417": {
                    "id": "1417",
                    "lo": "53.332494617189",
                    "la": "83.791859596878",
                    "ph": "iblock/449/vyz86onckzszww1q6khc93sjw8xb42rq/IMG_9598.jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "Театр кукол «Сказка» и концертный зал «Сибирь»",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/teatr-kukol-skazka-i-kontsertnyy-zal-sibir/",
                    "ico": null,
                    "pr": ""
                },
                "1418": {
                    "id": "1418",
                    "lo": "53.333385944459",
                    "la": "83.791974272262",
                    "ph": "iblock/b5d/j6y2xfj4swpsd03ujzbplyenapn3uq3p/первая.jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "Сквер имени Пушкина",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/skver-imeni-pushkina/",
                    "ico": null,
                    "pr": ""
                },
                "1419": {
                    "id": "1419",
                    "lo": "53.338641382085",
                    "la": "83.786977986927",
                    "ph": "iblock/bb9/lpuven0olstj52iioesqdqvvb0j8ov54/первая.jpg",
                    "po": 1,
                    "ir": "22",
                    "n": "Проспект Ленина",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/prospekt-lenina/",
                    "ico": null,
                    "pr": ""
                },
                "1420": {
                    "id": "1420",
                    "lo": "53.333526931127",
                    "la": "83.800678602967",
                    "ph": "iblock/a51/a46wle1xqaaebt8cmhp70tp6hawn81jv/общее.JPG",
                    "po": 1,
                    "ir": "22",
                    "n": "Улица Льва Толстого",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/ulitsa-lva-tolstogo/",
                    "ico": null,
                    "pr": ""
                },
                "1440": {
                    "id": "1440",
                    "lo": "53.32920012531",
                    "la": "83.793348988927",
                    "ph": "iblock/cd5/840jitextoc061tgyqj6o5qzsy3rkass/1.jpeg",
                    "po": 1,
                    "ir": "22",
                    "n": "Историческая линия ",
                    "m": "",
                    "nur": "/objects/where_visit/Monuments/istoricheskaya-liniya-1/",
                    "ico": null,
                    "pr": ""
                },
                "1595": {
                    "id": "1595",
                    "lo": "53.354175",
                    "la": "83.771017",
                    "ph": "iblock/b9e/b09d8232hbdr4vys6pen978t7k0g0hqx/PHOTO-2023-11-14-10-08-10 вход.гр.(2).jpg",
                    "po": 1,
                    "ir": "8",
                    "n": "Кафе-оранжерея «Ардекофе» ",
                    "m": "",
                    "nur": "/objects/where_eat/kafe/kafe-oranzhereya-ardekofe/",
                    "ico": null,
                    "pr": ""
                }
            };
            m.setPoints(0, 0, 1);

        },

        SetRubs: function () {

            $("#x3-map-sections a.map_obj_list").each(function () {
                var id = $(this).attr("id").split("_")[1];
                params[id] = ($(this).hasClass('act')) ? id : 0;
            });

            $("#x3-map-sections a.map_obj_list").click(function () {
                $("#x3-map-sections a.map_way_list").removeClass('act');
                $("#x3-map-sections a.map_region_list").removeClass('act');
                var id = $(this).attr("id").split("_")[1];
                MyMap.setPoints(id);
                (params[id] != undefined && params[id] != 0) ? $(this).addClass("act") : $(this).removeClass("act");
                console.log(params);
                // Количество выбранных элементов
                var objectsCnt = 0;
                $(".x3-map__sections a.act").each(function () {
                    objectsCnt += $(this).data("cnt");
                });
                $(".js-close-filter span").text(objectsCnt);
                return false;
            });

            $("#x3-map-sections a.map_way_list").click(function () {
                $("#x3-map-sections a").removeClass('act');

                for (key in params) {
                    params[key] = 0;
                }
                id = $(this).attr("id").split("_")[1];
                MyMap.setWay(id);
                $(this).addClass("act");
                return false;
            });
            $("#x3-map-sections a.map_region_list").click(function () {
                $("#x3-map-sections a").removeClass('act');


                for (key in params) {
                    params[key] = 0;
                }
                id = $(this).attr("id").split("_")[1];
                MyMap.setRegion(id);
                $(this).addClass("act");
                return false;
            });

            $(".x3-map__clear a, .x3-map-filter__clear").click(function () {
                $(".x3-map__sections li a.act").each(function () {
                    $(this).removeClass("act");
                });

                MyMap.setPoints(0);
                for (key in params) {
                    params[key] = 0;
                }
                return false;
            });

            $(".js-map-filter").click(function () {
                $(".x3-map__sections-wrap").show();
                return false;
            });

            $(".js-close-filter").click(function () {
                $(".x3-map__sections-wrap").hide();
                return false;
            });

        },

        setRegion: function (id) {

            var m = this;
            map.balloon.close();
            if (group !== null) { // clear marker group
                if (group !== null) {
                    group.removeAll();
                    map.geoObjects.remove(group);
                    var yPoint = [];
                }
                if (way_on_map !== null) {

                    map.geoObjects.remove(way_on_map);

                }
                way_on_map = null;
                sel_way = 0;

                if (map_reg_objs[id]) {
                    sel_region = id;
                    // alert( map_ways[id]);


                    MyMap.setPoints(0, 0);

                    if (map_reg_coord[id]) {
                        map.balloon.open(map_reg_coord[id], map_reg_info[id]);
                    }

                }

            }



        },

        setWay: function (id) {

            map.balloon.close();
            var m = this;
            if (group !== null) { // clear marker group
                if (group !== null) {
                    group.removeAll();
                    map.geoObjects.remove(group);
                    var yPoint = [];
                }
                if (way_on_map !== null) {

                    map.geoObjects.remove(way_on_map);
                }

                sel_region = 0;
                if (map_ways[id]) {
                    sel_way = id;
                    // alert( map_ways[id]);

                    way_on_map = new ymaps.Polyline(map_ways[id], {
                        hintContent: "Линия маршрута"
                    }, {
                        strokeColor: '#ff0000',
                        strokeWidth: 3
                    });
                    map.geoObjects.add(way_on_map);
                    MyMap.setPoints(0, 0);

                    map.balloon.open(map_ways[id][0], map_ways_info[id]);

                }

            }

        },

        setPoints: function (id_rub, insearch, init) {

            map.balloon.close();
            if (id_rub != 0) {
                sel_way = 0;
                sel_region = 0;
                params[id_rub] = (params[id_rub] == 0) ? id_rub : 0;

            }
            console.log(cpoints);

            points = (insearch) ? spoints : cpoints;

            var m = this;
            //this.showInfo(false); // hide popup if visible
            if (group !== null) { // clear marker group
                group.removeAll();
                map.geoObjects.remove(group);
                var yPoint = [];
            }
            if (way_on_map !== null && sel_way == 0) {
                map.geoObjects.remove(way_on_map);
            }

            var color = 'green';

            group = new ymaps.Clusterer();
            console.log(group);
            group.options.set({
                gridSize: 50, // Размер кластерной сетки (объекты попавшие в данную сетку будут кластеризоваться)
                clusterBalloonWidth: 600, // Ширина блока с контентом в балуне
                balloonMinWidth: 300, // Ширина балуна
                clusterBalloonHeight: 350, // Высота балуна
                clusterBalloonSidebarWidth: 300, // Ширина правой стороны балуна (список меток)
            });

            for (p in points) {
                if (
                    params[points[p].ir] != 0 ||
                    (id_rub == 0 && points[p].po == 1 && sel_way == 0 && sel_region == 0) ||
                    insearch == 1 ||
                    (sel_way != 0 && map_ways_objs[sel_way][points[p].id] == 1) ||
                    (sel_region != 0 && map_reg_objs[sel_region][points[p].id] == 1)

                ) {
                    if ((init && points[p].po == 1) || !init) {

                        if (!empty(points[p]) && !empty(points[p].ir) && !empty(rubs[points[p].ir]) && !empty(rubs[points[p].ir]['i'])) {
                            var image = '/upload/' + rubs[points[p].ir]['i'];
                        } else {
                            var image = 'https://api-maps.yandex.ru/2.0.35/images/b87da66ef0c9c83eab04b13bb99d2599.png';
                        }
                        if (points[p].ph != "/") {
                            ph = '<img width="200" src="/upload/' + points[p].ph + '" alt="" />';
                        } else {
                            ph = '<img width="200" src="/map/img/no_image.png" alt="" />';
                        }

                        var partner = "";
                        if (!empty(points[p].pr)) {
                            partner = '<img class="map_img_partner" width="75" height="75" src="/map/img/partner.png" alt="" />';
                        }
                        group.add(new ymaps.Placemark(
                            // Координаты метки
                            [points[p].lo, points[p].la], {
                            clusterCaption: points[p].n,
                            hintContent: points[p]['n'],
                            balloonContentBody: '<div class="mapobj_info"><div class="map_forimg"><a href="' + points[p].nur + '">' + partner + '' + ph + '</a></div><div class="map_inf"><div class="mapobj_tit_wrap"><a class="mapobj_tit" href="' + points[p].nur + '">' + points[p].n + '</a></div><span>' + /*rubs[ points[p].ir ].n*/ '' + '</span><div class="map_description">' + points[p].m + '</div><a href="' + points[p].nur + '" class="map-window__btn">Подробнее</a></div></div>',
                        }, {
                            hideIconOnBalloonOpen: true,
                            balloonMaxWidth: 260,
                            balloonMinWidth: 260, // Ширина балуна
                            iconImageHref: image, // картинка иконки
                            iconImageSize: [32, 37], // размеры картинки
                            iconImageOffset: [-16, -37] // смещение картинки
                        }));
                    }



                }
            }

            map.geoObjects.add(group); // add yandex group overlay

        },

        goSearch: function (val) {
            se_len = val.length;
            var m = this;
            if (se_len != search_length && se_len > 2) {

                if (way_on_map !== null && sel_way != 0) {
                    map.geoObjects.remove(way_on_map);
                }

                $('#help-visibility').click();
                //$("#x3-map-sections").hide();
                $("#x3-map-result").show();

                $("#x3-map-result").html('<img src="/map/img/ajax.gif" alt="загрузка" style="margin: 5px 0 0 80px;" />');
                $.post(
                    "/map/getSearch.php", {
                    'act': 'search',
                    'w': val
                }).done(function (sp) {
                    sp = JSON.parse(sp);
                    spoints = sp;
                    m.setPoints(0, 1);
                    li = '';

                    for (p in sp) {
                        li += '<li class="r_' + sp[p].ir + '" rel="' + p + '"><a href="' + sp[p].nur + '">' + sp[p].n + '</a></li>';
                    }

                    if (li == '') {
                        $("#x3-map-result").html('<h4 style="text-align: center; margin-top: 30px;">По вашему запросу ничего не найдено<br /><br /> <a href="javascript: void(0);" onclick="$(\'#x3-map-input\').focus();$(\'#x3-map-input\').val(\'\');">искать заново</a></h4>');
                    } else {
                        $("#x3-map-result").html('<ul>' + li + '</ul>');
                        $("#x3-map-result a").click(function () {
                            i = $(this).parent().attr('rel');
                            map.setCenter([points[i].lo, points[i].la], 12, {
                                duration: 100,
                                checkZoomRange: true,
                                callback: function () {
                                    var projection = map.options.get('projection');
                                    var position = yPoint[i].geometry.getCoordinates();
                                    var pc = map.converter.globalToPage(projection.toGlobalPixels(position, map.getZoom()));
                                    m.showInfo(true, m.eq(i), pc);
                                }
                            });
                            return false;
                        });
                    }
                },
                    'json'
                );
            } else if (se_len != 1) {
                $("#x3-map-result").hide();
                $("#x3-map-sections").show();

                m.setPoints(0);
            }
        },

        initSearch: function () {
            var m = this;
            $("#x3-map-input").keyup(function (e) {

                m.goSearch($(this).val());

            });

        },

        init: function () {

            var m = this;


            map = new ymaps.Map('x3-map-wrap', {
                center: [options.cLat, options.cLng],
                zoom: options.zoom,
                behaviors: ["default", "scrollZoom"],
            }, {
                dragInertia: false
            });


            map.controls.add('typeSelector', {
                'left': 100
            });
            map.controls.add('zoomControl');
            map.controls.add('mapTools');

            MyMap.SetRubs();


            MyMap.getPoints('');
            MyMap.initSearch();

        }

    }

    var MyMap = new MyMap;
    var add_map;

    function AddFormClose() {

        $('#info_win_add').hide();
        $("#map_add_step_1").show();
        $("#map_add_step_2").hide();
        $("#map_add_step_3").hide();
        add_map.destroy();
        $("#map_coords").val('');
        $("#obj_name").val('');
        $("#obj_about").val('');
        $("#obj_adres").val('');
        $("#obj_doeha").val('');
    }

    function SendObj(t) {

        $(".er").removeClass("er");

        er = 0;
        name = jQuery.trim($("#obj_name").val());
        rub = $("#obj_rub").val();
        about = jQuery.trim($("#obj_about").val());
        adres = jQuery.trim($("#obj_adres").val());
        doehat = jQuery.trim($("#obj_doehat").val());
        map_coords = jQuery.trim($("#map_coords").val());


        if (t == 1) {
            if (name.length == 0) {
                $("#obj_name").addClass("er");
                er = 1;
            }
            if (about.length == 0) {
                $("#obj_about").addClass("er");
                er = 1;
            }
            if (er == 0) {
                $("#map_add_step_1").hide();
                $("#map_add_step_3").hide();
                $("#map_add_step_2").show();


                add_map = new ymaps.Map('add_map', {
                    center: [52.508959, 83.250358],
                    zoom: 7,
                    behaviors: ["default", "scrollZoom"]
                }, {
                    dragInertia: false
                });

                add_map.controls.add('typeSelector', {
                    'left': 100
                });
                add_map.controls.add('zoomControl');
                add_map.controls.add('mapTools');

                add_map.events.add('click', function (e) {
                    if (add_map.balloon.isOpen()) {
                        add_map.balloon.close();
                        jQuery('#map_coords').val('');
                    }
                    var coords = e.get('coordPosition');
                    add_map.balloon.open(coords, {
                        contentBody: "Объект расположен тут!",
                    });
                    jQuery('#map_coords').val(coords[0].toPrecision(6) + ',' + coords[1].toPrecision(6));

                });


                //



            }
        }

        if (t == 2) {

            if (map_coords.length == 0) {
                er = 1;
                alert("Вам надо отметить объект на карте");
            }

        }

        if (er == 0 && t == 2) {
            $("#map_add_step_1").hide();
            $("#map_add_step_2").hide();
            $("#map_add_step_3").show();
            $.post("/map/ajax.php", {
                'act': 'save_obj',
                'name': name,
                'rub': rub,
                'adres': adres,
                'doehat': doehat,
                'coords': map_coords,
                'about': about
            },
                function (data) {

                }
            );




        }

    }

    $(document).ready(function () {

        ymaps.ready(MyMap.init);

    });
}
