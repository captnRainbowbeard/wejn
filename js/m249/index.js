$(function () {
    $(document).ready(function () {
        $('.ind-pro-img').height($('.ind-pro-img').outerWidth());
        $('.pages>*').addClass('page-list');
        var _w = $(window).width();
        var xlx = {
            init: function () {
                switch (jsFun) {
                    case 'home':
                        xlx.homePage();
                        break;
                }
            },
            homePage: function () {
                new WOW().init();
                let mySwiper1 = new Swiper('#banner', {
                    autoplay: {
                        delay: 7000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    speed: 1000,
                    loop: true,
                    paginationClickable: true,
                    autoplayDisableOnInteraction: false,
                    touchMoveStopPropagation: false,
                    pagination: {
                        el: '#banner .swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '#banner .swiper-button-next',
                        prevEl: '#banner .swiper-button-prev',
                    },
                });
                mySwiper1.el.onmouseover = function(){
                  mySwiper1.autoplay.stop();
                }
                mySwiper1.el.onmouseout = function(){
                  mySwiper1.autoplay.start();
                }
            }
        };
        $(function () {
            jsFun = $("#js").attr('page');
            xlx.init();
        });
        $(".sendInquiry").on('click', function () {
            var top = $('#pro_inquiry').offset().top - 30;
            scrollTop(top);
        });
        function scrollTop(top) {
            $("html,body").animate({
                scrollTop: top,
                easing: "swing",
            }, 500);
        }
        // 导航
        if (_w < 992) {
            $('.nav .submenu').parent().prepend('<i class="icon-right"></i>');
            $('.search').on('click', function () {
                $('.mask').addClass('mask-block');
                $('.nav-btn').removeClass('toggle-animate');
                $('#nav').removeClass('actived');
                if (!$('.search-from').hasClass('active'))
                    $('.mask').removeClass('mask-block');
            });
            $('.nav-btn').on("click", function () {
                $(this).toggleClass('toggle-animate');
                $('#nav').toggleClass('actived');
                $('.search-from').removeClass('active');
                $('.mask').addClass('mask-block');
                if (!$('#nav').hasClass('actived'))
                    $('.mask').removeClass('mask-block');
            });
            // 分组导航
            $("#nav .icon-right").on('click', function () {
                $(this).parent('li').toggleClass('actived');
                $(this).parent('li').find('.submenu').slideToggle('slow');
            });
            $('.mask').click(function () {
                $('.mask').toggleClass('mask-block');
                $('.nav-btn').removeClass('toggle-animate');
                $('#nav').removeClass('actived');
                $('.search-from').removeClass('active');
            });
        }
    })
});
