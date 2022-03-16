
import {
  Component, ElementRef, OnInit,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { MapViewService } from './map-view.service';

@Component({
  selector: 'esri-map',
 template: `
  <div id="viewDiv"></div>
  <ng-content></ng-content>
 `,
 styles: [`
 :host {
  height: 100%;
  width: 100%;
}

#viewDiv {
  height: 100%;
  width: 100%;
}
 `],

  // nothing really to monitor in this component.
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {

  constructor(private _elementRef: ElementRef,
    private _mapViewService: MapViewService,
    private _changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this._changeDetectorRef.detach();
    this._mapViewService.init(this._elementRef.nativeElement.firstChild)
  }

}
