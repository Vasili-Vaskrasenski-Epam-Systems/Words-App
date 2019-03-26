import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfiguredRoutes } from './routing/configured-routes';

import { NotFoundPageComponent } from './pages/error-pages/not-found-page.component';
import { ForbiddenPageComponent } from './pages/error-pages/forbidden-page.component';

@NgModule({
  imports: [RouterModule.forRoot(ConfiguredRoutes.routes)],
  exports: [RouterModule],
  declarations: [NotFoundPageComponent, ForbiddenPageComponent]
})

export class AppRoutingModule { }
