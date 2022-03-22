class Toast{

    constructor (){

    }

    callToast(message, typeToast) {
        let toastBox = document.querySelector('.toast-msg-box');
        let toastNode = document.createElement('div');
        toastBox.appendChild(toastNode);
        toastNode.classList.add('toast');
        toastNode.classList.add(`toast-${typeToast}`);
        let getIconToast = this.getIconToast(typeToast);
        toastNode.innerHTML += `
        <i class="bi bi-exclamation-circle"></i>
                <div class="icon-toast"><i class="fas ${getIconToast}"></i></div>
                <div class="toast-msg">${message}</div>
        `;
        toastNode.addEventListener('click',()=>{
            toastBox.removeChild(toastNode);
        });

        setTimeout(()=>{
            toastBox.removeChild(toastNode);
        },4000);
    }

    getIconToast(typeToast)
    {
        switch(typeToast)
        {
            case "success": 
                return "fa-check-circle";
            case "error": 
                return "fa-exclamation-circle";
            default:
                return "fa-check-circle";
        }
    }
}

export var toastObject = new Toast();