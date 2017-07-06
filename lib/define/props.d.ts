/**
 * Handle props specification and everything which is related:
 * - local listening to props changes
 * - pure render mixin
 */
import { TypeSpecs } from './typeSpecs';
export interface PropsMetadata {
    pureRender?: boolean;
    _props?: TypeSpecs;
}
export default function process(Class: any, {props, pureRender}: {
    props: any;
    pureRender: any;
}): void;
