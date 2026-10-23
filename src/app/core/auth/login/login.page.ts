import { Component, inject, signal } from '@angular/core';
import { email, form, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Auth } from '@core/auth/auth';
import { SharedForms } from '@shared/index';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [SharedForms],
  template: `
    <form
      class="mx-auto grid max-w-xl gap-8 rounded-md bg-surface-container-lowest p-5 shadow-level1"
      novalidate
      (submit)="onSubmit($event)"
    >
      <h1 class="font-brand text-headline-sm text-on-surface">Login</h1>

      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput type="email" autocomplete="username" [formField]="loginForm.email" />
        <mat-error>Enter a valid email address.</mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Password</mat-label>
        <input
          matInput
          type="password"
          autocomplete="current-password"
          [formField]="loginForm.password"
        />
        <mat-error>Password is required.</mat-error>
      </mat-form-field>

      @if (serverError()) {
        <p role="alert" class="text-body-md text-error">{{ serverError() }}</p>
      }

      <button mat-flat-button type="submit" class="w-full">Login</button>
    </form>
  `,
})
export class LoginPage {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  private readonly credentials = signal({ email: '', password: '' });

  readonly loginForm = form(this.credentials, (path) => {
    required(path.email);
    email(path.email);
    required(path.password);
  });

  readonly serverError = signal<string | null>(null);

  onSubmit(event: Event) {
    // event.preventDefault(); // Prevent browser from reloading page

    submit(this.loginForm, async () => {
      const creds = this.credentials();

      try {
        await lastValueFrom(this.auth.login(creds.email, creds.password));
        await this.router.navigateByUrl('/deals');
      } catch (error) {
        this.serverError.set(error instanceof Error ? error.message : 'Login failed.');
      }
    });
  }
}
