import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

const config = {
    preprocess: preprocess(),

    kit: {
        target: "#svelte",
        adapter: adapter({
            pages: "build",
            assets: "build",
            fallback: null,
        }),
        paths: {
            base: "/svelte-test/",
        },
    },
};

export default config;
