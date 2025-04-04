import { Component } from '@angular/core';
import { LeftBoxComponent } from "./left-box/left-box.component";
import { RegisterButtonComponent } from './register-button/register-button.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { HeaderComponent } from "./header/header.component";
import { RouterOutlet } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-root',
  imports: [LeftBoxComponent, HeaderComponent, MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
  loggedIn = false;
  getLoggedIn(loggedIn: boolean) {
    alert(loggedIn);
    this.loggedIn = loggedIn;
  }
}
