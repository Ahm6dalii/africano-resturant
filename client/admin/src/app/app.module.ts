import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module';

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { provideRouter } from '@angular/router';
import { NotificationsComponent } from "./adminComponents/notifications/notifications.component";
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule, routes } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [AppComponent, FullComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule,
    NotificationsComponent,
    MatDialogModule,
  ],
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
