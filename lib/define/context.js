import { compileSpecs } from './typeSpecs';
import { tools } from 'type-r';
export default function process(Class, _a) {
    var context = _a.context, childContext = _a.childContext;
    var prototype = Class.prototype;
    if (context) {
        // Merge in inherited members...
        prototype._context = tools.defaults(context, prototype._context || {});
        // Compile to propTypes...
        Class.contextTypes = compileSpecs(context).propTypes;
    }
    if (childContext) {
        prototype._childContext = tools.defaults(childContext, prototype._childContext);
        Class.childContextTypes = compileSpecs(childContext).propTypes;
    }
}
//# sourceMappingURL=context.js.map