import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://10.4.121.245:3000/login-signup/signup"
  urllogin = "http://10.4.121.245:3000/login-signup/login"
  urlCourse = "http://10.4.121.245:3000/course"
  constructor(private http : HttpClient) { 
  }

  signUp(fd: FormData) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    // const signupData = { name, email, password , role};
    console.log(fd.get('password'))
    return this.http.post(this.url, {
      name: fd.get('name'),
      password: fd.get('password'),
      email: fd.get('email'),
      role: fd.get('role')
    }, {
      headers: headers
    });
  }

  login(fd : FormData){
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post(this.urllogin,{
      email : fd.get('email'),
      password : fd.get('password')
    },{
      headers: headers
    })
  }
   addCourse(fd : FormData){
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    return this.http.post(this.urlCourse,{
      title: fd.get('title'),
      description : fd.get('description'),
      pricing: fd.get('pricing'),
      duration : fd.get('duration'),
      creatorId : "66248c08d45654d31ecd66f9"
    })
   }  
}
