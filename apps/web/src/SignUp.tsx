import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "./components/Input";
import auth from "./lib/api/auth";
import "./SignUp.css";
import {
    IconKeyFilled,
    IconMailFilled,
    IconUserFilled,
    IconAlertSquareRoundedFilled,
} from "@tabler/icons-react";

type SignUpDetails = {
    username: string;
    email: string;
    password: string;
};

type SignUpStatus = "idle" | "loading" | "success" | "error";

const transition = { duration: 0.12, ease: "easeOut" } as const;

const hidden = { opacity: 0, filter: "blur(6px)" };
const visible = { opacity: 1, filter: "blur(0px)" };

export function SignUp() {
    const [status, setStatus] = useState<SignUpStatus>("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        if (!form.reportValidity()) return;

        setStatus("loading");

        const data: SignUpDetails = Object.fromEntries(new FormData(form)) as SignUpDetails;

        try {
            const result = await auth.signUp(data.username, data.email, data.password);
            setStatus(result.success ? "success" : "error");
            setTimeout(() => {
                setStatus("idle");
            }, 3000);
        } catch (e) {
            console.error(e);
            setStatus("error");
            setTimeout(() => {
                setStatus("idle");
            }, 3000);
        }
    }

    const label = status === "success" ? "Signed up successfully!" : "Sign Up!";

    return (
        <div className="root">
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="header">Create an Account</h3>
                <Input
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Enter a username"
                    autoComplete="username"
                    label="Username"
                    startIcon={<IconUserFilled width={18} height={18} />}
                    className="surface--inset shadow"
                    required={true}
                ></Input>
                <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Enter an email"
                    autoComplete="email"
                    label="Email"
                    startIcon={<IconMailFilled width={18} height={18} />}
                    className="surface--inset shadow"
                    required={true}
                ></Input>
                <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter a password"
                    autoComplete="new-password"
                    label="Password"
                    startIcon={<IconKeyFilled width={18} height={18} />}
                    className="surface--inset shadow"
                    required={true}
                ></Input>
                <p id="redirect">
                    Already have an account? <a href="/signin">Sign in to your account.</a>
                </p>
                <motion.button
                    id="signUp"
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
