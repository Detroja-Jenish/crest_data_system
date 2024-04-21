import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-loginsignup',
  templateUrl: './loginsignup.component.html',
  styleUrl: './loginsignup.component.css'
})
export class LoginsignupComponent {

  constructor(private login : LoginService){}

  userName: String="";
  password : String =  "";

  newUserName: String = "";
  newPassword: String = "";
  newEmail: String = "";
  role : String = ""

  isCreator: String = "";


  onSubmit(e: any) {
    e.preventDefault()
    console.log(this.newUserName);
    const fd = new FormData(e.target);
    console.log(e.target)
    console.log(fd.get('name'))
      // const name = this.newUserName
      // const email = this.newEmail
      // const password = this.newPassword
      // const role = this.role
      this.login.signUp(fd)
        .subscribe(response => {
          console.log('Signup successful:', response);
          // Optionally, you can redirect the user to a different page
        }, error => {
          console.error('Signup failed:', error);
          // Handle error, e.g., display an error message to the user
        });
  }

  onLogin(e : any){
    e.preventDefault()
    const fd = new FormData(e.target)
    this.login.login(fd).subscribe((res: any) => {
      if(res.status != 200){
        alert("Login failed")
      }
      else{
        alert("success")
      }
    })
  }
}
