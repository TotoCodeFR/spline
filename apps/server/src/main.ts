import { node } from "@elysia/node";
import { Elysia } from "elysia";
import { auth as authConfig } from "@splinehq/auth";
import { loadModules } from "./loader.js";
import { logger } from "@splinehq/logger";

const app = new Elysia({ adapter: node() });

app.trace(({ id, set }) => {
    set.headers["x-request-id"] = id.toString();
});

app.mount(authConfig.handler);

const modules = await loadModules();

modules.forEach((mod) => {
    Object.entries(mod.versions).forEach(([version, plugin]) => {
        app.group(`/api/${version}/${mod.name}`, (group) => group.use(plugin));
    });
});

app.listen(3000, ({ hostname, port, error }) => {
    if (error) {
        return logger.error({ error }, "failed to start server");
    }

    logger.info(
        {
            port,
            hostname,
        },
        "Server is now listening",
    );
});
