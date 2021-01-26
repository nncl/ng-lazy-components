import {
  Injectable,
  Compiler,
  Injector,
  Type,
  ViewContainerRef,
  NgModuleFactory,
  Inject
} from '@angular/core';
import { LAZY_WIDGETS } from './tokens';

@Injectable({
  providedIn: 'root'
})
export class LazyLoaderService {

  constructor(private injector: Injector,
              private compiler: Compiler,
              // tslint:disable-next-line:no-shadowed-variable
              @Inject(LAZY_WIDGETS) private lazyWidgets: { [key: string]: () => Promise<NgModuleFactory<any> | Type<any>> }) {
  }


  async load(name: string, container: ViewContainerRef, data?: any): Promise<any> {
    const ngModuleOrNgModuleFactory = await this.lazyWidgets[name]();

    let moduleFactory;

    if (ngModuleOrNgModuleFactory instanceof NgModuleFactory) {
      moduleFactory = ngModuleOrNgModuleFactory;
    } else {
      moduleFactory = await this.compiler.compileModuleAsync(ngModuleOrNgModuleFactory);
    }

    const entryComponent = (moduleFactory.moduleType as any).entry;
    const moduleRef = moduleFactory.create(this.injector);

    const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);

    const comp: any = container.createComponent(compFactory);
    comp.instance.data = data;
  }

}
