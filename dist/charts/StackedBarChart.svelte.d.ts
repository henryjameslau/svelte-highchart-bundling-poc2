export default StackedBarChart;
type StackedBarChart = SvelteComponent<{
    data: any;
    config?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string;
} & {
    data: any;
    config: {};
};
declare const StackedBarChart: $$__sveltets_2_IsomorphicComponent<{
    data: any;
    config?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {
    data: any;
    config: {};
}, string>;
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import("svelte").ComponentConstructorOptions<Props>): import("svelte").SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
