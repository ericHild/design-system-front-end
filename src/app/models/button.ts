export interface LayoutProperties {
  width: string,
  height: string,
  padding: string,
  borderRadius: string
}

export interface PrimaryProperties {
  color: string,
  backgroundColor: string
}

export interface SecondaryProperties {
  color: string,
  backgroundColor: string,
  borderColor: string
}

export interface ButtonProperties {
  layout: LayoutProperties[],
  primary: PrimaryProperties[],
  secondary: SecondaryProperties[]
}

export interface Button {
  data: Array<ButtonProperties>
}
