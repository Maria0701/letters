export class CreateNewElement {
    constructor(elmnt, tag = 'div', className) {
        this.elmnt = elmnt;
        this.tag = tag;
        this.className = className || null;
        this.newElement = null;
        this.createElmt = this.createElmt.bind(this);
    }

    createElmt() {
        this.newElement = document.createElement(this.tag);
        if (this.className) this.newElement.classList.add(this.className)
        this.elmnt.append(this.newElement);       
        return this.newElement;
    }

    destroyElmt() {
        this.newElement.remove();
        this.newElement = null;
    }

    insertText(text) {
        this.newElement.innerHTML = '';
        this.newElement.insertAdjacentHTML('beforeend', text);
    }

    setAttribute(atrName,atrValue) {        
        this.newElement.setAttribute(atrName, atrValue);
    } 
}

export const addLoader = (elmnt) => new CreateNewElement(elmnt, 'div', 'lds-dual-ring'); 

export const throttlerFunc = (func, delay) => {
    if (timerId) return;

    let timerId = setTimeout(() => {
        func();
        timerId = null;
    }, delay);
}


export function copyContent(sourceElt, targetElt) {
    if (sourceElt && targetElt) {
        targetElt.innerHTML = sourceElt.innerHTML;
    }
}
