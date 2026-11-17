import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "./components/Input";
import auth from "./lib/api/auth";
import "./SignIn.css";
import { IconAlertSquareRoundedFilled, IconKeyFilled, IconUserFilled } from "@tabler/icons-react";

type SignInDetails = {
    usernameOrEmail: string;
    password: string;
};

type SignInStatus = "idle" | "loading" | "success" | "error";

const transition = { duration: 0.12, ease: "easeOut" } as const;

const hidden = { opacity: 0, filter: "blur(6px)" };
const visible = { opacity: 1, filter: "blur(0px)" };

export function SignIn() {
    const [status, setStatus] = useState<SignInStatus>("idle");

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        if (!form.reportValidity()) return;

        setStatus("loading");

        const data: SignInDetails = Object.fromEntries(new FormData(form)) as SignInDetails;

        try {
            if (data.usernameOrEmail.includes("@")) {
                await auth.signInEmail(data.usernameOrEmail, data.password);
            } else {
                await auth.signInUsername(data.usernameOrEmail, data.password);
            }
            setStatus("success");
        } catch (e) {
            console.error(e);
            setStatus("error");
        }

        setTimeout(() => {
            setStatus("idle");
        }, 3000);
    }

    const label = status === "success" ? "Signed in successfully!" : "Sign In!";

    return (
        <div className="root">
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="header">Sign In</h3>
                <Input
                    name="usernameOrEmail"
                    id="usernameOrEmail"
                    type="text"
                    placeholder="Enter your username or email"
                    autoComplete="username"
                    label="Username or email"
                    startIcon={<IconUserFilled width={18} height={18} />}
                    className="surface--inset shadow"
                    required={true}
                ></Input>
                <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    label="Password"
                    startIcon={<IconKeyFilled width={18} height={18} />}
                    className="surface--inset shadow"
                    required={true}
                ></Input>
                <p id="redirect">
                    Don't have an account? <a href="/signup">Sign up instead.</a>
                </p>
                <motion.button
                    id="signIn"
                    className={`surface--raised shadow primary${status === "loading" ? " loading" : ""}${status === "error" ? " error" : ""}`}
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                >
                    <motion.span
                        id="label"
                        className="state"
                        animate={status === "idle" || status === "success" ? visible : hidden}
                        transition={transition}
                    >
                        {label}
                    </motion.span>
                    <motion.span
                        className="state"
                        animate={status === "loading" ? visible : hidden}
                        transition={transition}
                    >
                        <span id="spinner" />
                    </motion.span>
                    <motion.span
                        className="state"
                        animate={status === "error" ? visible : hidden}
                        transition={transition}
                    >
                        <IconAlertSquareRoundedFilled width={18} height={18} />
                    </motion.span>
                </motion.button>
            </form>
        </div>
    );
}
