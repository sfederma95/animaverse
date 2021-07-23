import $ from 'jquery';

function disappear(e){
    const btn = $(e.target);
    btn.prop('hidden',true)
    const links = $('.nav-li');
    links.css('opacity','100%')
    links.css('display','initial')
    for (let link of links) {
        link.animate([{ transform: 'translateY(-3em)'},{ transform: 'translateY(0%)'},{ transform: 'translateY(2em)'},{ transform: 'translateY(0%)'}],{duration:300})
        link.animate([{ height: '0'},{ height: '1em'}],{duration:300, easing: 'ease-in-out'})
    }
}

function homeBtnBack(e) {
    const btn = $('#home-btn');
    btn.prop('hidden',false)
    const links = $('.nav-li');
    for (let link of links) {
        link.animate([{ transform: 'translateY(0.5em)'},{ transform: 'translateY(1.5em)'},{ transform: 'translateY(0.5em)'},{ transform: 'translateY(0em)'},{ transform: 'translateY(-0.5em)'},{ transform: 'translateY(-3em)'}],{duration:500,easing: 'ease-in-out'})
        link.animate([{ opacity: '100%'},{ opacity: '0%'}],{duration:500, easing: 'ease-in-out'})
        $(link).css('opacity','0%')
    }
}

export {disappear, homeBtnBack}