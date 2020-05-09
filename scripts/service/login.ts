import * as config from "config.json";
import sc from "service";
export function getAuthzEndpoint() {
    return `${config.baseUrl}/oauth/authorize?response_type=code&client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&state=foobar`;
}
export function getAccessToken(code: string) {
    return sc.request(`/oauth/token`, {
        method: "POST",
        body: {
            "grant_type": "authorization_code",
            "client_id": config.clientId,
            "client_secret": config.clientSecret,
            code,
            "redirect_uri": encodeURIComponent(config.redirectUri)
        }
    });
}
