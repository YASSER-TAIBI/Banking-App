import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {UserDashboardComponent} from './pages/user-dashboard/user-dashboard.component';
import {TransactionsComponent} from './pages/transactions/transactions.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {ContactsComponent} from './pages/contacts/contacts.component';
import {NewContactComponent} from './pages/new-contact/new-contact.component';
import {NewTransactionComponent} from './pages/new-transaction/new-transaction.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {MainAdminPageComponent} from './admin/main-admin-page/main-admin-page.component';
import {ManageUsersComponent} from './admin/manage-users/manage-users.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {ConfirmRegisterComponent} from './pages/confirm-register/confirm-register.component';
import { TokenGuardService } from './services/guard/token-guard/token-guard.service';
import { AdminGuardService } from './services/guard/admin-guard/admin-guard.service';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: 'confirm-register', 
    component: ConfirmRegisterComponent 
  },
  { path: 'access-denied', 
    component: AccessDeniedComponent 
  },
  {
    path: 'user',
    component: MainPageComponent,
    canActivate: [TokenGuardService],
    children: [
      {
        path: 'dashboard',
        component: UserDashboardComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'contacts',
        component: ContactsComponent
      },
      {
        path: 'new-contact',
        component: NewContactComponent
      },
      {
        path: 'new-transaction',
        component: NewTransactionComponent
      },
      {
        path: 'new-contact/:idContact',
        component: NewContactComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: "full"
      }
    ]

},
  {
    path: 'admin',
    component: MainAdminPageComponent,
    canActivate: [TokenGuardService, AdminGuardService],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'customers',
        component: ManageUsersComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: "full"
      }
    ]
  }
];
