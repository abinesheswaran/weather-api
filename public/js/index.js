const searchBtn = document.querySelector('.search-btn');
const searchDate = document.querySelector('.search-date');
const weatherPage = document.getElementById('locateBtn');
const historyPage = document.getElementById('unitBtn');

if(weatherPage){
    weatherPage.addEventListener('click',e=>{
        e.preventDefault();
        window.location.href = window.location.protocol + '//' + window.location.host + '/'
    })
}
if(historyPage){
    historyPage.addEventListener('click',e=>{
        e.preventDefault();
        window.location.href = window.location.protocol + '//' + window.location.host + '/getAll'
    })
}

if(searchBtn){
    searchBtn.addEventListener('click',e=>{ 
        e.preventDefault();
        const value = document.querySelector('.searchbox').value;
        if(!value==''){
            const root = window.location.protocol + '//' + window.location.host + '/';
            window.location.href = `${root}?place=${value}`;
        }
    })
}

if(searchDate){
    searchDate.addEventListener('click',e=>{
        e.preventDefault();
        const tovalue=document.querySelector('.todate').value;
        const fromvalue=document.querySelector('.fromdate').value;
        let ct = new Date(tovalue)
        ct.setHours(ct.getHours()+23);
        ct.setMinutes(ct.getMinutes()+59);
        const root = window.location.protocol + '//' + window.location.host + '/'+'getALL';
        window.location.href = `${root}?createdAt[gte]=${new Date(fromvalue).toISOString()}&createdAt[lte]=${new Date(ct).toISOString()}`;
    })
}