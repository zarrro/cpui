import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Credentials } from '../credentials';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private error:boolean;
  private credentials:Credentials = {username: '', password: ''};

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.error = false;
  }

  login() {
    this.auth.authenticate(this.credentials).subscribe((success) => {
        this.error = !success;
        if(success) {
          this.router.navigateByUrl('/');
          this.credentials = new Credentials();
        }
    });
    return false;
  }

}
