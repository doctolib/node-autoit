export const enum WindowSetState {
  Hide = 0,
  Show = 5,
  Minimize = 6,
  Maximize = 3,
  Restore = 9,
  Enable = 64,
  Disable = 65,
}

export const enum WindowGetState {
  Failure = 0,
  Exists = 1,
  Visible = 2,
  Enabled = 4,
  Active = 8,
  Minimized = 16,
  Maximized = 32,
}

export interface RectAnchors {
  left: number
  top: number
  right: number
  bottom: number
}

export interface RectSize {
  width: number
  height: number
}

export interface RectPosition extends RectSize {
  x: number
  y: number
}

export interface Functions {
  ClipGet: () => Promise<string>
  ClipPut: (value: string) => Promise<void>
  Send: (keys: string, flag: 0 | 1) => void
  WinExists: (title: string, text: string | null) => number
  WinGetClassList: (title: string, text: string | null, timeout: number) => string
  WinGetPos: (title: string, text: string | null) => RectAnchors
  WinGetTitle: (title: string, text: string | null, magic: 512) => string
  WinGetClientSize: (title: string, text: string | null) => RectAnchors
  WinMenuSelectItem: (
    title: string,
    text: string | null,
    item0: string,
    item1: string,
    item2: string,
    item3: string,
    item4: string,
    item5: string,
    item6: string,
    item7: string,
  ) => number
  WinActivate: (title: string, text: string | null) => number
  WinActive: (title: string, text: string | null) => number
  WinWaitActive: (title: string, text: string | null, timeout: number) => number
  WinWaitNotActive: (title: string, text: string | null, timeout: number) => number
  WinWaitClose: (title: string, text: string | null, timeout: number) => number
  WinSetState: (title: string, text: string | null, flag: WindowSetState) => number
  [name: string]: any
}

const functions: Functions

export default functions