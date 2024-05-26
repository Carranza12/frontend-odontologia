import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { EvidenciaModalComponent } from '../components/evidencia-modal/evidencia-modal.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvidenciaModalService {
  private evidenciaSubject = new Subject<any>();
  evidencia$ = this.evidenciaSubject.asObservable();
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) { }

  createHTMLModal(evidencia: any, index: number){
    const componentFactory = this.resolver.resolveComponentFactory(EvidenciaModalComponent);
    const componentRef:any = componentFactory.create(this.injector);
    componentRef.instance.evidencia = evidencia;
    componentRef.instance.index = index;
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    return domElem
  }

  enviarEvidencia(evidencia: any) {
    this.evidenciaSubject.next(evidencia);
  }
}
