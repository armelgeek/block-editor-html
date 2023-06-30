export const apiPrefix = {
    baseUrl: "http://localhost:8100" 
}
export const storageDataPrefix = {
  accessToken: "@user_token",
  refreshToken: "@user_refresh_token",
} as const;

export const routeLists = {
    app: '/',
    login: "/login"
}