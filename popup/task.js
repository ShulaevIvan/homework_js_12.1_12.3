function setCookie(key, value) {
    document.cookie = key + '=' + encodeURIComponent(value)
};

function getCookie(key) {

    const data = document.cookie.split('; ')
    const cookie = data.find((elem) => elem.startsWith(key+'='))
    if (cookie){
        return cookie.substring(key.length +1)
    };
   
};

window.addEventListener('DOMContentLoaded', ()=>{
    // document.cookie = `modal=; expires=${new Date(2020, 0, 1)}`

    const modal = document.querySelector('.modal')
    const modalClose = document.querySelector('.modal__close')
    const check = getCookie('modal')


    if (check == undefined){
        setTimeout(()=> modal.classList.add('modal_active'), 1000)
    };

    modalClose.addEventListener('click', (e)=>{

        let target = e.target

        if (target && target.classList.contains('modal__close')){
            modal.classList.remove('modal_active')
            setCookie('modal', false)
        };

    });
});
