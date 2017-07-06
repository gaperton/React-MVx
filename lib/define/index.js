import processStore from './store';
import processState from './state';
import processContext from './context';
import processProps from './props';
export default function process(Class, definition) {
    // Initialize mixins placeholder...
    processStore(Class, definition);
    processState(Class, definition);
    processContext(Class, definition);
    processProps(Class, definition);
}
;
export { Node, Element } from './typeSpecs';
//# sourceMappingURL=index.js.map