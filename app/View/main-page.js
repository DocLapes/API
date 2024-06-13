import { createViewModel } from './main-view-model';

export async function onNavigatingTo(args)
{
    const page = args.object;
    page.bindingContext = await createViewModel();
}
