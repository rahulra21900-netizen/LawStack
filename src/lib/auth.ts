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
  // Whitelist model: only these prefixes actually require auth.
  // Any other path (public pages, 404, marketing routes) renders freely.
  const protectedPrefixes = [
    "/workspace",
    "/client",
    "/platform/dashboard",
    "/platform/audit",
    "/platform/settings",
    "/platform/tenant-administration",
    "/platform/tenant-provisioning",
  ];

  return protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
