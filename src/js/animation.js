if ($('#js-historical__line').length > 0) {

    var place_preview = (el) => {
        return {
            place_group: el.cloneNode(true)
        }
    }

    var place_common = (pointEl, previewEl) => {
        previewEl.place_group.setAttribute('data-place-id', pointEl.getAttribute('data-point-id'));
        return {
            point: pointEl,
            preview: previewEl,
        }
    }

    function createElemsTooltip(minusTop, minusLeft, elemToCopy) {
        var copyElem = document.createElement("div");
        var copyForTippy = copyElem.cloneNode();
        var innerElem = document.createElement("div");
        var rect = elemToCopy.getBoundingClientRect();
        var attrAdd = 'point_' + elemToCopy.getAttribute("place_number");

        innerElem.appendChild(document.createTextNode(elemToCopy.getAttribute("place_number")))
        copyElem.appendChild(innerElem);
        copyForTippy.appendChild(copyElem);

        copyForTippy.style.width = rect.width + 10 + "px";
        copyForTippy.style.height = rect.height + 10 + "px";
        copyForTippy.style.left = rect.left - minusLeft - 5 + "px";
        copyForTippy.style.top = rect.top - minusTop - 5 + "px";

        innerElem.classList.add('duplicate_point');
        copyElem.classList.add('duplicate_point_wrapp');
        copyElem.setAttribute("place_name", elemToCopy.getAttribute("place_name"));
        copyForTippy.classList.add('duplicate_point_el', 'historical_line_point', attrAdd);
        copyForTippy.setAttribute('data-point-id', elemToCopy.getAttribute("place_number"));

        return copyForTippy;
    }

    function recalcElemsTooltip(minusTop, minusLeft, originalPoint) {
        var rect = originalPoint.getBoundingClientRect();

        // находим дубликат-точку
        var duplicate_point_el = $('[data-point-id=' + originalPoint.getAttribute("place_number") + ']');

        duplicate_point_el.css("left", rect.left - minusLeft - 5);
        duplicate_point_el.css("top", rect.top - minusTop - 5);
        // duplicate_point_el.style.left = rect.left - minusLeft - 5 + "px";
        // duplicate_point_el.style.top = rect.top - minusTop - 5 + "px";
    }

    function mapSizesCheck() {
        if (window.innerWidth < 640) {
            return {
                h: 390,
                w: 987,
            }
        } else if (window.innerWidth < 920) {
            return {
                h: 500,
                w: 1267,
            }
        } else {
            return {
                h: $(".historical_line_map").height(),
                w: $(".historical_line_map").width(),
            }
        }
    }

    function calcImageSize(imageOriginWidth, imageOriginHeight, svgOrigW, svgOrigH) {
        var actualImgSizes = mapSizesCheck();

        var widthOnePercent = imageOriginWidth / 100;
        var heightOnePercent = imageOriginHeight / 100;

        var newWidthOnePercent = actualImgSizes.w / 100;
        var newHeightOnePercent = actualImgSizes.h / 100;

        var imageCurrentPercentW = svgOrigW / widthOnePercent;
        var imageCurrentPercentH = svgOrigH / heightOnePercent;

        var imageNewWidth = imageCurrentPercentW * newWidthOnePercent;
        var imageNewHeight = imageCurrentPercentH * newHeightOnePercent;

        $(".historical_line_svg").attr({
            width: imageNewWidth,
            height: imageNewHeight,
        });
    }

    document.addEventListener('DOMContentLoaded', () => {

        // Исходные размеры что бы не потерять точное соотношение

        var imageW = 1920;
        var imageH = 762;
        var svgW = 1026;
        var svgH = 762;

        calcImageSize(imageW, imageH, svgW, svgH);

        $(window).on("resize", function () {
            calcImageSize(imageW, imageH, svgW, svgH);

            var allPoints = document.querySelectorAll('.svg_line_point');
            var map_container = document.querySelector('.svg_animate');
            var parentTop = map_container.getBoundingClientRect().top;
            var parentleft = map_container.getBoundingClientRect().left;

            allPoints.forEach((elem) => recalcElemsTooltip(parentTop, parentleft, elem));

        });


        if ($('#js-historical__line').length > 0) {
            var main_line = new Vivus('js-historical__line',
                {
                    type: 'scenario',
                    start: 'manual',
                    delay: 0,
                    duration: 130,
                    onReady: function (myVivus) {

                        var allPoints = document.querySelectorAll('.svg_line_point');
                        var map_container = document.querySelector('.svg_animate');
                        var parentTop = map_container.getBoundingClientRect().top;
                        var parentleft = map_container.getBoundingClientRect().left;

                        allPoints.forEach((elem) => map_container.appendChild(createElemsTooltip(parentTop, parentleft, elem)));

                        tippy(".duplicate_point_wrapp", {
                            animation: 'scale-subtle',
                            placement: 'right',
                            hideOnClick: false,
                            interactive: true,
                            allowHTML: true,
                            maxWidth: '',
                            content: (reference) => '<a href="#"><span class="ttip-text">' + reference.getAttribute('place_name') + '</span><svg aria-hidden="true" width="20" height="16"> <use xlink:href="#arrow-right4"></use> </svg></a>',
                        });
                    }
                },
                function (obj) {
                    // obj.el.classList.add('animation-started'); 
                }
            );

            gsap.registerPlugin(ScrollTrigger)
            $(window).on("onbeforeunload", function () {
                scrollTrigger.clearScrollMemory();
                window.history.scrollRestoration = "manual";
            });


            // запуск анимации по скроллу

            const historical_places = [];
            [...document.querySelectorAll('.historical_place__group')].forEach(preview => historical_places.push(place_preview(preview)));

            const historical_place__points = [];
            [...document.querySelectorAll('.historical_line_point')].forEach((item, pos) => historical_place__points.push(place_common(item, historical_places[pos])));

            historical_place__points.forEach((point) => {
                const svg_id = point.preview.place_group.getAttribute('data-place-id');

                // закрепляем места с анимацией
                if (point.preview.place_group.viewportElement === null) {
                    // место для второй точки закрепляем внутри специального контейнера 
                    if (svg_id === "2") {
                        document.getElementById('zoom_viewBox').appendChild(point.preview.place_group);
                        gsap.to(point.preview.place_group, {
                            duration: 0.7,
                            ease: 'expo',
                            scale: 0,
                            transformOrigin: "50% 50%"
                        });
                    } else {

                        const svg_container = document.getElementById('js-historical__line');
                        svg_container.prepend(point.preview.place_group);

                        gsap.to(point.preview.place_group, {
                            duration: 0.7,
                            ease: 'expo',
                            scale: 0,
                            transformOrigin: "50% 50%"
                        });
                    }

                }
                point.point.addEventListener('click', (e) => {
                    console.log(point.point.getAttribute("data-point-id"));
                    // const topY = $('[data-audio-id="' + point.point.getAttribute("data-point-id") + '"]').offset().top;
                    // if (topY > 0) {
                    //     gsap.to(window, 1, {
                    //         scrollTo: {
                    //             y: topY,
                    //             autoKill: true
                    //         },
                    //         ease: Power3.easeOut
                    //     });
                    // }
                })

                point.point.addEventListener('mouseenter', (e) => {
                    point.point.classList.add('active-play');
                    point.preview.place_group.classList.add('place_hovered');
                    if (svg_id === "2") {
                        const zoom_container = document.querySelector('.zoom_container');
                        zoom_container.classList.add('zoom-active');
                    }
                    gsap.killTweensOf(point.preview.place_group);
                    gsap.to(point.preview.place_group, {
                        opacity: 1,
                        duration: 0.7,
                        ease: 'expo',
                        scale: 1,
                        transformOrigin: "50% 50%"
                    });
                });
                point.point.addEventListener('mouseleave', (e) => {
                    point.point.classList.remove('active-play');
                    point.preview.place_group.classList.remove('place_hovered')
                    if (svg_id === "2") {
                        const zoom_container = document.querySelector('.zoom_container');
                        zoom_container.classList.remove('zoom-active')
                    }
                    gsap.killTweensOf(point.preview.place_group);
                    gsap.to(point.preview.place_group, {
                        opacity: 0,
                        duration: 0.7,
                        ease: 'expo',
                        scale: 0,
                        transformOrigin: "50% 50%"
                    });
                });
            })

            gsap.to("#js-historical__line", {
                scrollTrigger: {
                    trigger: ".historical_line_svg",
                    start: "10% bottom",
                    once: true,
                    onToggle: (self) => {
                        self.trigger.parentNode.classList.add('animation-started');
                        main_line.play();
                    },
                }
            });

        }
    });
}