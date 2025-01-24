import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [ReactiveFormsModule],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signUp(): void {
    if (this.form.valid) {
      const userInfo = {
        "first-name": this.form.value.fName,
        "last-name": this.form.value.lName,
        "email": this.form.value.email,
        "password": this.form.value.password

      };

      this.apiService.signUp(userInfo).subscribe({
        next: (response) => {
          console.log('Sign-up successful:', response);
        },
        error: (error) => {
          console.error('Sign-up error:', error);
        }
      });
    } else {
      console.warn('Form is invalid! Please fill out all required fields.');
    }
  }
}
