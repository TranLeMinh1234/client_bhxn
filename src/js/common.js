var commonJS = {
    doMainLocal: 'localhost:8080',
    markOn: function()
    {
        let body = document.querySelector('body');
        let divLoading = document.querySelector('.loading-background');
        if(!divLoading)
        {
            divLoading = document.createElement("div");
            divLoading.classList.add('loading-background');
            divLoading.style.display = 'flex';
            divLoading.innerHTML = `
                <img src="https://meinvoice.misacdn.net/appbeta/v3/Content/img/loading.gif?v=R44.13" alt="" style="width: 60px;height: 60px">
            `;
            body.appendChild(divLoading);
        }
        else
        {
            divLoading.style.display = 'flex';
        }
    },
    
    markOff: function()
    {
        let divLoading = document.querySelector('.loading-background');
        if(divLoading)
            divLoading.style.display = 'none';
    }
};


export default commonJS;