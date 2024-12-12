export default StackedBarChart;
type StackedBarChart = SvelteComponent<{
    data?: {
        name: string;
        'Category 1': number;
        'Category 2': number;
        'Category 3': number;
        'Category 4 with a long name': number;
        'Category 5': number;
    }[];
    config?: {
        title: string;
        subtitle: string;
        source: string;
        xAxisLabel: string;
        valueSuffix: string;
        yKey: string;
        xKey: string;
        zKey: string;
    };
}, {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string;
} & {
    data: {
        name: string;
        'Category 1': number;
        'Category 2': number;
        'Category 3': number;
        'Category 4 with a long name': number;
        'Category 5': number;
    }[];
    config: {
        title: string;
        subtitle: string;
        source: string;
        xAxisLabel: string;
        valueSuffix: string;
        yKey: string;
        xKey: string;
        zKey: string;
    };
};
declare const StackedBarChart: $$__sveltets_2_IsomorphicComponent<{
    data?: {
        name: string;
        'Category 1': number;
        'Category 2': number;
        'Category 3': number;
        'Category 4 with a long name': number;
        'Category 5': number;
    }[];
    config?: {
        title: string;
        subtitle: string;
        source: string;
        xAxisLabel: string;
        valueSuffix: string;
        yKey: string;
        xKey: string;
        zKey: string;
    };
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {
    data: {
        name: string;
        'Category 1': number;
        'Category 2': number;
        'Category 3': number;
        'Category 4 with a long name': number;
        'Category 5': number;
    }[];
    config: {
        title: string;
        subtitle: string;
        source: string;
        xAxisLabel: string;
        valueSuffix: string;
        yKey: string;
        xKey: string;
        zKey: string;
    };
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
