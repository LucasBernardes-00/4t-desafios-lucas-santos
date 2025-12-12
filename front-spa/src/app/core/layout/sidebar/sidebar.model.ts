export type MenuType = ((InMenuOption | InMenuTab))[]

export interface InMenuTab {
  id: number
  name: string
  options: InMenuOption[]
  isOpen: boolean
  isTab: true
}

export interface InMenuOption {
  id: number
  name: string
  isTab: false
}
