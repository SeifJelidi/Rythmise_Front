import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  userForm: FormGroup;
  incorrectData = false;
  errorText;
  submitted = false;
  differentPasswords = false;
  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private authService: AuthService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  // tslint:disable-next-line:typedef
  get f() { return this.userForm.controls; }

  initForm(): void {
    this.userForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        repeatPassword: ['', Validators.required]
      }
    );
  }

  onSignUp(): void {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.incorrectData = false;
    this.differentPasswords = false;
    const formSignUpValue = this.userForm.value;
    const email = formSignUpValue.email;
    const password = formSignUpValue.password;
    const repeatPassword = formSignUpValue.repeatPassword;
    const username = formSignUpValue.username;

    if (password !== repeatPassword) {
      this.differentPasswords = true;
      return;
    }

    this.spinner.show();
    this.authService.addUser(email, password, username)
      .subscribe(data => {
        this.router.navigate(['../sign-in']).then();
        console.log(data);
        this.spinner.hide();
      }, (error) => {
        this.incorrectData = true;
        this.errorText = error.error.detail;
        this.spinner.hide();
      });
  }

}
