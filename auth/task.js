function getData(data){

    return new Promise((resolve, reject)=>{

        const request = new XMLHttpRequest()
        request.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php')
        request.send(data)

        request.onloadend = ()=>{

            let json = JSON.parse(request.responseText)
            
            if (request.DONE && request.status < 300 && json['success']){

                resolve(json)
            }
            else if(json['success'] == false) {
                reject('Ошибка логина или пароля')
            }
            else {
                reject('Что-то пошло не так')
            };
        };
    });
};


window.addEventListener('DOMContentLoaded', ()=>{

    const form = document.querySelector('#signin__form')
    const btns = document.querySelectorAll('.btn')
    const welcome = document.querySelector('#welcome')
    const userId = document.querySelector('#user_id')
    const singinWrap = document.querySelector('.signin')
    let singOutBtn = document.querySelector('#signout__btn')
    let singInBtn = document.querySelector('#signin__btn')
    // localStorage.clear()
    if (localStorage.getItem('user_id') != null) {
        userId.textContent = localStorage.getItem('user_id')
        welcome.classList.add('welcome_active')
        form.style.display = 'none'
        singinWrap.appendChild(singOutBtn)
    };

    singInBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        let target = e.target

        if (target && target.getAttribute('id') == 'signin__btn'){

            const formData = new FormData(form);
            const data = getData(formData)
            form.querySelectorAll('input').forEach((item)=>item.value = '')

            data
            .then((result)=>{
                localStorage.setItem('user_id', result.user_id)
                userId.textContent = result['user_id']
                welcome.classList.add('welcome_active')
                form.style.display = 'none'
                singinWrap.appendChild(singOutBtn)
        
            })
            .catch((err)=>{
                alert(err)
            });
        };
    });

    singOutBtn.addEventListener('click', (e)=>{

        let target = e.target

        if (target && target.getAttribute('id') == 'signout__btn'){

            const user = localStorage.getItem('user_id')
            singInBtn.remove()
            form.style.display = 'block'
            welcome.classList.remove('welcome_active')
            localStorage.removeItem('user_id')
        };
    });

    
});