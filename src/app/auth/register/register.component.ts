import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  controlConfirm = new FormControl('');

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.form.value).subscribe(res => {
      console.log(res);
    }, () => {
      this.snackBar.open('Something went wrong', 'CLOSE', {
        duration: 3000,
        horizontalPosition: 'center'
      })
    })
  }

  get isPasswordMatch() {
    return this.controlConfirm.value !== this.form.get('password').value;
  }
}
