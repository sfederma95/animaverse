function disappear(e){
    const btn = window.jQuery(e.target);
    btn.prop('hidden',true)
    const links = window.jQuery('.nav-li');
    links.css('opacity','100%')
    links.css('display','unset')
    for (let link of links) {
        link.animate([{ transform: 'translateY(-3em)'},{ transform: 'translateY(0%)'},{ transform: 'translateY(2em)'},{ transform: 'translateY(0%)'}],{duration:300})
        link.animate([{ height: '0'},{ height: '1em'}],{duration:300, easing: 'ease-in-out'})
    }
}

function homeBtnBack(e) {
    const btn = window.jQuery('#home-btn');
    btn.prop('hidden',false)
    const links = window.jQuery('.nav-li');
    for (let link of links) {
        link.animate([{ transform: 'translateY(0.5em)'},{ transform: 'translateY(1.5em)'},{ transform: 'translateY(0.5em)'},{ transform: 'translateY(0em)'},{ transform: 'translateY(-0.5em)'},{ transform: 'translateY(-3em)'}],{duration:500,easing: 'ease-in-out'})
        link.animate([{ opacity: '100%'},{ opacity: '0%'}],{duration:500, easing: 'ease-in-out'})
        window.jQuery(link).css('display','none')
    }
}

export {disappear, homeBtnBack}