
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

    console.log(minusTop);
    console.log(minusLeft);

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
    // находим дубликат-точку (TODO найти по дата-атрибутам с помощью Vanilla JS)
    var duplicate_point_el = $('[data-point-id=' + originalPoint.getAttribute("place_number") + ']');
    console.log(duplicate_point_el);
    duplicate_point_el.css("left", rect.left - minusLeft - 5);
    duplicate_point_el.css("top", rect.top - minusTop - 5);
    // duplicate_point_el.style.left = rect.left - minusLeft - 5 + "px";
    // duplicate_point_el.style.top = rect.top - minusTop - 5 + "px";
}

function calIamgeSize(newW = undefined, newH = undefined, imageOriginWidth, imageOriginHeight, svgOrigW, svgOrigH) {
    if (!newW) {
        var newW = $(".historical_line_map").width();
        var newH = $(".historical_line_map").height();
    }
    console.log(newH);
    var widthOnePercent = imageOriginWidth / 100;
    var heightOnePercent = imageOriginHeight / 100;

    var newWidthOnePercent = newW / 100;
    var newHeightOnePercent = newH / 100;

    if (newW >= imageOriginWidth) {

        $(".historical_line_svg").attr({
            width: imageNewWidth,
            height: imageNewHeight,
        });

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


document.addEventListener('DOMContentLoaded', () => {
    if ($('#js-historical__line').length > 0) {
        var main_line = new Vivus('js-historical__line',
            {
                start: 'manual',
                delay: 0,
                duration: 150,
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
            if (svg_id === "2") { // место для второй точки закрепляем внутри специального контейнера
                const map_container = document.querySelector('.zoom_viewBox');
                map_container.prepend(point.preview.place_group);
                gsap.to(point.preview.place_group, {
                    duration: 0.7,
                    ease: 'expo',
                    scale: 0,
                    transformOrigin: "50% 50%"
                });
            } // закрепляем места с анимацией
            else if (point.preview.place_group.viewportElement === null) {
                const svg_container = document.getElementById('js-historical__line');
                svg_container.prepend(point.preview.place_group);

                gsap.to(point.preview.place_group, {
                    duration: 0.7,
                    ease: 'expo',
                    scale: 0,
                    transformOrigin: "50% 50%"
                });
            }
            point.point.addEventListener('mouseenter', () => {
                point.preview.place_group.classList.add('place_hovered')
                gsap.killTweensOf(point.preview.place_group);
                gsap.to(point.preview.place_group, {
                    opacity: 1,
                    duration: 0.7,
                    ease: 'expo',
                    scale: 1,
                    transformOrigin: "50% 50%"
                });
            });
            point.point.addEventListener('mouseleave', () => {
                console.log(point.preview.place_group);
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

        // Исходные размеры что бы не потерять точное соотношение

        var imageW = 1920;
        var imageH = 762;
        var svgW = 1026;
        var svgH = 762;
        // TODO переписать undefined
        calIamgeSize(undefined, undefined, imageW, imageH, svgW, svgH);

        $(window).on("resize", function () {
            var newW = $(".historical_line_map").width();
            var newH = $(".historical_line_map").height();
            calIamgeSize(newW, newH, imageW, imageH, svgW, svgH);

            var allPoints = document.querySelectorAll('.svg_line_point');
            var map_container = document.querySelector('.svg_animate');
            var parentTop = map_container.getBoundingClientRect().top;
            var parentleft = map_container.getBoundingClientRect().left;

            allPoints.forEach((elem) => recalcElemsTooltip(parentTop, parentleft, elem));

        });
    }
});