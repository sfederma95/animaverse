import $ from 'jquery';

function showCat(e){
    const input=$(e.target);
    const selectCat = input.siblings('.sleep-cat')[0];
    $(selectCat).css('opacity','100%')
    selectCat.animate([{ transform: 'translateY(-50%)'},{ transform: 'translateY(0%)'}],{duration:400})
}

function hideCat(e){
    const input=$(e.target);
    const selectCat = input.siblings('.sleep-cat')[0];
    $(selectCat).css('opacity','0%')
}

export {hideCat,showCat}