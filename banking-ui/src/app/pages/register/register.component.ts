import {Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserDto} from '../../services/models/user-dto';
import { register as registerApi } from '../../services/fn/authentication-controller/register';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
userDto: UserDto = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};
errorMessage: Array<string> = [];

  private authService = inject(AuthService);
  private router = inject(Router);

  register() {
    this.errorMessage = []; // reset
    // Appel à ton endpoint généré
    this.authService.register(this.userDto)
      .subscribe({
        next: async (res) => {
          await this.router.navigate(['/confirm-register']);
          console.log(res.body);
        },
        error: (err) => {
          // err.error correspond au body JSON de ExceptionRepresentation
          const backendError = err.error;
          // message global (par ex. "Object not valid exception has occured")
          if (backendError?.errorMessage) {
            this.errorMessage.push(backendError.errorMessage);
          }
          // messages de validation (annotations de UserDto)
          if (backendError?.validationErrors && Array.isArray(backendError.validationErrors)) {
            this.errorMessage.push(...backendError.validationErrors);
          }
        }
      });
  }
}
