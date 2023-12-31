export interface IWidget {
    path: string
    config: {
        name: string
        description: string
        author: string
        preview: string
        window: {
          width: string
          height: string
          entryFile: string
        }
    }
}