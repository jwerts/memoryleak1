import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import MapView from '@arcgis/core/views/MapView';
import Compass from '@arcgis/core/widgets/Compass';
import Fullscreen from '@arcgis/core/widgets/Fullscreen';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Expand from '@arcgis/core/widgets/Expand';
import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import Locate from '@arcgis/core/widgets/Locate';
import Print from '@arcgis/core/widgets/Print';
import DistanceMeasure2d from '@arcgis/core/widgets/DistanceMeasurement2D';
import Basemap from '@arcgis/core/Basemap';
import TileLayer from '@arcgis/core/layers/TileLayer';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import * as watchUtils from '@arcgis/core/core/watchUtils';

@Injectable({providedIn: 'root'})
export class MapViewService {
  private _element: Element;

  public view: MapView;

  private _print: Print = null;
  private _printExpand: Expand = null;
  private _scaleBar: ScaleBar = null;
  private _basemapToggle: BasemapToggle = null;
  private _distanceMeasure: DistanceMeasure2d = null;
  private _distanceMeasureExpand: Expand = null;
  private _layerList: LayerList = null;
  private _layerListExpand: Expand = null;
  private _legend: Legend = null;
  private _legendExpand: Expand = null;

  private _distanceMeasureWatchHandle: IHandle = null;
  private _printExpandedHandle: IHandle = null;
  private _layerListExpandedHandle: IHandle = null;
  private _legendExpandedHandle: IHandle = null;

  constructor(
    private _mapService: MapService
  ) {

  }

  init(element: Element) {
    this._element = element;
    this.view = new MapView({
      container: <any>this._element,
      constraints: <any>{
        snapToZoom: true,
      },
      map: this._mapService.map
    });

    const compass = new Compass({
      view: this.view
    });
    this.view.ui.add(compass, { position: "top-left", index: 1 });

    this._setupFullScreen();
    this._setupLocate();
    this._setupLayerList();
    this._setupLegend();
    this._setupBasemapToggle();
    this._setupPrint();
  }

  private _setupFullScreen() {
    const fullscreen = new Fullscreen({
      view: this.view,
      // viewModel: new NativeFullScreenViewModel()
    });
    this.view.ui.add(fullscreen, { position: 'top-right', index: 1 });
  }

  private _setupLocate() {
    const locate = new Locate({
      view: this.view
    });
    this.view.ui.add(locate, { position: 'top-left', index: 3 })
  }

  private _setupLayerList() {
    this._layerList = new LayerList({
      view: this.view,
      container: document.createElement("div")
    });
    this._layerListExpand = new Expand({
      view: this.view,
      content: this._layerList.container,
      expandIconClass: 'esri-icon-layers',
      expandTooltip: "Toggle Layers"
    });
    this.view.ui.add(this._layerListExpand, { position: 'top-right', index: 2 });

    this._layerListExpandedHandle = watchUtils.whenTrue(this._layerListExpand, 'expanded', () => {
      this._printExpand.collapse();
      this._legendExpand.collapse();
      this._distanceMeasureExpand.collapse();
    });
  }

  private _setupLegend() {
    if (this._legend) {
      this.view.ui.remove(this._legendExpand);
      this._legend = null;
      this._legendExpand = null;
    }
    this._legend = new Legend({
      view: this.view,
      container: document.createElement("div"),
    });
    this._legendExpand = new Expand({
      view: this.view,
      content: this._legend.container,
      expandIconClass: "esri-icon-collection",
      expandTooltip: "Legend"
    });
    this.view.ui.add(this._legendExpand, { position: 'top-right', index: 3 });

    this._legendExpandedHandle = watchUtils.whenTrue(this._legendExpand, 'expanded', () => {
      this._printExpand.collapse();
      this._layerListExpand.collapse();
      this._distanceMeasureExpand.collapse();
    });
  }

  private _setupBasemapToggle(addDarkGrey = false) {
    if (this._basemapToggle) {
      this.view.ui.remove(this._basemapToggle);
      this._basemapToggle.destroy();
    }

    this._basemapToggle = new BasemapToggle({
      view: this.view
    });
  }

  private _setupPrint() {
    if (this._print) {
      this.view.ui.remove(this._printExpand);
      this._print = null;
    }
    this._print = new Print({
      view: this.view,
      // printServiceUrl: this._appConfig.config.print.url,
      templateOptions: {
        legendEnabled: false,
        // copyright: `${moment().format('YYYY')} Comcast All Rights Reserved`
      },
    });
    this._printExpand = new Expand({
      view: this.view,
      content: this._print,
      expandIconClass: 'esri-icon-printer',
      expandTooltip: 'Print'
    });
    this.view.ui.add(this._printExpand, { position: 'top-right', index: 4 });

    this._printExpandedHandle = watchUtils.whenTrue(this._printExpand, 'expanded', () => {
      this._distanceMeasureExpand.collapse();
      this._legendExpand.collapse();
      this._layerListExpand.collapse();
    });
  }

}
