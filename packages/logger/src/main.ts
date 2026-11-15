import pino from "pino";
import { config } from "dotenv";

config({
    path: "../../.env",
    quiet: true,
});

const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
    level: process.env.LOG_LEVEL ?? (isDev ? "debug" : "info"),
    redact: {
        paths: [
            "password",
            "token",
            "accessToken",
            "spline_auth_token",
            "refreshToken",
            "authorization",
            "cookie",
            "headers.authorization",
            "set-cookie",
        ],
        censor: "[REDACTED]",
    },
    formatters: {
        level: (label) => ({ level: label }),
    },
    ...(isDev && { transport: { target: "pino-pretty" } }),
});
