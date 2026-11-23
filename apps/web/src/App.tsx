import { Route, Routes } from "react-router";
import { SignUp } from "./pages/auth/SignUp";
import "./tokens.css";
import "./main.css";
import { SignIn } from "./pages/auth/SignIn";
import { App } from "./pages/app/App"

function Landing() {
    return <h1>Spline</h1>;
}

function NotFound() {
    return <h1>Page not found</h1>;
}

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/app/*" element={<App />} />
        </Routes>
    );
}
