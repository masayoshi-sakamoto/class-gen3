export interface I<%= className %>Props {
  id?: string
  title: string | null
}

export default class <%= className %>Entity {
  private _props: I<%= className %>Props

  constructor(props: I<%= className %>Props) {
    this._props = props
  }

  get props(): I<%= className %>Props {
    return this._props
  }

  get clone(): <%= className %>Entity {
    return new <%= className %>Entity(JSON.parse(JSON.stringify(this._props)))
  }

  get id(): string | undefined {
    return this._props.id
  }

  get title(): string | null {
    return this._props.title
  }
}

export const headers = [
  { text: 'ID', value: 'id' },
  { text: 'タイトル', value: 'title' }
]

export const Empty<%= className %>PropsFactory = (props?: Partial<I<%= className %>Props> | null): I<%= className %>Props => ({
  title: null,
  ...props
})

export const Empty<%= className %>EntityFactory = (props?: Partial<I<%= className %>Props> | null): <%= className %>Entity => {
  return new <%= className %>Entity(Empty<%= className %>PropsFactory(props))
}