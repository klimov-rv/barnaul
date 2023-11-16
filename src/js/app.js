document.addEventListener('DOMContentLoaded', () => {
    // _______________legacy_js_____________ 

    // мобильное меню 
    $(function () {
        $(".x3-tmenu__icon").click(function () {
            $(".x3-tmenu__wrap").addClass("x3-tmenu__wrap--open");
        });

        $(".x3-tmenu__close").click(function () {
            $(".x3-tmenu__wrap").removeClass("x3-tmenu__wrap--open");
        });

        $(document).on('click', '.x3-tmenu__wrap--open > ul > li > a', function () {
            if ($(this).not(".root-item").length != 0) {
                $(this).toggleClass("open");
                $(this).next("ul").slideToggle();
                return false;
            }
        });
    });
    // поиск
    $(function () {
        $(".x3-search__icon").click(function () {
            $(".x3-search-panel").addClass("x3-search-panel--show");
            $(".x3-search-panel input[type='text']").focus();
        });

        $(".x3-search-panel__close").click(function () {
            $(".x3-search-panel").removeClass("x3-search-panel--show");
        });

        $(document).keyup(function (e) {
            if (e.key === "Escape" && $(".x3-search-panel").hasClass("x3-search-panel--show")) {
                $(".x3-search-panel").removeClass("x3-search-panel--show");
            }
        });
    });

    // new js

    document.querySelector('.site-wrap').classList.add('dom-loaded');

    // фильтры
    jcf.replaceAll();

    var toggleBtns = document.querySelectorAll('.filter-toggle');

    window.addEventListener('click', e => {
        if (!e.target.closest('.filter-popup')) {

            toggleBtns.forEach((item, idx) => {
                if (!item.contains(e.target)) {
                    item.classList.remove("is-button-active");
                }
            })
        }
    });

    toggleBtns.forEach((item, idx) => {
        item.addEventListener('click', e => {
            e.preventDefault();
            e.target.closest('.filter-toggle').classList.toggle("is-button-active");
        });
    });

    var clickedChbxs = document.querySelectorAll('.filter-checbox-item');

    clickedChbxs.forEach((item, idx) => {
        item.addEventListener('click', e => {
            var thisEl = e.target.closest('.filter-popup');
            var countChecked = thisEl.querySelectorAll('input[type="checkbox"]:checked').length;
            var filterWraper = thisEl.closest('.filter-title');
            var insertCount = filterWraper.querySelector('.filter-count-selected');
            if (countChecked > 0) {
                insertCount.innerHTML = countChecked;
                filterWraper.classList.add('is-active');
            } else {
                insertCount.innerHTML = '';
                filterWraper.classList.remove('is-active');
            }
        });
    });

    var applyBtn = document.querySelectorAll('.filter-apply');

    applyBtn.forEach((item, idx) => {
        item.addEventListener('click', e => {
            var filterWraper = e.target.closest('.filter-title');
            filterWraper.querySelector('.filter-toggle').classList.toggle("is-button-active");
        });
    });

    // TODO переписать на Vanilla JS фильтр isotope
    function getHashFilter() {
        var hash = location.hash;
        // get filter=filterName
        var matches = location.hash.match(/filter=([^&]+)/i);
        var hashFilter = matches && matches[1];
        return hashFilter && decodeURIComponent(hashFilter);
    }
    function removeHash() {
        history.pushState("", document.title, window.location.pathname
            + window.location.search);
    }

    $(function () {

        var $grid = $('.event-list');

        // bind filter button click
        var $filters = $('.iso-filter').on('click', '.iso-filter__btn', function () {
            var filterAttr = $(this).attr('data-filter');
            location.hash = 'filter=' + encodeURIComponent(filterAttr);
        });

        var isIsotopeInit = true;

        function onHashchange() {
            var hashFilter = getHashFilter();
            // TODO переписать повторяющуюся грязь
            if (hashFilter === '*') {
                $grid.isotope({
                    itemSelector: '.event-list__item',
                    filter: hashFilter
                });
                $filters.find('.is-checked').removeClass('is-checked');
                $filters.find('[data-filter="*"]').addClass('is-checked');
                removeHash()
                return;
            }
            if (!hashFilter && isIsotopeInit) {
                return;
            }
            isIsotopeInit = true;
            // filter isotope
            $grid.isotope({
                itemSelector: '.event-list__item',
                filter: '.' + hashFilter
            });
            // set selected class on button
            if (hashFilter) {
                $filters.find('.is-checked').removeClass('is-checked');
                $filters.find('[data-filter="' + hashFilter + '"]').addClass('is-checked');
            }
        }

        $(window).on('hashchange', onHashchange);
        // trigger event handler to init Isotope
        onHashchange();
    });

    moment.locale('ru');
    var thisMonth = moment().format('YYYY-MM');
    // Events to load into calendar
    var eventArray = [
        {
            title: 'Multi-Day Event',
            endDate: thisMonth + '-14',
            startDate: thisMonth + '-10'
        }, {
            endDate: thisMonth + '-23',
            startDate: thisMonth + '-21',
            title: 'Another Multi-Day Event'
        }, {
            date: thisMonth + '-21',
            title: 'Single Day Event'
        }, {
            date: thisMonth + '-07',
            title: 'Single Day Event'
        }, {
            date: thisMonth + '-11',
            title: 'Single Day Event'
        }
    ];

    if ($('#calendar').length > 0) {

        $('#calendar').clndr({
            events: eventArray,
            clickEvents: {
                click: function (target) {
                    console.log('Calendar clicked: ', target);
                },
                today: function () {
                    console.log('Calendar today');
                },
                nextMonth: function () {
                    console.log('Calendar next month');
                },
                previousMonth: function () {
                    console.log('Calendar previous month');
                },
                onMonthChange: function () {
                    console.log('Calendar month changed');
                },
                nextYear: function () {
                    console.log('Calendar next year');
                },
                previousYear: function () {
                    console.log('Calendar previous year');
                },
                onYearChange: function () {
                    console.log('Calendar year changed');
                },
                nextInterval: function () {
                    console.log('Calendar next interval');
                },
                previousInterval: function () {
                    console.log('Calendar previous interval');
                },
                onIntervalChange: function () {
                    console.log('Calendar interval changed');
                }
            },
            template: $('#template-calendar').html(),
            // multiDayEvents: {
            //     singleDay: 'date',
            //     endDate: 'endDate',
            //     startDate: 'startDate'
            // },
            // showAdjacentMonths: true,
            // adjacentDaysChangeMonth: false
        });

    }

    $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    $('.js-tabs-controls').dataTabs({
        event: 'click',
        hideOnClosest: true,
        initOpenTab: false,
        state: 'accordion',
        jqMethodOpen: 'slideDown',
        jqMethodClose: 'slideUp',

        onTab: (self, $anchor, $target) => {
            console.log(self, $anchor, $target)
        },
    });



    const pageHaveplayer = document.querySelector('.audio-player');

    if (pageHaveplayer) {

        // по умолчанию
        var playlists = [
            {
                title: '80s Vibe',
                file: '80s_vibe',
                howl: null
            }
        ]
        // так будем брать плейлист на кастомных страницах
        // const playlist = window.barnaul_data.player_data.playlist


        // плейлист со страницы "Аудиоэкскурсий"
        var tabItems = document.querySelectorAll('.tabs-item');

        if (tabItems.length > 0) {
            tabItems.forEach((item, idx) => {
                console.log(item, idx)
                var tabPlaylist = [];
                var tabAudio = item.getElementsByTagName('audio');
                for (let item of tabAudio) {
                    console.log(item.currentSrc)
                    tabPlaylist.push({
                        title: "audio in tab" + idx,
                        file: item.currentSrc,
                        howl: null
                    })
                    console.log(playlist)
                }
                playlists[idx] = tabPlaylist;
            });
        }

        var mainPlayList = []

        if (playlists[1]) {
            mainPlayList = playlists[1];
        } else {
            mainPlayList = playlists[0];
        }
        var player = new Player(playlist);

        // Bind our player controls.
        playBtn.addEventListener('click', function () {
            player.play();
        });
        startbar.addEventListener('click', function () {
            player.play();
        });
        pauseBtn.addEventListener('click', function () {
            player.pause();
        });
        prevBtn.addEventListener('click', function () {
            player.skip('prev');
        });
        nextBtn.addEventListener('click', function () {
            player.skip('next');
        });

        // waveform.addEventListener('click', function (event) {
        //     player.seek(event.clientX / window.innerWidth);
        // });
        // playlistBtn.addEventListener('click', function () {
        //     player.togglePlaylist();
        // });
        // playlist.addEventListener('click', function () {
        //     player.togglePlaylist();
        // });
        // volumeBtn.addEventListener('click', function () {
        //     player.toggleVolume();
        // });
        // volume.addEventListener('click', function () {
        //     player.toggleVolume();
        // });

        // Setup the event listeners to enable dragging of volume slider.
        // barEmpty.addEventListener('click', function (event) {
        //     var per = event.layerX / parseFloat(barEmpty.scrollWidth);
        //     player.volume(per);
        // });
        // sliderBtn.addEventListener('mousedown', function () {
        //     window.sliderDown = true;
        // });
        // sliderBtn.addEventListener('touchstart', function () {
        //     window.sliderDown = true;
        // });
        // volume.addEventListener('mouseup', function () {
        //     window.sliderDown = false;
        // });
        // volume.addEventListener('touchend', function () {
        //     window.sliderDown = false;
        // });

        var move = function (event) {
            if (window.sliderDown) {
                var x = event.clientX || event.touches[0].clientX;
                var startX = window.innerWidth * 0.05;
                var layerX = x - startX;
                var per = Math.min(1, Math.max(0, layerX / parseFloat(barEmpty.scrollWidth)));
                player.volume(per);
            }
        };

        // volume.addEventListener('mousemove', move);
        // volume.addEventListener('touchmove', move); 

        // Update the height of the wave animation.
        // These are basically some hacks to get SiriWave.js to do what we want.
        var resize = function () {
            var height = window.innerHeight * 0.3;
            var width = window.innerWidth;
            // wave.height = height;
            // wave.height_2 = height / 2;
            // wave.MAX = wave.height_2 - 4;
            // wave.width = width;
            // wave.width_2 = width / 2;
            // wave.width_4 = width / 4;
            // wave.canvas.height = height;
            // wave.canvas.width = width;
            // wave.container.style.margin = -(height / 2) + 'px auto';

            // Update the position of the slider.
            var sound = player.playlist[player.index].howl;
            if (sound) {
                var vol = sound.volume();
                var barWidth = (vol * 0.9);
                sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
            }
        };
        window.addEventListener('resize', resize);
        resize();
    }




});