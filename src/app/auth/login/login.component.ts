import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, IAuthResponse } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private jwtService: JwtService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe((res: IAuthResponse) => {
      this.jwtService.setToken(res.token);
      this.router.navigateByUrl('/');
    }, () => {
      this.snackBar.open('Wrong login or password!', 'CLOSE', {
        duration: 3000,
        horizontalPosition: 'center'
      })
    })
  }
}
