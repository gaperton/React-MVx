/*****************
 * State
 */
import { Store } from 'type-r';
export default function process(Class: any, definition: any): void;
export declare const StateMixin: {
    componentWillMount(): void;
    context: {
        _nestedStore: typeof Store;
    };
    getStore(): any;
    componentWillUnmount(): void;
};
export declare const UpdateOnNestedChangesMixin: {
    _onChildrenChange(): void;
    componentDidMount(): void;
};
