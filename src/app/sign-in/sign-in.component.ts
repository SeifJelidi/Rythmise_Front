import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {map} from 'rxjs/operators';

export interface User {
    access_token: string;
    verified: boolean;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  userForm: FormGroup;
  loggedIn = false;
  incorrectData = false;
  submitted = false;
  user;
  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private authService: AuthService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.initForm();
  }

  // tslint:disable-next-line:typedef
  get f() { return this.userForm.controls; }

  initForm(): void {
    this.userForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]]
      }
    );
  }

  onSignIn(): void {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.incorrectData = false;
    this.spinner.show();
    const formSignInValue = this.userForm.value;
    const username = formSignInValue.username;
    const password = formSignInValue.password;

    this.authService.checkLogin(username, password)
      .subscribe(data => {
        localStorage.setItem('token', data.access_token);
        this.authService.isSessionID.next(true);
        this.router.navigate(['/dashboard']).then();
      },
        (err) => console.log(err));
  }
      /*
      subscribe(userURI => {
       this.loggedIn = true;
        this.spinner.hide();
        this.authService.isSessionID.next(true);
        this.authService.userID.next(userURI.headers.get('location'));
        this.router.navigate(['']).then();
        /*this.authService.getUser(userURI.headers.get('location'))
          .subscribe(user => {
            console.log(user);
            this.authService.userID.next(user.id);
            this.router.navigate(['']).then();
          });

      }, () => {this.incorrectData = true;
        this.spinner.hide();
      });*/


}
