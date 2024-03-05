import {FormHelper} from './helper';
import FormStudio from '@@/FormStudio';
import components from './components';
import factorys from '@@/factory';
import layouts from './layout';

export default function install() {
    Object.entries(factorys).forEach(([, v]) => {
        FormStudio.registerFactory(v);
    });

    Object.entries(components).forEach(([, v]) => {
        Object.entries(v).forEach(([k, m]) => {
            if (k == 'default') {
                FormHelper.registerComponent(m);
            }

            if (k == 'PropEditor') {
                FormHelper.registerEditor(m);
            }
        });
    });

    Object.entries(layouts).forEach(([, v]) => {
        Object.entries(v).forEach(([k, m]) => {
            if (k == 'default') {
                FormHelper.registerComponent(m);
            }

            if (k == 'PropEditor') {
                FormHelper.registerEditor(m);
            }
        });
    });
}
