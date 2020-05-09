declare function extend(constructor: () => void): () => FunctionConstructor

declare function require(param:string):any;
declare const lang: {[key:string]: string};
declare const SMF: any;
declare const Device: any;
declare const global: any;
declare const alert: any;
type StyleContextDispatch = {
    dispatch: (action: { [key: string]: any }) => void;
}
type StyleContextAddChild = {
    addChild(child: View, name?: string, classNames?: string, userProps?: { [key: string]: any; }, defaultClassNames?: string): void;
}
type StyleContextComponent = StyleContextAddChild & StyleContextDispatch;
type StyleContextComponentType<T> = T & StyleContextAddChild & StyleContextDispatch;
type StyleContextComponentWithDispatch<T> = T & StyleContextDispatch;
type componentContextPatch = <T = any>(component: T, name: string) => StyleContextComponentType<T>;
