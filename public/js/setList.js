let type = "add"; //按钮状态   添加 或  修改 或 删除
let pageType = 'default'; //翻页类型     默认default  查询状态 find
let uid = '' //渲染的数据id
let pageIndex = 0; //默认  当前页码

let findPageIndex = 0; //查询页当前页码
let maxFindPageIndex; //查询到的数据最大页数
let localData; //用于存储查询后的数据
function $(val) {
    return typeof val ? document.querySelector(val) : val;
}

//请求数据
requestCont('../api/getCont', {
    token: location.search.split("=")[1],
    page: pageIndex
})

//下一页
$('.nexPage').onclick = e => {
    switch (pageType) {
        case "default":
            pageIndex++;

            $('.prevPage').disabled = false;
            requestCont('../api/getCont', {
                token: location.search.split("=")[1],
                page: pageIndex
            })
            break;
        case "find":
            
            if(findPageIndex+1 < Math.ceil(JSON.parse(localData).length / 12)){
                findPageIndex++
                $('.prevPage').disabled = false;
                $('.innerPage').querySelector('.active') && $('.innerPage').querySelector('.active').classList.remove('active');
                $('.innerPage').children[findPageIndex].classList.add('active');
                render(JSON.parse(localData).slice(findPageIndex * 12, findPageIndex * 12 + 12), Math.ceil(JSON.parse(localData).length / 12))
            }

            if(findPageIndex+1 == Math.ceil(JSON.parse(localData).length / 12)){
                
                $('.nexPage').disabled = true;
            } else {
                
                $('.nexPage').disabled = false;
            }
            break;
            if (findPageIndex == 0) {
                $('.prevPage').disabled = true;
                $('.nexPage').disabled = false;
                // console.log(Math.ceil(JSON.parse(localData).length / 12));
                // console.log(findPageIndex);
            } 
    }

}

//上一页
$('.prevPage').onclick = e => {


    switch (pageType) {
        case "default":
            if (pageIndex > 0) {
                pageIndex--;
                requestCont('../api/getCont', {
                    token: location.search.split("=")[1],
                    page: pageIndex
                })
            } else {
                pageIndex = 0;
            }
            if (pageIndex == 0) {
                $('.prevPage').disabled = true;
            }
            break;
        case "find":
            if (findPageIndex > 0) {
                findPageIndex--;
                $('.nexPage').disabled = false;
                render(JSON.parse(localData).slice(findPageIndex * 12, findPageIndex * 12 + 12), Math.ceil(JSON.parse(localData).length / 12))
            } else {
                findPageIndex = 0;
            }
            if (findPageIndex == 0) {
                $('.prevPage').disabled = true;
            } else {
                $('.prevPage').disabled = false;
            }
            break;


            
    }

}


//弹窗
$('.mask').onclick = function (e) {
    switch (e.target.className) {
        case "close":
            this.style.display = "none"
            break;
        case "cancel":
            this.style.display = "none"
            break;
        case "result":
            this.style.display = "none"
            if (type === "add") {
                requestCont("../api/addCont", {
                    name: $('.name').value,
                    jobNumber: $('.jobNumber').value,
                    phone: $('.phone').value,
                    designation: $('.designation').value,
                    grade: $('.grade').selectedIndex,
                    gradeName: $('.gradeName').selectedIndex,
                    id: Math.random().toString().slice(2, 18),
                    token: location.search.split("=")[1],
                    page: pageIndex
                })
            } else if (type === "set") {
                requestCont("../api/set", {
                    name: $('.name').value,
                    jobNumber: $('.jobNumber').value,
                    phone: $('.phone').value,
                    designation: $('.designation').value,
                    grade: $('.grade').selectedIndex,
                    gradeName: $('.gradeName').selectedIndex,
                    id: uid,
                    token: location.search.split("=")[1],
                    page: pageIndex
                })
            } else if (type === "del") {
                requestCont("../api/del", {
                    name: $('.name').value,
                    jobNumber: $('.jobNumber').value,
                    phone: $('.phone').value,
                    designation: $('.designation').value,
                    grade: getSeleteValue($('.grade')),
                    gradeName: getSeleteValue($('.gradeName')),
                    id: uid,
                    token: location.search.split("=")[1],
                    page: pageIndex
                })

            }
    }
}

//数据操作
$('.container').onclick = function (e) {
    switch (e.target.className) {
        //查找
        case "find":
            if($('#findMes').value =='') {
                alert('查找不能为空');
                return ;
            }
            pageType = "find";
            findPageIndex = 0;
            axios.post('../api/find', {
                name: $('#findMes').value,
                token: location.search.split("=")[1],
                page: pageIndex
            }).then(res => {
                if (res.data.statu === "ok") {
                    localStorage.setItem('findCont#now', JSON.stringify(res.data.data));
                    localData = localStorage.getItem('findCont#now');
        
                    render(JSON.parse(localData).slice(findPageIndex * 12, findPageIndex * 12 + 12), Math.ceil(JSON.parse(localData).length / 12))
                    if(findPageIndex+1 >= Math.ceil(JSON.parse(localData).length / 12)){
                        $('.nexPage').disabled = true; //禁用下一页按钮
                    } else {
                        $('.nexPage').disabled = false; //解除下一页按钮禁用
                    }
                    if(findPageIndex == 0){
                        $('.prevPage').disabled = true;  //禁用上一页按钮
                    }
                } else {
                    alert(res.data.mes)
                }
            })
            break;

            //重置
        case "reset":
            pageType = "default"; //切换为默认翻页
            findPageIndex = 0;
            requestCont('../api/getCont', {
                token: location.search.split("=")[1],
                page: pageIndex
            })
            breakl
            //添加
        case "add":
            $(".mask").style.display = "flex"
            type = 'add' 

            break;
            //设置
        case "set":
            $(".mask").style.display = "flex"
            type = "set" 
            uid = e.target.getAttribute('uid');
            $('.name').value = getElement(6, e.target).innerHTML;
            $('.jobNumber').value = getElement(5, e.target).innerHTML;
            $('.phone').value = getElement(4, e.target).innerHTML;
            $('.designation').value = getElement(3, e.target).innerHTML;
            $('.grade').selectedIndex = getElement(2, e.target).className * 1
            $('.gradeName').selectedIndex = getElement(1, e.target).className * 1;
            break;
            //删除
        case "del":
            type = "del" 
            uid = e.target.getAttribute('uid');
            requestCont('../api/del', {
                id: uid,
                token: location.search.split("=")[1],
                page: pageIndex
            })
            break;
    }
}

//请求数据并渲染
function requestCont(api, data) {
    axios.post(api, data).then(res => {
        if (res.data.statu === "ok") {
            render(res.data.data, res.data.maxPage)
        } else {
            alert(res.data.mes)
        }
    })
}
//获取value
function getSeleteValue(element) {
    let index = element.selectedIndex;
    return element.options[index].value;
}

//获取dom元素
function getElement(num, element) {
    let el = element.parentNode;
    for (let i = 0; i < num; i++) {
        el = el.previousElementSibling
    }
    return el;
}


//渲染页面
function render(data, maxPage) {
    let str =
        "<div>姓名</div><div>工号</div><div>手机号</div><div>产品名称</div><div>技能等级</div><div>用户类型</div><div>操作</div>";
    let grade = '',
        gradeName = '';
    $('.userList').innerHTML = str + data.map(item => {
        switch (item.grade) {
            case 0:
                grade = "一级";
                break;
            case 1:
                grade = "二级";
                break;
            case 2:
                grade = "三级";
                break;
        }
        switch (item.gradeName) {
            case 0:
                gradeName = "初级";
                break;
            case 1:
                gradeName = "中级";
                break;
            case 2:
                gradeName = "高级";
                break;
        }
        return `<div>${item.name}</div><div>${item.jobNumber}</div><div>${item.phone}</div><div>${item.designation}</div><div class="${item.grade}">${grade}</div><div class="${item.gradeName}">${gradeName}</div><div class="last_btn"><button class="set" uid="${item.id}">编辑</button><button class = "del" uid="${item.id}">删除</button></div>`
    }).join('');


    //页码
    switch (pageType) {

        case 'default':
            let pageStr = '';
            // let end = maxPage > 13 ? 13:maxPage;  //最大渲染页码数
            if (pageIndex > 6) {
                for (let i = pageIndex - 7; i < pageIndex + 7; i++) {
                    pageStr += `<span ind = '${i}' class="${i ===pageIndex?'active':''}">${i+1}</span>`;
                }
            } else {
                for (let i = 0; i < 14; i++) {
                    pageStr += `<span ind = '${i}' class="${i ===pageIndex?'active':''}">${i+1}</span>`;
                }
            }
            $('.innerPage').innerHTML = pageStr;

            break;
        case "find":
            let pageStr1 = '';
            for (let i = 0; i < maxPage; i++) {
                pageStr1 += `<span ind = '${i}' class="${i ===findPageIndex?'active':''}">${i+1}</span>`;
            }
            $('.innerPage').innerHTML = pageStr1;
    }

}

//页码数字点击
$('.innerPage').onclick = e => {
    if (e.target.nodeName === "SPAN") {
        switch(pageType){
            case 'default' :
                pageIndex = +e.target.getAttribute('ind') //更新页码
                if (pageIndex == 0) {
                    $('.prevPage').disabled = true;
                } else {
                    $('.prevPage').disabled = false;
                }
                //请求数据
                requestCont('../api/getCont', {
                    token: location.search.split("=")[1],
                    page: pageIndex
                })
                break;
            case 'find':
                findPageIndex = +e.target.getAttribute('ind') //更新页码
                if (findPageIndex == 0) {
                    $('.prevPage').disabled = true;
                    $('.nexPage').disabled = false;
                } else if(findPageIndex+1 == Math.ceil(JSON.parse(localData).length / 12)){
                    $('.prevPage').disabled = false;
                    $('.nexPage').disabled = true;
                } else {
                    $('.prevPage').disabled = false;
                    $('.nexPage').disabled = false;
                }
                render(JSON.parse(localData).slice(findPageIndex * 12, findPageIndex * 12 + 12), Math.ceil(JSON.parse(localData).length / 12))
        }
        
    }
}