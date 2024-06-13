import {createViewModel} from "~/View/changeCurrency/changeCurrency-view-model";

export function onNavigatingTo(args)
{
    const page = args.object;
    page.bindingContext = createViewModel(page.navigationContext);
}
