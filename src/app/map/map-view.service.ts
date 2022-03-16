import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import MapView from '@arcgis/core/views/MapView';

@Injectable({providedIn: 'root'})
export class MapViewService {
  private _element: Element;

  public view: MapView;

  constructor(
    private _mapService: MapService
  ) {

  }

  init(element: Element) {
    this._element = element;
    this.view = new MapView({
      // this.view = new SceneView({
      container: <any>this._element,
      constraints: <any>{
        snapToZoom: true,
      },
      // center: center,
      // scale: scale,
      map: this._mapService.map,
      // highlightOptions: {
      //   color: HIGHLIGHT_COLOR,
      //   haloColor: new Color([19, 84, 84]),
      //   haloOpacity: 1.0
      // },
      // extent
    });
  }

}
