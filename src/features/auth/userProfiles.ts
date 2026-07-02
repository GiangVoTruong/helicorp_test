export type StoredUserProfile = {
  username: string
  email: string
  phone: string
}

const PROFILES_KEY = 'technexus-user-profiles'

function readAllProfiles(): Record<string, StoredUserProfile> {
  try {
    const raw = localStorage.getItem(PROFILES_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, StoredUserProfile>
  } catch {
    return {}
  }
}

export function saveUserProfile(profile: StoredUserProfile) {
  const profiles = readAllProfiles()
  profiles[profile.username] = profile
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
}

export function getUserProfile(username: string): StoredUserProfile | null {
  return readAllProfiles()[username] ?? null
}
