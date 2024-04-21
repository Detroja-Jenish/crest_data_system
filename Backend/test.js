// fetch( 'http://127.0.0.1:3000/login-signup/signup',{
//     method: "POST",
//     body: JSON.stringify({
//         name: 'jenish',
//         email: "jen@gmail.com",
//         role: "creator",
//         password: '1234',
//     }),
//     headers: {
//         'content-type':'application/json'
//     }
// }).then(res=>res.json())
// .then(res=>{
//     console.log(res);
// })


fetch( 'http://127.0.0.1:3000/login-signup/login',{
    method: "POST",
    body: JSON.stringify({
        
        email: "jen@gmail.com",
        password: '1234'
    }),
    headers: {
        'content-type':'application/json'
    }
}).then(res=>res.json())
.then(res=>{
    console.log(res);
})
// for(i=0;i<1;i++){

//     fetch('http://127.0.0.1:3001/demo.mp4')
//     .then(res=>res.json())
//     .then(res=>{console.log(res);})
//     .catch(e=>console.log(e))
// }