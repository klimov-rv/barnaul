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

    // filter-classic
    if ($('.filter-toggle').length > 0) {
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
    }

    // filter-isotope 
    if ($('.iso-filter').length > 0) {
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
    }

    // календарь
    if ($('#calendar').length > 0) {

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

    if ($('.bubble_card').length > 0) {

        document.querySelector('.bubble_card__close').addEventListener('click', e => {
            e.target.closest('.bubble_card').classList.add('is-closed');
        })

        window.addEventListener('scroll', () => {
            document.querySelector('.bubble_card').classList.toggle('is-scrolled', window.scrollY > 300);
        })

    }

    // magnificPopup 
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


    // Табы 
    if ($('.js-tabs-controls').length > 0) {
        var closeTabs = document.querySelectorAll('.tabs-close-btn');
        closeTabs.forEach((item, idx) => {
            item.addEventListener('click', e => {
                e.target.closest('.tabs-item').querySelector('.js-accordion-item').click();
            })
        });
    }

    // Audio Player
    // подготовка плейлистов

    const pageHavePlayer = document.querySelector('.audio-player');

    if (pageHavePlayer) {

        // по умолчанию
        var playlist = [{
            title: '80s Vibe',
            file: '80s_vibe',
            howl: null
        }]
        var skip = []
        // так будем брать плейлист на кастомных страницах
        // const playlist = window.barnaul_data.player_data.playlist

        // плейлист со страницы "Аудиоэкскурсий"
        var tabItems = document.querySelectorAll('.tabs-item');

        if (tabItems.length > 0) {
            tabItems.forEach((tabItem, id) => {
                var idx = id + 1;
                var tabMedia = document.getElementById('tab-media-' + idx);
                if (tabMedia) {
                    for (var item of tabMedia.children) {
                        if (item.tagName === 'AUDIO') {
                            playlist.push({
                                title: "audio in tab " + idx,
                                file: item.currentSrc,
                                howl: null
                            })
                        } else {
                            var src = item.getAttribute('src');
                            var srcdomain = item.getAttribute('srcdomain');
                            console.log(src);
                            tabItem.classList.add('is-' + srcdomain + '-tab');
                            skip.push(idx)
                        }
                    }
                }
            });
        }

        var player = new Player(playlist);

        // var playBtns = document.querySelectorAll('.accordion-icon_play');
        // var pauseBtns = document.querySelectorAll('.accordion-icon_pause');

        // if (playBtns.length > 0) {
        //     playBtns.forEach((playBtn, id) => {
        //         playBtn.addEventListener('click', function (e) {
        //             console.log(e.target)
        //             e.stopPropagation();
        //             player.play();
        //         });
        //     });
        // }
        // if (pauseBtns.length > 0) {
        //     pauseBtns.forEach((pauseBtn, id) => {
        //         pauseBtn.addEventListener('click', function (e) {
        //             e.stopPropagation();
        //             player.pause();
        //         });
        //     });
        // } 

        $('.js-tabs-controls').dataTabs({
            event: 'click',
            initOpenTab: false,
            state: 'accordion',
            jqMethodOpen: 'slideDown',
            jqMethodClose: 'slideUp',

            onTab: (self, $anchor, $target) => {
                var isTabActive = self.$targets[self.states.activeIndex].classList.contains('is-tab-active')
                var isAudio = skip.find((i) => i === self.states.activeIndex + 1 /* +1 потому что в индексе 0 - аудио по умолчанию */) === undefined;


                if (isAudio) {
                    player.pause();
                    if (isTabActive) {

                        // TODO универсальное отключение открытых плееров
                        var iframes1 = $('.audio-tours__tabs iframe');
                        var fullSrc = iframes1[0].getAttribute('src');
                        console.log(iframes1);
                        var SrcWithoutQuery = fullSrc.split('?')[0]
                        console.log(SrcWithoutQuery);
                        iframes1[0].setAttribute("src", SrcWithoutQuery + "?&amp;autoplay=0");
                        player.play(self.states.activeIndex + 1); // +1 потому что в индексе 0 - аудио по умолчанию
                    }

                } else {

                    // TODO обработать адрес
                    // https://www.youtube.com/embed/PR4EHK4P544?controls=0&autoplay=1&rel=0&fs=1&showinfo=0&modestbranding=0
                    player.pause();
                    var iframe1 = $target.find('IFRAME');
                    var fullSrc = iframe1[0].getAttribute('src');
                    console.log(fullSrc);
                    var SrcWithoutQuery = fullSrc.split('?')[0]
                    console.log(SrcWithoutQuery);
                    if (isTabActive) {
                        iframe1[0].setAttribute("src", SrcWithoutQuery + "?si=fDHed4vNyCrfZOGD&amp;autoplay=1");
                    } else {
                        iframe1[0].setAttribute("src", SrcWithoutQuery + "?&amp;autoplay=0");
                    }

                }


            },
        });


    }

    // Слайдеры (раскидать по компонентам)

    if ($('.image-slider').length > 0) {


        var setPagination = function (e) {
            var activeSlide = e.realIndex + 1;
            var totlaSlides = e.el.querySelectorAll('.swiper-slide').length;
            $(".swiper-active-slide").text(activeSlide);
            $(".swiper-count-slides").text(totlaSlides);
            $(".swiper-count-total").text(totlaSlides);
        }
        var mainSwiper = new Swiper(".image-slider", {
            speed: 1000,
            autoplay: true,
            pauseOnMouseEnter: true,
            effect: "fade",
            lazy: true,
            slidesPerView: 1,
            spaceBetween: 100,
            loop: true,
            slidesPerGroupSkip: 1,

            scrollbar: {
                el: '.image-slider .swiper-scrollbar',
            },
            pagination: {
                el: '.image-slider .swiper-fractions',
                type: 'fraction',
            },
            navigation: {
                nextEl: '.image-slider .swiper-button-next',
                prevEl: '.image-slider .swiper-button-prev',
            },
            on: {
                init: function () {
                    setPagination(this);
                },
            },
            // breakpoints: {
            //     0: {
            //         slidesPerView: 1,
            //         spaceBetween: 10,
            //         loop: false,
            //     },
            //     420: {
            //         slidesPerView: 1,
            //         spaceBetween: 10,
            //         loop: false,
            //     },
            //     1024: {
            //         slidesPerView: 1,
            //         spaceBetween: 10,
            //         loop: false,
            //     }
            // }
        });

        mainSwiper.on('slideChange', function () {
            setPagination(this);
        });
    }

    if ($('.gallery-slider').length > 0) {

        var setPagination = function (e) {
            var activeSlide = e.realIndex + 1;
            var totlaSlides = e.el.querySelectorAll('.swiper-slide').length;
            $(".swiper-active-slide").text(activeSlide);
            $(".swiper-count-slides").text(totlaSlides);
            $(".swiper-count-total").text(totlaSlides);
        }

        var gallerySwiper = new Swiper(".gallery-slider", {
            speed: 1000,
            lazy: true,
            slidesPerView: "auto",
            spaceBetween: 30,
            loop: false,
            scrollbar: {
                el: '.gallery-slider .swiper-scrollbar',
            },
            pagination: {
                el: '.gallery-slider .swiper-fractions',
                type: 'fraction',
            },
            navigation: {
                nextEl: '.gallery-slider .swiper-button-next',
                prevEl: '.gallery-slider .swiper-button-prev',
            },
            on: {
                init: function () {
                    setPagination(this);
                },
            },
            // breakpoints: {
            //     0: {
            //         slidesPerView: 1,
            //         spaceBetween: 10,
            //         loop: false,
            //     },
            //     420: {
            //         slidesPerView: 1,
            //         spaceBetween: 10,
            //         loop: false,
            //     },
            //     1024: {
            //         slidesPerView: 1,
            //         spaceBetween: 10,
            //         loop: false,
            //     }
            // }
        });

        gallerySwiper.on('slideChange', function () {
            setPagination(this);
        });
    }

    // mmenu (пока используется для мобильной версии фильтров)

    if ($('#mmenu').length > 0) {

        const menu = new MmenuLight(
            document.querySelector("#mmenu"),
            "(max-width: 900px)"
        );
        const navigator = menu.navigation({
            // options
        });
        const drawer = menu.offcanvas({
            // options
        });
        document.querySelector("a[href='#mmenu']").addEventListener("click", (event) => {
            event.preventDefault();
            drawer.open();
        });
        document.querySelector(".btn-close").addEventListener("click", (event) => {
            event.preventDefault();
            drawer.close();
        });
        menu.menu.setAttribute('data-mm-spn-title', 'Фильтр');


        $('.js-mm-filter').dataTabs({
            event: 'click',
            initOpenTab: false,
            state: 'accordion',
            jqMethodOpen: 'slideDown',
            jqMethodClose: 'slideUp',

            onTab: (self, $anchor, $target) => {


            },
        });
    }

});