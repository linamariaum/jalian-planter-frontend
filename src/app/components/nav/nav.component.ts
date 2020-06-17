import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userId: string;
  role: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.role = Number(localStorage.getItem('role'));
  }
  
  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    //this.router.navigate['/login'];
  }

}
