import { FormHelper } from './helper';
import FormStudio from '@@/FormStudio';
import components from './components';
import factorys from '@@/factory';
import layouts from './layout';

export default function install() {
  for (const mod of Object.keys(factorys)) {
    FormStudio.registerFactory(factorys[mod]);
  }
  for (const mod of Object.keys(components)) {
    FormHelper.registerComponent(components[mod].default);
    if (components[mod].PropEditor) {
      FormHelper.registerEditor(components[mod].PropEditor);
    }
  }

  for (const mod of Object.keys(layouts)) {
    FormHelper.registerComponent(layouts[mod].default);
    if (layouts[mod].PropEditor) {
      FormHelper.registerEditor(layouts[mod].PropEditor);
    }
  }
}
