import {OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

export class Base implements OnDestroy{
  protected destroy: Subject<void> = new Subject<void>()

  ngOnDestroy() {
    this.destroy.complete()
  }
}
