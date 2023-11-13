document.addEventListener('DOMContentLoaded', () => {
    // legacy js

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


    var main_line = new Vivus(
        'js-historical_line__animate',
        {
            type: 'scenario',
            start: 'manual',
            delay: 0,
            duration: 150,
            animTimingFunction: Vivus.EASE,
            onReady: function (myVivus) {
                // myVivus.el.classList.add('animation-started');
                // myVivus.el.classList.add('svg-ready');
            }
        },
        function (obj) {
            // obj.el.classList.add('animation-started');
        }
    );

    gsap.to("#js-historical_line__animate", {
        scrollTrigger: {
            trigger: ".historical_line_svg",    
            start: "10% bottom",
            onToggle: (self) => {
                self.trigger.parentNode.classList.add('animation-started');
                main_line.play();
                // let p = document.getElementById("para1");
                // let p_prime = p.cloneNode(true);

                function createElemsTooltip(minusTop, minusLeft, elemToCopy) {
                    var copyElem = document.createElement("div");
                    copyElem.setAttribute("place_name", elemToCopy.getAttribute("place_name"));

                    var rect = elemToCopy.getBoundingClientRect();

                    copyElem.style.width = rect.width + 10 + "px";
                    copyElem.style.height = rect.height + 10 + "px";
                    copyElem.style.left = rect.left - minusLeft - 5 + "px";
                    copyElem.style.top = rect.top - minusTop - 5 + "px";
                    copyElem.classList.add('duplicate_point');
                    return copyElem;
                }
                var allPoints = document.querySelectorAll('.historical_line_point');
                var map_container = document.querySelector('.svg_animate');
                var parentTop = map_container.getBoundingClientRect().top;
                var parentleft = map_container.getBoundingClientRect().left;
                allPoints.forEach((elem) => map_container.appendChild(createElemsTooltip(parentTop, parentleft, elem)));


                tippy(".duplicate_point", {
                    animation: 'scale-subtle',
                    placement: 'right',
                    interactive: true,
                    allowHTML: true,
                    content: (reference) => '<a href="#"><span class="ttip-text">' + reference.getAttribute('place_name') + '</span><svg aria-hidden="true" width="16" height="12"> <use xlink:href="#arrow-right2"></use> </svg></a>',
                });
            },
        }
    });

    function calIamgeSize(newW, newH, imageOriginWidth, imageOriginHeight, svgOrigW, svgOrigH) {


        console.log("calIamgeSize")
        var widthOnePercent = imageOriginWidth / 100;
        var heightOnePercent = imageOriginHeight / 100;

        var newWidthOnePercent = newW / 100;
        var newHeightOnePercent = newH / 100;

        if (newW >= imageOriginWidth) {

            console.log('предполагается искажение координат')
            // $(".historical_line_svg").attr({
            //     width: svgOrigW,
            //     height: svgOrigH,
            // });
        } else {
            var imageCurrentPercentW = svgOrigW / widthOnePercent;
            var imageCurrentPercentH = svgOrigH / heightOnePercent;

            var imageNewWidth = imageCurrentPercentW * newWidthOnePercent;
            var imageNewHeight = imageCurrentPercentH * newHeightOnePercent;

            $(".historical_line_svg").attr({
                width: imageNewWidth,
                height: imageNewHeight,
            });
        }
    }


    $(".historical_line_map").on("load", function () {
        // Исходные размеры что бы не потерять точное соотношение
        var imageW = 1920;
        var imageH = 762;
        var svgW = 1026;
        var svgH = 755;

        var newW = $(".historical_line_map").width();
        var newH = $(".historical_line_map").height();
        calIamgeSize(newW, newH, imageW, imageH, svgW, svgH);
        $(window).on("resize", function () {
            calIamgeSize(newW, newH, imageW, imageH, svgW, svgH);
        });
    });





});