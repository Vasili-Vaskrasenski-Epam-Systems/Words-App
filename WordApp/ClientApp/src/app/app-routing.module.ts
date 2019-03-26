import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfiguredRoutes } from './routing/configured-routes';

import { NotFoundPageComponent } from './error-pages/not-found-page.component';
import { ForbiddenPageComponent } from './error-pages/forbidden-page.component';

@NgModule({
  imports: [RouterModule.forRoot(ConfiguredRoutes.routes.map(r => r.route))],
  exports: [RouterModule],
  declarations: [NotFoundPageComponent, ForbiddenPageComponent]
})

export class AppRoutingModule { }
