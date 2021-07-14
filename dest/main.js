$(document).ready(function() {
    /* Slider Home */
    let sliderWrap = $('.homepage .slider');
    let captionSlide = $('.slider__caption .caption');
    let pageNumber = $('.slider .paging .paging__number span');
    
    function activeCaptionSlide(index){
        captionSlide.eq(index).addClass('active').siblings().removeClass('active');
    }

    function activePageNumber(index){
        pageNumber.eq(index).addClass('active').siblings().removeClass('active');
    }

    let $carousel = $('.slider__item-wrap',sliderWrap);
    let $progressBar = $('.slider .timeline .progress');
    
    $carousel.flickity({
        cellAlign: 'center',
        contain: true,
        wrapAround: true,
        prevNextButtons: false,
        pageDots:false,
        lazyLoad: 2,
        imagesLoaded: true,
        autoPlay: 3000,
        on:{
            ready: function() {
            },
            change: function(index) {
                activeCaptionSlide(index);
                activePageNumber(index);
            }, 
        }
    })

    let flkty = $carousel.data('flickity');
    let $imgs = $('.slider .slider__item img');

    $carousel.on('scroll.flickity', function (event, progress) {
        progress = Math.max(0.2, Math.min(1, progress));
        $progressBar.height(progress * 100 + '%');
        flkty.slides.forEach(function (slide, i) {
            let img = $imgs[i];
            let x = (slide.target + flkty.x) * -1 / 2;
            img.style.transform = 'translateX( ' + x + 'px)';
        });
    });

    /* Paging */
    $('.slider .paging .paging__number').on( 'click', 'span', function() {
        let index = $(this).index();
        $carousel.flickity( 'select', index, false, true );
        activePageNumber(index);
    });

    /* Nav */
    let nav = $('.nav');
    let btnmenu = $('header .btnmenu');

    btnmenu.on('click', function() {
        nav.toggleClass('active');
        $(this).toggleClass('clicked');
    })

    /* Add background header when sroll */
    let header = $('header');
    let heightHeader = header.outerHeight();

    function changeBgHeader() {
        let postionScroll = $(window).scrollTop();
        let sliderText = $('.slider__caption .caption');
        let heightText = sliderText.offset().top;
        if(postionScroll > heightText - heightHeader) {
            header.addClass('active');
        }
        else {
            header.removeClass('active');
        }
    }

    /* Back to top */
    let totop = $('.totop');

    function showBackToTop() {
        let postionScroll = $(window).scrollTop();
        let positionContent = $('.contents').offset().top;

        if(postionScroll > positionContent - heightHeader) {
            totop.addClass('active');
        }
        else {
            totop.removeClass('active');
        }
    }

    function BackTopTop() {
        window.scrollTo({
            top: 0
        })
    }

    totop.on('click', BackTopTop);
    
    $(window).on('scroll',function() {
        changeBgHeader();
        showBackToTop();
    })

    function scrollClick () {
        let hContent = $('.contents .content-text').offset().top;
        let scrollDown = $('.slider .scroll-down').on('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: hContent,
            });
        })
    }

    scrollClick();

    $(window).on('resize',function() {
        scrollClick();
    })

    /* Cursor */
    let cursor = $('.cursor');
    let caption = $('.caption');

    $(window).on('mousemove', function(e) {
        cursor.css('left', (e.pageX - cursor.width() / 2) + 'px');
        cursor.css('top', (e.pageY - cursor.height() / 2) + 'px');
    })

    caption.on('mouseenter', function() {
        cursor.addClass('active');
    })

    caption.on('mouseleave', function() {
        cursor.removeClass('active');
    })
})