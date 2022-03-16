import { Injectable } from '@angular/core';

import EsriMap from '@arcgis/core/Map';

@Injectable({providedIn: 'root'})
export class MapService {
  public map: EsriMap;

  constructor() {
    this.map = new EsriMap({
      basemap: 'topo-vector'
    })
   }

}
