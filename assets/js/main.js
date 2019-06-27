$(document).ready(function(){

    $(window).scroll(function(){
        
        let scrolled = $(this).scrollTop();
            

      // ####### Navbar ########
        if (scrolled > 60){
            $('header').css({
                background: '#fff',
                boxShadow: '0 1px 20px rgba(0, 0, 0, 0.075)'
            });
            $('header .desktop-nav li').css({ color: '#000' });
            $('.hum span').css('background', '#000');
        }else{
            $('header').css({ background: 'transparent', boxShadow: 'none'});
            $('header .desktop-nav li').css({ color: '#fff' });
            $('.hum span').css('background', '#fff');
        }

        // ####### Scrolled section ######
        $('nav li').each(function(){
            let elem = $(this).data('scroll'),
                sectionPos = 
                ($(elem).offset().top - $('header').innerHeight())
                    - ($(elem).css('margin-top') !== NaN ? parseInt($(elem).css('margin-top')): 0);

            if (scrolled >= sectionPos) {
                if (Math.floor(scrolled / sectionPos) == 1) {
                    $(this).addClass('active').siblings().removeClass('active');
                }
            }else{
                $(this).removeClass('active');
            }
        });

        // ##### Banner parallex scroll #####
        if(scrolled < $('.banner').height()){
            $('.banner').css('background-position', `50% ${scrolled / 6}%`);
            if (scrolled / 3 < $('.banner > div').height() / 2.5)
                $('.banner .content').css('transform', `translateY(${scrolled / 3}px)`);
        }

    });


  // ########## Show the team member social links #########
    $('.team-card').hover(function(event){
        $(this).find('.social-links a').each(function (i) {
            var delay = 150 * i;
            if(event.type == 'mouseleave')
            {
                setTimeout(() => {
                    $(this).delay(delay).css({
                        transform: `translateY(15px)`,
                        opacity: 0
                    });
                }, delay);
            }else{
                setTimeout(() => {
                    $(this).delay(delay).css({
                        transform: 'translateY(0px)',
                        opacity: '1'
                    });
                }, delay);
            }
        });
    });

    // ######## Show work modal #######
    var work = '';
    // open modal
    $('.show-modal, .work-card').on('click', function(){
        
       work = $(this).data('work');
            if(work !== undefined){
                $('body').css('overflow-y', 'hidden');
                $('body').addClass('open-modal');
                setTimeout(() => {
                    $('body').removeClass('open-modal');
                }, 1500);
                $(`${work}`).delay(800).fadeIn(500);
                // margin top to the first work-modal's section
                setTimeout(() => {
                    $(`${work} .first-section`).css('margin-top', `${Math.ceil($(`${work} .intro-box`).innerHeight()) + 50}px`);
                }, 900);
            }
    });
    // close modal
    $(`.close-modal`).on('click', function(){
        if (work !== undefined) {
            $('body').addClass('open-modal');
            setTimeout(() => {
                $('body').removeClass('open-modal');
            }, 1500);
            $(`${work}`).delay(1000).fadeOut(500);
            $('body').css('overflow-y', 'scroll');
        }
    });

    // ####### Scroll to nav element ######
    $('li, button').on('click', function(){
        let elem = $(this).data('scroll');
        if(elem !== undefined){
            let sectionPos = $(elem).offset().top - $('header').innerHeight() + 1;
            $('body, html').animate({
                scrollTop: sectionPos
            }, 1000);
            if (!$(this).hasClass('glow-btn')) {
                $(this).addClass('active').siblings().removeClass('active');
                // close the mobile nav bar
                if($('.mobile-nav').hasClass('show-nav'))
                    toggle_mobile_nav();
            }
        }
            
    });

    // ######## Open the mobile nav bar ########
    function toggle_mobile_nav(){
        $('.mobile-nav').toggleClass('show-nav');
        $('.hum span').css('background', '#000');
        if($('.mobile-nav').hasClass('show-nav')){
            $('.mobile-nav li').each(function (i) {
                setTimeout(() => {
                    $(this).css({
                        transform: 'translateX(0)',
                        opacity: '1'
                    });
                }, 200 * i);
            });
        }else{
            $('.mobile-nav li').css({
                transform: 'translateX(50px)',
                opacity: '0'
            });
        }
        $('.hum').toggleClass('close-nav-icon');
    }


    $('.hum').on('click', function(){
        toggle_mobile_nav();
    });



    // ####### Slick slider ########
    $('.feedbacks-container').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToShow: 1,
        arrows: false
    });

    // ########## Work Modal intro-image parallex #########

    $('.work-modal').on('scroll', function(){
        let scroll = $(this).scrollTop() / 15;
         if(scroll < 110){
             $(this).find('.intro').css('background-position', `50% ${scroll}%`);
         }
    });



    // ########### Initialize the WOW.js lib ###########
    new WOW().init();



});//<-- end of jquery