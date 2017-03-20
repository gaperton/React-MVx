/// <reference types="react" />
import * as React from 'react';
import { Record, Store } from 'type-r';
import { TypeSpecs } from './define';
declare const ReactMVC: any;
declare global  {
    interface Function {
        value(x: any): any;
    }
}
export default ReactMVC;
export declare class Component<P> extends React.Component<P, Record> {
    static state?: TypeSpecs | typeof Record;
    static store?: TypeSpecs | typeof Store;
    static props?: TypeSpecs;
    static autobind?: string;
    static context?: TypeSpecs;
    static childContext?: TypeSpecs;
    static pureRender?: boolean;
    private static propTypes;
    private static defaultProps;
    private static contextTypes;
    private static childContextTypes;
    static define(protoProps: any, staticProps: any): typeof Component;
}
