function checkStorage(key){

    if (localStorage.getItem(key) != null && localStorage.getItem(key) != false) {

        let editor = document.querySelector('#editor')

        try {
            let value =  JSON.parse(localStorage.getItem(key))
            editor.value = value
        }
        catch {
            let value = ''
            editor.value = value
            console.log('ошибка распаковки json')
        };
    }
    else {
        localStorage.setItem('editor', '')
    };
};

window.addEventListener('DOMContentLoaded', ()=>{

    checkStorage('editor')

    const card = document.querySelector('.card')
    const clearBtn = document.querySelector('#clear')

    card.addEventListener('keyup', ()=>{

        let editor = document.querySelector('#editor')
        localStorage.setItem('editor', JSON.stringify(editor.value))
    });

    clearBtn.addEventListener('click', (e)=>{
        let target = e.target

        if (target && target.getAttribute('id') == 'clear'){
            editor.value = ''
            localStorage.setItem('editor', JSON.stringify(editor.value))
        };
    });
});