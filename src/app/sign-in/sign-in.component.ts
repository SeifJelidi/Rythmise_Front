import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

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
        email: ['', [Validators.required, Validators.email]],
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
    const email = formSignInValue.email;
    const password = formSignInValue.password;

    this.authService.checkLogin(email, password)
      .subscribe(userURI => {
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
          });*/
      }, () => {this.incorrectData = true;
        this.spinner.hide();

      });
  }

}
