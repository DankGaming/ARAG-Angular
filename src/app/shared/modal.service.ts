import { ComponentFactoryResolver, ComponentRef, Injectable, Type } from "@angular/core";
import { Modal } from "./modals/modal.interface";
import { PlaceholderDirective } from "./placeholder.directive";

@Injectable({
	providedIn: "root",
})
export class ModalService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
    createModal<T extends Modal>(type: Type<T>, host: PlaceholderDirective): ComponentRef<T> {
        const factory = this.componentFactoryResolver.resolveComponentFactory(type);
        const hostViewContainer = host.viewContainerRef;
        const modalRef = hostViewContainer.createComponent(factory);
        modalRef.instance.closeModal.subscribe(() => hostViewContainer.clear());
        return modalRef;
    }
}
