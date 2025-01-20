$(document).ready(function() {
$('.btnlogin').click(function(){
    email = $('.email').val();
    password = $('.password').val();
    console.log(email);
    $.ajax({

        url: "http://apihanatekindo.test/api/auth",
        type: "POST",
        data: {
            "email": email,
            "password": password
        },

        success:function(response){
            console.log(response.token,'token');
            localStorage.setItem("ctoken", response.token);
            setCookie('ctoken',response.token,'3000')
           
        }
    });
})

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";";
  }



 
})
function getCookie(){
    return localStorage.getItem("ctoken");
}
function checkToken(){
    token = getCookie();
    if(token==''){
        window.location.href = "/index.html";
    }
}
function checkDashboard() {
    token  = getCookie();
    console.log(token,'masuk')
    $.ajax({

        url: "http://apihanatekindo.test/api/dashboard",
        type: "GET",
        headers: { 'Authorization': 'Bearer 7|fHgU0nsNzUjqc4rQfWw5z1SVNY4mhfSPxOEaqTXh04c9e8e3' },
        success:function(response){

            console.log(response,'token');
            $('.totalUser').text(response.data.total_user)
            $('.totalNewUser').text(response.data.user_new)
        }
    });
  }
  function checkUserData() {
    token  = getCookie();
    console.log(token,'masuk')
    $.ajax({

        url: "http://apihanatekindo.test/api/user",
        type: "GET",
        headers: { 'Authorization': 'Bearer 7|fHgU0nsNzUjqc4rQfWw5z1SVNY4mhfSPxOEaqTXh04c9e8e3' },
        success:function(response){
             listUser = '';
            response.data.forEach(val => {
                // calling createMyCustomeElement that takes data and id of element in which data gonna append
                listUser +='<tr>';
                listUser +='<td>';
                listUser +=val.name;
                listUser +='</td><td>';
                listUser +=val.email;
                listUser +='</td><td><a href="edit.html?edit='+val.id+'">Edit</a> | <a href="">Delete </a></td>';
                listUser +='</td><tr>';
            })
            if(listUser!=''){
                $('.listUser').html(listUser);
            }
           
        }
    });
  }
  function getUserData() {
    token  = getCookie();
    console.log(token,'masuk')
    $.ajax({

        url: "http://apihanatekindo.test/api/user",
        type: "GET",
        headers: { 'Authorization': 'Bearer 7|fHgU0nsNzUjqc4rQfWw5z1SVNY4mhfSPxOEaqTXh04c9e8e3' },
        success:function(response){
             listUser = '';
            response.data.forEach(val => {
                // calling createMyCustomeElement that takes data and id of element in which data gonna append
                listUser +='<tr>';
                listUser +='<td>';
                listUser +=val.name;
                listUser +='</td><td>';
                listUser +=val.email;
                listUser +='</td><td><a href="edit.html?edit='+val.id+'">Edit</a> | <a href="">Delete </a></td>';
                listUser +='</td><tr>';
            })
            if(listUser!=''){
                $('.listUser').html(listUser);
            }
           
        }
    });
  }