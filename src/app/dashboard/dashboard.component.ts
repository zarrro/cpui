import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private isLoggedIn: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.authenticated;
  }
}
