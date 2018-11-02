import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private auth: AuthService, private http: HttpClient, private router: Router) {
 
  }

  logout() {
    this.http.post('http://localhost:8080/logout', {}).pipe(
      finalize(() => {
        this.auth.authenticated = false;
        this.router.navigateByUrl('/login');
      })
    ).subscribe();
  }
}
