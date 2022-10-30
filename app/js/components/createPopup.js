import { sendForm } from "./formsender";
import { CreateNewElement } from "./utils";

export function openPopup() {
    let popup = document.querySelector('.popup');
    const admin_email = document.querySelector('[data-admin]').dataset.admin;
    if (!popup) {
        const footerElmnt = document.querySelector('footer');
        const newPopup = new CreateNewElement(footerElmnt, 'div','popup');
        newPopup.createElmt();
        popup = document.querySelector('.popup');
        popup.innerHTML = `
        <form action="/mail.php" class="callback-form__form form" enctype="multipart/form-data" method="post">
        <div class="form__fieldset">
            <label class="form__label">
                <input name="name" class="form__input" type="text" placeholder="Ваше Имя*" value="" required="required">
            </label>
            <label class="form__label">
                <input name="phone" class="form__input" type="phone" placeholder="Телефон*" value="" required="required">
            </label>
            <label class="form__label">
                <input name="email" class="form__input" type="email" placeholder="E-mail" value="">
            </label>            
        </div>
        <label class="form__label form__label--agreed">
            <input type="checkbox" class="form__checkbox" placeholder="Ваше Имя*" value="" required="required">
            <span class="form__checkbox-fake"></span>
            <span> Я ознакомлен и согласен с условиями сбора и обработки персональных данных</span>
        </label>
        <input type="hidden" name="admin_email" value="${admin_email}">
        <input type="submit" class="btn btn--secondary form__btn">
    </form>
        `;
        const form = popup.querySelector('.form');
        sendForm(form);        
    }

    function closeHandler()  {        
        overlay.classList.remove('overlay--active');
        popup.classList.remove('popup--active');
        overlay.removeEventListener('click', closeHandler);
    }

    popup.classList.add('popup--active');
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('overlay--active');
    overlay.addEventListener('click', closeHandler);
};