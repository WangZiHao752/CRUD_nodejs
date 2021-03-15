function $(val){
    return typeof val ==="string" ? document.querySelector(val) : val;
}



$('.btn').onclick=()=>{
    let flag = /^\w{6,12}$/.test($('.user').value) && /^\w{6,12}$/.test($('.pwd').value);
    if(flag){
        axios.post('api/login',{
            user:$('.user').value,
            pwd:$('.pwd').value
        }).then(res=>{
            if(res.data.statu === "ok"){
                location.href = "/home"+"?token="+res.data.token
            } else {
                $('.dialogMes').innerHTML = res.data.mes;
                $('.mask').style.display = "flex"; 
            }
        })
    } else {
        $('.dialogMes').innerHTML = "输入有误";
        $('.mask').style.display = "flex"; 
    }
}





//dialog
$('.mask').onclick = e=>{
    let tar = e.target;
    if(tar.className === "close"){
        console.log(this);
        $('.mask').style.display = "none";
    }
    if(tar.className === "result"){
        console.log('完成');
        $('.mask').style.display = "none";
    }
}