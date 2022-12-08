import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { GiTcgPlannerModule } from './app/gi-tcg-planner.module';


platformBrowserDynamic().bootstrapModule(GiTcgPlannerModule)
  .catch(err => console.error(err));
