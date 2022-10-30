export function menuOpener (opener, elt, eltToOpen, closeElt) {
    const headerElt = eltToOpen;
    const overlay = document.querySelector('.overlay');
    const closeEl = closeElt || opener;    

    function outOfAreaHandler(evt) {
        if (elt.contains(evt.target))  return;        
        closeHandler();
    }    
    
    function closeHandler() {
        headerElt.classList.remove('opened');
        closeEl.removeEventListener('click', closeHandler);
        overlay.removeEventListener('click', outOfAreaHandler);
        opener.addEventListener('click', openHandler);
        overlay.classList.remove('overlay--active');
    }

    function openHandler() { 
        closeOtherElts(); 
        headerElt.classList.add('opened');
        opener.removeEventListener('click', openHandler);
        closeEl.addEventListener('click', closeHandler);
        overlay.addEventListener('click', outOfAreaHandler);
        overlay.classList.add('overlay--active');
    }

    function closeOtherElts() {
        const opened = document.querySelector('.opened')
        if (opened && opened !== headerElt)  opened.classList.remove('opened');
    }

    opener.addEventListener('click', openHandler);
}