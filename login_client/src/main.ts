import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module";
import 'rxjs/Rx';

//JIT
platformBrowserDynamic()
    .bootstrapModule(AppModule);