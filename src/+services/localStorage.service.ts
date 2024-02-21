import { User } from '../shared/models/User.model'

/**
 * Static methods for accessing local storage.
 * These can be considered placeholders.
 * There is no authorization and no security.
 * An unlimited number of users can be stored.
 * The name of the current user is stored using the key `usernameKey`.
 * A serialized object containing the user data is stored with
   the username prefixed by `userPrefix` as the key.
 */
export class LocalStorageService {
  static usernamesKey = '^USERNAMES^' as const
  static usernameKey = '^USERNAME^' as const
  static userPrefix = '^USER^' as const

  static get usernames(): string[] {
    return JSON.parse(
      localStorage.getItem(LocalStorageService.usernamesKey) || '[]'
    )
  }

  static set usernames(usernames: string[]) {
    localStorage.setItem(
      LocalStorageService.usernamesKey,
      JSON.stringify(usernames)
    )
  }

  static get user(): User | null {
    const username: string | null = localStorage.getItem(
      LocalStorageService.usernameKey
    )
    if (!username) return null
    return LocalStorageService.findUser(username)
  }

  static set user(user: User | null) {
    if (user === null) {
      localStorage.setItem(LocalStorageService.usernameKey, '')
    } else {
      localStorage.setItem(LocalStorageService.usernameKey, user.name)
      localStorage.setItem(
        LocalStorageService.userPrefix + user.name,
        JSON.stringify(user)
      )
    }
  }

  static removeUser(username: string): void {
    localStorage.removeItem(LocalStorageService.userPrefix + username)
  }

  static get isLoggedOut(): boolean {
    return !LocalStorageService.user
  }

  static get isLoggedIn(): boolean {
    return !LocalStorageService.isLoggedIn
  }

  static findUser(username: string): User | null {
    let json = localStorage.getItem(LocalStorageService.userPrefix + username)
    return json ? JSON.parse(json) : null
  }
}
