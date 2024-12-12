Proof of concept of using SvelteKit to bundle components that use highcharts to make charts 

Uses vite to bundle once to `/dist/` and then uses vite again and `vite.js.config.js` that takes what's in `dist` and create `dist-js` folder that has UMD and ES versions.

Trying to follow [these instructions](https://stackoverflow.com/questions/75832641/how-to-compile-svelte-3-components-into-iifes-that-can-be-used-in-vanilla-js/75895650#75895650)
