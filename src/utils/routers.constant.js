export const PREFIX_ROUTES = {
    MAIN: "",
    AUTH: "/auth",
  };
  
  const ROUTES = {
    MAIN: {
      LOGIN: `${PREFIX_ROUTES.MAIN}/auth`,
      HOME: `${PREFIX_ROUTES.MAIN}/`,
      EXAMPLE: `${PREFIX_ROUTES.MAIN}/example`,
    },
    NOT_FOUND: {
      NOT_FOUND: "*",
      USE_ROLE: "/not-admin",
    },
  };
  
  export default ROUTES;
  