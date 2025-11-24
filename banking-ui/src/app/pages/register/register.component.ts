import {Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserDto} from '../../services/models/user-dto';
import { register as registerApi } from '../../services/fn/authentication-controller/register';
import {HttpClient} from '@angular/common/http';

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

  private rootUrl = 'http://localhost:8080'; //
  private http = inject(HttpClient);


  register() {
    // Appel à ton endpoint généré
    registerApi(this.http, this.rootUrl, { body: this.userDto })
      .subscribe({
        next: (res) => {
          console.log('Utilisateur créé avec succès !');
          console.log(res.body);     // AuthenticationResponse
          alert('Compte créé avec succès !');
        },
        error: (err) => {
          console.error('Erreur lors de l’enregistrement :', err);
          this.errorMessage = err.error.validationErrors;
          alert('Erreur : ' + err.message);
        }
      });
  }
}
