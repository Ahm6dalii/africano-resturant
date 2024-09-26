import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { OrdersComponent } from './pages/orders/orders.component';
import { LoginComponent } from './pages/login/login.component';
import { FoodCrudComponent } from '../app/pages/food-crud/food-crud.component';
import { FullComponent } from './layouts/full/full.component';
import { CreateAdminComponent } from './pages/create-admin/create-admin.component';
import { AdminListComponent } from './pages/view-admins/view-admins.component';
import { authGuard } from './gaurd/auth.guard';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import {CategoryCrudComponent} from '../app/pages/category-crud/category-crud.component'
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { LogsComponent } from './pages/logs/logs.component';
import { UserListComponent } from './pages/user-list/user-list.component';



export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', canActivate:[authGuard],component: DashboardComponent },
      { path: 'alerts', component: AlertsComponent },
      { path: 'forms', component: FormsComponent },
      { path: 'table', component: ProductComponent },
      { path: 'grid-list', component: GridListComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'tabs', component: TabsComponent },
      { path: 'expansion', component: ExpansionComponent },
      { path: 'chips', component: ChipsComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'toolbar', component: ToolbarComponent },
      { path: 'progress-snipper', component: ProgressSnipperComponent },
      { path: 'snackbar', component: SnackbarComponent },
      { path: 'slider', component: SliderComponent },
      { path: 'slide-toggle', component: SlideToggleComponent },
      { path: 'tooltip', component: TooltipsComponent },
      { path: 'button', component: ButtonsComponent },

      { path: "orders", component: OrdersComponent },
      { path: 'create', component: CreateAdminComponent},
      { path: 'admins', component: AdminListComponent},
      { path: 'users', component:UserListComponent},
      { path: 'logs', component: LogsComponent},
      { path: 'foods', component: FoodCrudComponent },
      { path: 'foods/:id', component: FoodCrudComponent },
      { path:'change-pass', component: ChangePassComponent },
     { path: 'categories', component: CategoryCrudComponent },
      { path: 'categories/:id', component: CategoryCrudComponent },
      { path: 'delivery', component: DeliveryComponent },
    ],
  },
  {path:"login", component:LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
