import { Injectable } from '@angular/core';
import { HammerGestureConfig } from "@angular/platform-browser";

//HammerJS is produced by https://hammerjs.github.io/ 

@Injectable({
  providedIn: 'root'
})
export class HammerService extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
        const mc = new (<any> window).Hammer(element);

        for (const eventName in this.overrides) {
            if (eventName) {
                mc.get(eventName).set(this.overrides[eventName]);
            }
        }

        return mc;
    }
}
