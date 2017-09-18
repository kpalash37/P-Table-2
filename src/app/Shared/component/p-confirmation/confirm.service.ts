import {Injectable} from '@angular/core';

// The confirmation dialog is used through this service.
// When injected in the confirm component, the activate
// function of this service is bound to the corresponding
// function in that component. The component is in charge
// of manipulating the DOM to show the dialog and get the
// result back (via a Promise). This way, we can just
// add the component to the root app component's template,
// and then inject this service to use it anywhere.

@Injectable()
export class ConfirmService {
    public activate: (message?: string, title?: string) => Promise<boolean>;
}
