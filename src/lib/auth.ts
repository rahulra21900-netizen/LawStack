export type AuthScope = "platform" | "tenant" | "client" | null;

export interface AuthSession {
  authenticated: boolean;
  mfaVerified: boolean;
  scope: AuthScope;
  role: string;
  email: string;
  tenantId: string | null;
  tenantName: string | null;
}

const AUTH_STORAGE_KEY = "lawstack-auth-session";

const defaultSession: AuthSession = {
  authenticated: false,
  mfaVerified: false,
  scope: null,
  role: "",
  email: "",
  tenantId: null,
  tenantName: null,
};

export function getAuthSession(): AuthSession {
  if (typeof window === "undefined") {
    return defaultSession;
  }

  const raw = window.sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return defaultSession;
  }

  try {
    return { ...defaultSession, ...JSON.parse(raw) } as AuthSession;
  } catch {
    return defaultSession;
  }
}

export function setAuthSession(partial: Partial<AuthSession>): AuthSession {
  if (typeof window === "undefined") {
    return { ...defaultSession, ...partial };
  }

  const next = { ...getAuthSession(), ...partial };
  window.sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearAuthSession() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function isProtectedRoute(pathname: string) {
  const publicPaths = [
    "/platform/login",
    "/platform/signup",
    "/platform/forgot-password",
    "/platform/mfa",
    "/tenant/login",
    "/tenant/signup",
    "/tenant/join-workspace",
    "/tenant/accept-invitation",
    "/tenant/mfa",
    "/",
  ];

  return !publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}
