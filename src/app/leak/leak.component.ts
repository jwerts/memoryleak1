import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '../map/map.service';

import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';

@Component({
  selector: 'leak',
  template: `<div>hi!</div>`,
})

export class LeakComponent implements OnInit, OnDestroy {
  private _graphicsLayer: GraphicsLayer = new GraphicsLayer({
    id: 'layer1'
  })

  constructor(private _mapService: MapService) { }

  ngOnInit() {
    this._mapService.map.add(this._graphicsLayer);
    const graphic = new Graphic({
      geometry: <any>{
        type: 'point',
        longitude: -122.6764,
        latitude: 45.5165,
        spatialReference: {
          wkid: 4326
        }
      },
      symbol: <any>{
        type: 'simple-marker',
        color: '#FF0000',
      }
    });
    this._graphicsLayer.add(graphic);
   }

  ngOnDestroy(): void {
    this._graphicsLayer.removeAll();
    this._mapService.map.remove(this._graphicsLayer);
  }
}
