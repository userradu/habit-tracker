import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'register',
		loadChildren: './register/register.module#RegisterModule'
	},
	{
		path: 'confirm-account',
		loadChildren: './confirm-account/confirm-account.module#ConfirmAccountModule'
	},
	{
		path: 'forgot-password',
		loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule'
	},
	{
		path: 'reset-password',
		loadChildren: './reset-password/reset-password.module#ResetPasswordModule'
	},
	{
		path: 'login',
		loadChildren: './login/login.module#LoginModule'
	},
	{
		path: 'dashboard',
		loadChildren: './dashboard/dashboard.module#DashboardModule'
	},
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
