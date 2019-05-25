import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NotLoggedInGuard } from './auth/not-logged-in.guard';

const routes: Routes = [
	{
		path: 'register',
		loadChildren: './auth/register/register.module#RegisterModule',
		canLoad: [NotLoggedInGuard],
		canActivate: [NotLoggedInGuard]
	},
	{
		path: 'confirm-account',
		loadChildren: './auth/confirm-account/confirm-account.module#ConfirmAccountModule'
	},
	{
		path: 'forgot-password',
		loadChildren: './auth/forgot-password/forgot-password.module#ForgotPasswordModule',
		canLoad: [NotLoggedInGuard],
		canActivate: [NotLoggedInGuard]
	},
	{
		path: 'reset-password',
		loadChildren: './auth/reset-password/reset-password.module#ResetPasswordModule'
	},
	{
		path: 'login',
		loadChildren: './auth/login/login.module#LoginModule',
		canLoad: [NotLoggedInGuard],
		canActivate: [NotLoggedInGuard]
	},
	{
		path: 'dashboard',
		loadChildren: './dashboard/dashboard.module#DashboardModule',
		canLoad: [AuthGuard],
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
