$(function() {
    /**
     * 1. 비디오 스크롤 내리면서 점점 크게
     * : clip path로 컨트롤하려고 했는데 안됨
     * 
     * 2. 횡스크롤 innerWidth로 컨트롤하는 법 모르겠음
     * 
     * 3. 텍스트 애니메이션 한글자씩 주려면
    */

    $(window).scroll(function(){
        usrScroll = $(this).scrollTop();
        if ( usrScroll > 0 ) {
            $('.header .btn-menu').addClass('scroll');
        } else {
            $('.header .btn-menu').removeClass('scroll');
        }
    })

    $('.btn-menu').click(function(){
        $('.header .btn-menu').removeClass('scroll');
        $('.header .sub-area').toggleClass('on');
        $('.header .btn-menu').toggleClass('on');
        $('body').toggleClass('scroll-fix');
    })


    gsap.set('.intro-video', { 'clip-path':'inset(13%)' });
    gsap.to('.intro-video', {
        scrollTrigger : {
            trigger: '.sc-video',
            markers: true,
            start: '0% 0%',
            end: '100% 0%',
            scrub: 1,
            pin:true,
        },
        'clip-path':'inset(0%)'
    })

    // videoZoom = gsap.timeline({});
    // videoZoom
    // .to('.intro-video', {
    //     scrollTrigger : {
    //         trigger: '.intro-video',
    //         markers: true,
    //         start: ' 80%',
    //         end: 'bottom bottom',
    //         scrub: 1,
    //         pin: true,
    //     },
    //     'clip-path':'inset(0% 10% 10%)',
    // })
    // gsap.to( '.intro-video', {
    //     scrollTrigger : {
    //         trigger: '.sc-video',
    //         markers: true,
    //         start: ' 80%',
    //         scrub: 1,
    //     },
    //     scale: 1
    // })


    gsap.set('.sc-visual .group-bg .bg-box',{
        // top:`random(0,${window.innerHeight})`,
        // left:`random(0,${window.innerWidth})`,
        top:`random(0,100)%`,
        left:`random(0,100)%`,
        opacity:0,
    })


    const headTxt = new SplitType('.sc-visual .overflow .text', { types: 'words, chars', });

    // 메인비주얼 모션
    visualMotion = gsap.timeline({});
    visualMotion
    .set(headTxt.words, { yPercent: 100})
    .to(headTxt.words, {
        delay: 0.5,
        yPercent: 0,
        stagger: {
            from:"random",
            amount:0.6
        },
    })
    .to('.sc-visual .group-bg .bg-box', {
        opacity:1,
        // filter:'blur(random(0,20))px',
        "filter":"blur(random(0,20)px)",
        stagger: {
            from:"random",
            amount:0.4
        },
    })
    .to('.bg-box .bg', {
        yPercent: -100,
        stagger: {
            from:"random",
            amount:0.4
        },
        ease: "expo.out",
    })


    // textList = document.querySelectorAll('.sc-visual .group-bg .bg-box');
    // textList.forEach(element => {
    //     gsap.to(element, {
    //         scrollTrigger: {
    //             trigger: element,
    //             // markers: true,
    //             start: '0% 50%',
    //             end: '100% 0%',
    //             scrub: 1,
    //         },
    //         yPercent: -100,
    //     })
    // });
 


    //(공통) 스크롤시 텍스트 올라오는 모션
    textList = document.querySelectorAll('.overflow .text');
    textList.forEach(element => {
        let check = element.parentElement.dataset.check;
        
        if ( check !== 'visual' ) {
            gsap.set(element, { yPercent: 100})
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    // markers: true,
                    start: 'top 90%',
                    end: 'bottom bottom',
                    scrub: 1,
                    stagger: 0.1
                },
                yPercent: 0,
            })
        }     
    });



   

    

    gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger.saveStyles(".mobile, .desktop");

ScrollTrigger.matchMedia({

	"(min-width: 800px)": function() {
        // 컬렉션 횡스크롤
        const horiScroll =gsap.to('.collection-list', {
        scrollTrigger: {
            trigger: '.sc-collection',
            start: '0 0',
            end: '+=500%',
            pin: true,
            markers: true,
            scrub:1,
            invalidateOnRefresh: true,
        },
        ease: "none",
        xPercent:-100,
        x:function(){
            return window.innerWidth;
        },
        });


        gsap.to(".air", {
        y: -130,
        duration: 2,
        ease: "elastic",
        scrollTrigger: {
        trigger: ".air",
        containerAnimation: horiScroll,
        start: "left center",
        toggleActions: "play none none reset",
        markers:true,
        }
        });



  },

	"(max-width: 799px)": function() {
  
  },

	"all": function() {

 // 텍스트 슬라이드
 typoList = document.querySelectorAll('.sc-typo .slide .text');
 typoList.forEach(element => {
     startValue = element.parentElement.dataset.start;
     xValue = element.parentElement.dataset.x;

     gsap.set(element, { xPercent: startValue })
     gsap.to(element, {
         scrollTrigger: {
             trigger: element,
             scrub: 3,
         },
         xPercent: xValue
     })
 })

  }

});




    // imgList = document.querySelectorAll('.img-box img');
    // console.log(imgList);
    // imgList.forEach(element => {
    //     let check = element.parentElement.dataset.check;
    //     gsap.set(element, { yPercent: -100 })

    //     if ( check === 'visual') {
    //         gsap.to(element, {
    //             delay: 1,
    //             stagger: 1,
    //             yPercent: 0,
    //         })
    //     } else {
    //         gsap.to(element, {
    //             scrollTrigger: {
    //                 trigger: element,
    //                 stagger: 0.3,
    //             },
    //             yPercent: 0,
    //         })
    //     }
        
    // })



    
})