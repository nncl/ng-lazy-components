import { NgModuleFactory, Type } from '@angular/core';

export const lazyWidgets: { name: string, loadChildren: () => Promise<NgModuleFactory<any> | Type<any>> }[] = [
  {
    name: 'map-component',
    loadChildren: () => import('../../components/map/map.module').then(m => m.MapModule)
  }
];

export function lazyArrayToObj(): any {
  const result = {};
  for (const w of lazyWidgets) {
    result[w.name] = w.loadChildren;
  }
  return result;
}
