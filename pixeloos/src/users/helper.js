import $ from 'jquery';
import angryCat from './angry-cat.gif'
import sleepCat from './sleepcat.svg';

function targetErrInputs (msgs){
    let errStr = '';
    msgs.map(err=>{
        if (typeof err.response.data.error.msg !== 'string'){
            err.response.data.error.msg.map(m=>errStr = errStr.concat(m))
        } else errStr = errStr.concat(err.response.data.error.msg)
        return errStr;
    })
    targetHTML(errStr)
    if (!errStr.includes('password')) changeBack('password')
    if (!errStr.includes('username')) changeBack('username')
    if (!errStr.includes('email')) changeBack('email')
}

function targetHTML (msg){
    if (msg.includes('password')){
        $('#password').removeClass('good-input')
        $('#password').addClass('bad-input')
        $('#password').siblings('.sleep-cat').addClass('angry-cat')
        $('#password').siblings('.sleep-cat').attr('src',angryCat)
    }
    if (msg.includes('email')){
        $('#email').removeClass('good-input')
        $('#email').addClass('bad-input')
        $('#email').siblings('.sleep-cat').addClass('angry-cat')
        $('#email').siblings('.sleep-cat').attr('src',angryCat)
    }
    if (msg.includes('username')){
        $('#username').removeClass('good-input')
        $('#username').addClass('bad-input')
        $('#username').siblings('.sleep-cat').addClass('angry-cat')
        $('#username').siblings('.sleep-cat').attr('src',angryCat)
    }
}

function changeBack(keyword){
    $(`#${keyword}`).removeClass('bad-input')
    $(`#${keyword}`).addClass('good-input')
    $(`#${keyword}`).siblings('.sleep-cat').removeClass('angry-cat')
    $(`#${keyword}`).siblings('.sleep-cat').attr('src',sleepCat)
}

export default targetErrInputs;