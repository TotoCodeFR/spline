async function signUp(username: string, email: string, password: string) {
    const req = await fetch("/api/v1/auth/sign-up/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: username,
            username,
            email,
            password,
        }),
    });

    const data = await req.json();

    if (!req.ok) {
        return {
            success: false,
            error: {
                code: data.error.code,
                message: data.error.message
            }
        }
    }

    return {
        success: true,
        data
    };
}

async function signInEmail(email: string, password: string) {
    const req = await fetch("/api/v1/auth/sign-in/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await req.json();

    if (!req.ok) {
        return {
            success: false,
            error: {
                code: data.error.code,
                message: data.error.message
            }
        }
    }

    return {
        success: true,
        data
    };
}

async function signInUsername(username: string, password: string) {
    const req = await fetch("/api/v1/auth/sign-in/username", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    const data = await req.json();

    if (!req.ok) {
        return {
            success: false,
            error: {
                code: data.error.code,
                message: data.error.message
            }
        }
    }

    return {
        success: true,
        data
    };
}

export default {
    signUp,
    signInEmail,
    signInUsername,
};
