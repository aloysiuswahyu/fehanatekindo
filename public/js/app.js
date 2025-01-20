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
            location.href = 'dashboard.html';
            window.location.replace("dashboard.html");
        }
    });
})
$('.btnedit').click(function(){
    var q =  new URLSearchParams(window.location.search);
    var id = q.get('edit') ?? '';
    console.log(q.get('edit')); // price_descending
    name = $('.name').val();
    email = $('.email').val();
    password = $('.password').val();
    console.log(email);
    $.ajax({

        url: "http://apihanatekindo.test/api/user/update/"+id,
        type: "POST",
        headers: { 'Authorization': 'Bearer '+token },
        data: {
            "name": name,
         
          
        },

        success:function(response){
            console.log(response.token,'token');
            window.location.replace("user.html");
           
        }
    });
})
$('.btnadd').click(function(){
    var q =  new URLSearchParams(window.location.search);
    var id = q.get('edit') ?? '';
    console.log(q.get('edit')); // price_descending
    name = $('.name').val();
    email = $('.email').val();
    password = $('.password').val();
    console.log(email);
    $.ajax({

        url: "http://apihanatekindo.test/api/user/add",
        type: "POST",
        headers: { 'Authorization': 'Bearer '+token },
        data: {
            "name": name,
            "email":email,
            "password":password
         
          
        },

        success:function(response){
            console.log(response.token,'token');
            window.location.replace("user.html");
           
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
    return localStorage.getItem("ctoken") ?? '';
}
function checkToken(){
   var token = getCookie() ?? '';
    console.log(token,'oook')
    if ( token =='kosong' ) {
        console.log('sssssinsi')
        // window.location.href = "/index.html";
        window.location.replace("index.html");
        // location.href = 'index.html';
    }
}
function checkDashboard() {
    token  = getCookie();
   
    $.ajax({

        url: "http://apihanatekindo.test/api/dashboard",
        type: "GET",
        headers: { 'Authorization': 'Bearer '+token },
        success:function(response){

            console.log(response,'token');
            $('.totalUser').text(response.data.total_user)
            $('.totalNewUser').text(response.data.user_new)
        }
    });
  }
  function deleteUser(id) {
    token  = getCookie();
    console.log(token,'masuk')
    $.ajax({

        url: "http://apihanatekindo.test/api/user/delete/"+id,
        type: "post",
        headers: { 'Authorization': 'Bearer '+token },
        success:function(response){
            // window.location.replace("index.html");
        }
    });
  }
  function getUserData() {
    token  = getCookie();
    console.log(token,'masuk')
    $.ajax({

        url: "http://apihanatekindo.test/api/user",
        type: "GET",
        headers: { 'Authorization': 'Bearer '+token },
        success:function(response){
             listUser = '';
            response.data.forEach(val => {
                // calling createMyCustomeElement that takes data and id of element in which data gonna append
                listUser +='<tr>';
                listUser +='<td>';
                listUser +=val.name;
                listUser +='</td><td>';
                listUser +=val.email;
                listUser +='</td><td><a href="edit.html?edit='+val.id+'">Edit</a> | <a href="javascript:void(0);" onclick="deleteUser('+val.id+')">Delete </a></td>';
                listUser +='</td><tr>';
            })
            if(listUser!=''){
                $('.listUser').html(listUser);
            }
           
        }
    });
  }
  function getUserDataDetail() {
    var q =  new URLSearchParams(window.location.search);
    var id = q.get('edit') ?? '';
    token  = getCookie();
    console.log(token,'masuk')
    $.ajax({

        url: "http://apihanatekindo.test/api/user/detail/"+id,
        type: "GET",
        headers: { 'Authorization': 'Bearer '+token },
        success:function(response){
            $('.name').val(response.data.name)
            
            // $('.password').val(response.data.email)
           
        }
    });
  }
  function logout() {
    localStorage.setItem("ctoken", 'kosong');
    window.location.replace("index.html");
  }