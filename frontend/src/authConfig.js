export const msalConfig = {
  auth: {
    clientId: "4f45f448-2d78-4af4-9c70-cd862d4ebbf7",
    authority: "https://login.microsoftonline.com/06f1c869-7c5f-43b4-95b1-75bf0354d168",
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
};

// Scopes para el login (identidad del usuario)
export const loginRequest = {
  scopes: ["openid", "profile", "email"],
};

// Scope de la API protegida (BFF) - se usa para pedir el Access Token
export const apiRequest = {
  scopes: ["api://7442c5c2-5a49-4b98-a70f-b6aec439fd6a/access_as_user"],
};

// URL base del BFF. Apunta al API Gateway desplegado en AWS (terraform/);
// para volver a hablarle al backend local, usar "http://localhost:8080".
export const bffBaseUrl = "https://p1at13oen7.execute-api.us-east-1.amazonaws.com";
