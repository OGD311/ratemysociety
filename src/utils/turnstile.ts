export async function verifyTurnstile(token: string, ip?: string) {
    const formData = new FormData();

    if (!process.env.CF_SECRET_KEY) {
        throw new Error("CF_SECRET_KEY environment variable is not set");
    }
    formData.append('secret', process.env.CF_SECRET_KEY);
    formData.append('response', token);
    if (ip) {formData.append('remoteip', ip);}

    try {
        const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
        const response = await fetch(url, {
            body: formData,
            method: "POST",
        });

        const result = await response.json()
        return result.success === true;

    } catch (err) {
        return false;
    }
}