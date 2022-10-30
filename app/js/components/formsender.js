export function sendForm(form) {
    
    const file_attach = form.querySelector('[type="file"]');
  
    const message = {
        loading: 'Отправка...',
        success: 'Спасибо. Форма отправлена',
        failed: 'Что-то пошло не так...'
    };

    // загрузка файлов 
        const fileInputHandler = (evt) => {
            const files = evt.target.files;
            let countFiles = '';
            const label = form.querySelector('.form__textr');
            const labelValue = label.innerText;

            if (files && files.length >= 1) {
                countFiles = files.length;
            }

            if (countFiles) {
                label.innerText = 'Выбрано файлов: ' + countFiles;
            } else {
                label.innerText = labelValue;
            }
        };
   
    if (file_attach) {
        file_attach.addEventListener('change', (evt) => {
            fileInputHandler(evt);
            uploadFile(file_attach.files[0]);
        });
    }
    
    const ajaxSend = (url, formData) => {
        document.querySelector('.status').innerHtml = message.loading;
        return fetch(url, { // файл-обработчик 
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {      
                const form_subject = Object.fromEntries(formData).formSubject;
                //dataLayer.push({'event': `${form_subject}`});
                return form_subject;
            }
        })
        .catch(error => console.error(error))
    };
    
    const submitHandler = (e) => {
        e.preventDefault(); 
        const form = e.target.closest('form');
    
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        form.append(statusMessage);
    
        let formData = new FormData(form);        
        if (file_attach) formData.append('file', file_attach.files[0]);
           ajaxSend('/mail.php', formData)
            .then((response) => {
                statusMessage.innerHTML = message.success;
            })
            .catch((err) => {
                console.log(err);
                statusMessage.innerHTML = message.failed;
            })
            .finally(() => {
                form.reset();
                setTimeout(() => {
                    if (form.closest('.popup--active')) {
                        form.closest('.popup--active').classList.remove('popup--active');
                        document.querySelector('.overlay--active').classList.remove('overlay--active');
                    }
                    statusMessage.remove();
                }, 5000);
            });
    }

    function uploadFile(file)  {
        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'].includes(file.type)) {
            alert('Разрешены только изображения');
            return;
        }
    
        if (file.size > 2*1024*1024) {
            alert('файл должен быть менее 2МБ');
            return;
        }
    };

    form.addEventListener('submit', submitHandler);
}