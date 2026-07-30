import defaultUsers from '../data/users.json'

export interface UserAccount {
  username: string
  password: string
  displayName: string
  role: 'admin' | 'user'
  enabled: boolean
}

const USERS_KEY = 'blog_users'
const AUTH_COOKIE = 'blog_auth'

/** 从 localStorage 获取用户列表，首次访问时用默认数据初始化 */
export function getUsers(): UserAccount[] {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
    return [...defaultUsers] as UserAccount[]
  }
  return JSON.parse(raw)
}

/** 保存用户列表到 localStorage */
export function saveUsers(users: UserAccount[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

/** 设置 cookie */
function setCookie(name: string, value: string, days = 7) {
  const d = new Date()
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + d.toUTCString() + ';path=/'
}

/** 读取 cookie */
function getCookie(name: string): string | null {
  const pairs = document.cookie.split(';')
  for (const pair of pairs) {
    const [k, v] = pair.trim().split('=')
    if (k === name) return decodeURIComponent(v)
  }
  return null
}

/** 删除 cookie */
function deleteCookie(name: string) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
}

/** 登录验证，成功返回用户对象，失败返回 null */
export function login(username: string, password: string): UserAccount | null {
  const users = getUsers()
  const user = users.find(u => u.username === username && u.password === password)
  if (!user || !user.enabled) return null
  setCookie(AUTH_COOKIE, username)
  return user
}

/** 登出 */
export function logout() {
  deleteCookie(AUTH_COOKIE)
}

/** 获取当前登录用户 */
export function getCurrentUser(): UserAccount | null {
  const username = getCookie(AUTH_COOKIE)
  if (!username) return null
  const users = getUsers()
  const user = users.find(u => u.username === username)
  if (!user || !user.enabled) {
    deleteCookie(AUTH_COOKIE)
    return null
  }
  return user
}

/** 是否已登录 */
export function isLoggedIn(): boolean {
  return getCurrentUser() !== null
}

/** 是否管理员 */
export function isAdmin(): boolean {
  const user = getCurrentUser()
  return user?.role === 'admin'
}

/** 修改密码 */
export function changePassword(username: string, oldPwd: string, newPwd: string): boolean {
  const users = getUsers()
  const user = users.find(u => u.username === username)
  if (!user || user.password !== oldPwd) return false
  user.password = newPwd
  saveUsers(users)
  return true
}

/** 管理员：更新用户 */
export function adminUpdateUser(username: string, updates: Partial<Pick<UserAccount, 'password' | 'displayName' | 'enabled'>>) {
  const users = getUsers()
  const user = users.find(u => u.username === username)
  if (!user) return false
  Object.assign(user, updates)
  saveUsers(users)
  return true
}

/** 管理员：添加用户 */
export function adminAddUser(user: UserAccount): boolean {
  const users = getUsers()
  if (users.some(u => u.username === user.username)) return false
  users.push(user)
  saveUsers(users)
  return true
}

/** 管理员：删除用户 */
export function adminDeleteUser(username: string): boolean {
  const users = getUsers()
  const idx = users.findIndex(u => u.username === username)
  if (idx === -1 || users[idx].role === 'admin') return false
  users.splice(idx, 1)
  saveUsers(users)
  return true
}
