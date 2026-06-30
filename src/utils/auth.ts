const TOKEN_KEY = "token";
const USER_KEY = "user";

const normalizeDisplayName = (value: unknown) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

export const getProfileImageUrl = (value: unknown) => {
  const normalizedValue = normalizeDisplayName(value);

  if (!normalizedValue) {
    return "/profile.jpg";
  }

  if (/^https?:\/\//i.test(normalizedValue)) {
    return normalizedValue;
  }

  if (normalizedValue.startsWith("/")) {
    return normalizedValue;
  }

  return `https://ambchapcorps.org/storage/${normalizedValue}`;
};

const normalizeDisplayValue = (value: unknown) => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const candidate = [
      record.name,
      record.full_name,
      record.display_name,
      record.label,
      record.title,
      record.value,
    ].map(normalizeDisplayName).find(Boolean);

    if (candidate) {
      return candidate;
    }
  }

  return "";
};

const readDisplayValue = (source: Record<string, unknown> | null | undefined, keys: string[]) => {
  if (!source) {
    return "";
  }

  for (const key of keys) {
    const value = source[key];
    const normalized = normalizeDisplayValue(value);

    if (normalized) {
      return normalized;
    }
  }

  return "";
};

const isMeaningfulCandidate = (candidate: Record<string, unknown> | null | undefined) => {
  if (!candidate || typeof candidate !== "object") {
    return false;
  }

  return Boolean(
    candidate.first_name ||
    candidate.last_name ||
    candidate.firstName ||
    candidate.lastName ||
    candidate.name ||
    candidate.full_name ||
    candidate.display_name ||
    candidate.email ||
    candidate.membership_id ||
    candidate.phone ||
    candidate.id
  );
};

const collectUserCandidates = (payload: unknown) => {
  const candidates: Array<Record<string, unknown>> = [];

  const pushCandidate = (value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item && typeof item === "object") {
          candidates.push(item as Record<string, unknown>);
        }
      });
      return;
    }

    if (value && typeof value === "object") {
      candidates.push(value as Record<string, unknown>);
    }
  };

  pushCandidate(payload);

  if (payload && typeof payload === "object") {
    const source = payload as Record<string, unknown>;
    pushCandidate(source.user);
    pushCandidate(source.profile);
    pushCandidate(source.member);
    pushCandidate(source.data);
    pushCandidate((source.data as Record<string, unknown> | undefined)?.user);
    pushCandidate((source.data as Record<string, unknown> | undefined)?.profile);
    pushCandidate((source.data as Record<string, unknown> | undefined)?.member);
  }

  return candidates.filter(isMeaningfulCandidate);
};

export const extractDashboardPayload = (payload: unknown) => {
  if (!payload || typeof payload !== "object") {
    return payload;
  }

  const response = payload as Record<string, unknown>;
  return response.data ?? payload;
};

export const extractDashboardUser = (payload: unknown) => {
  const dashboardPayload = extractDashboardPayload(payload);

  if (!dashboardPayload || typeof dashboardPayload !== "object") {
    return dashboardPayload;
  }

  const dashboardObject = dashboardPayload as Record<string, unknown>;
  return dashboardObject.user ?? dashboardPayload;
};

export const normalizeUserPayload = (user: unknown) => {
  if (!user) {
    return null;
  }

  const previous = getUser();
  const previousUser = previous && typeof previous === "object" ? (previous as Record<string, unknown>) : {};
  const candidates = collectUserCandidates(user);
  const source = candidates[0] ?? (user as Record<string, unknown>);

  const derivedFullName = normalizeDisplayName(source.name ?? source.full_name ?? source.display_name);
  const derivedFirstName = normalizeDisplayName(source.first_name ?? source.firstName);
  const derivedLastName = normalizeDisplayName(source.last_name ?? source.lastName);

  const nameParts = derivedFullName
    ? derivedFullName.split(/\s+/)
    : [];
  const fallbackFirstName = derivedFirstName || nameParts[0] || "";
  const fallbackLastName = derivedLastName || nameParts.slice(1).join(" ") || "";

  const normalizedFirstName = fallbackFirstName || normalizeDisplayName(previousUser.first_name) || "";
  const normalizedLastName = fallbackLastName || normalizeDisplayName(previousUser.last_name) || "";
  const displayName = [normalizedFirstName, normalizedLastName].filter(Boolean).join(" ").trim();

  const zone = source.zone && typeof source.zone === "object" ? (source.zone as Record<string, unknown>) : null;
  const previousZone = previousUser.zone && typeof previousUser.zone === "object" ? (previousUser.zone as Record<string, unknown>) : null;
  const zoneId = source.zone_id ?? zone?.id ?? previousUser.zone_id ?? null;
  const zoneName = readDisplayValue(
    source,
    ["zone_name", "zoneName", "zone_name", "zone", "zone_name"]
  ) || readDisplayValue(zone ?? previousZone ?? null, ["name", "label", "title"]) || normalizeDisplayName(previousZone?.name);

  const role = readDisplayValue(source, ["role", "role_name", "roleName", "member_role", "memberRole", "user_role", "userRole", "position", "title", "designation"]);
  const normalizedRole = role || normalizeDisplayName((previousUser as Record<string, unknown>).role as string | undefined) || "Member";

  return {
    ...previousUser,
    ...source,
    first_name: normalizedFirstName,
    last_name: normalizedLastName,
    name: normalizeDisplayName(source.name ?? source.full_name ?? source.display_name ?? displayName) || displayName,
    full_name: normalizeDisplayName(source.full_name ?? source.name ?? source.display_name ?? displayName) || displayName,
    zone_id: zoneId ? Number(zoneId) : null,
    zone_name: zoneName || null,
    zone: zoneName ? { id: Number(zoneId ?? 0), name: zoneName } : previousUser.zone || null,
    membership_id: source.membership_id ?? previousUser.membership_id ?? null,
    role: normalizedRole,
    role_name: normalizedRole,
    email: normalizeDisplayName(source.email ?? previousUser.email) || "",
    profile_image: normalizeDisplayName(source.profile_image ?? previousUser.profile_image) || null,
    phone: normalizeDisplayName(source.phone ?? previousUser.phone) || null,
  };
};

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `token=${token}; path=/; max-age=86400`;
};

export const getToken = () => {
  const localToken = localStorage.getItem(TOKEN_KEY);
  if (localToken) {
    return localToken;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() ?? null;
  }

  return null;
};

export const setUser = (user: unknown) => {
  const normalizedUser = normalizeUserPayload(user);

  if (!normalizedUser) {
    return null;
  }

  localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));
  return normalizedUser;
};

export const getUser = () => {
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const isMembershipApproved = (user: unknown) => {
  if (!user || typeof user !== "object") {
    return false;
  }

  const source = user as Record<string, unknown>;
  const rawStatus = String(source.status ?? source.account_status ?? "").toLowerCase();
  const paymentStatus = Number(source.payment_status ?? source.is_paid ?? 0);

  return (
    rawStatus === "approved" ||
    rawStatus === "active" ||
    rawStatus === "paid" ||
    rawStatus === "complete" ||
    paymentStatus > 0 ||
    source.NewMemberNotPaid === false
  );
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
};

export const logout = () => {
  clearAuth();
};

export const isAuthenticated = () => !!getToken();