import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
	{
		path: 'register',
		loadChildren: './auth/register/register.module#RegisterModule'
	},
	{
		path: 'confirm-account',
		loadChildren: './auth/confirm-account/confirm-account.module#ConfirmAccountModule'
	},
	{
		path: 'forgot-password',
		loadChildren: './auth/forgot-password/forgot-password.module#ForgotPasswordModule'
	},
	{
		path: 'reset-password',
		loadChildren: './auth/reset-password/reset-password.module#ResetPasswordModule'
	},
	{
		path: 'login',
		loadChildren: './auth/login/login.module#LoginModule'
	},
	{
		path: 'dashboard',
		loadChildren: './dashboard/dashboard.module#DashboardModule',
		canActivate: [AuthGuard]
	},
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
