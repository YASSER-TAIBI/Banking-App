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

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user',
    component: MainPageComponent,
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
