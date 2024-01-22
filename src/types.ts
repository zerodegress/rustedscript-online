export type CompileWorkerInputMessage = {
  type: 'compile'
  src: string
  id: string
}

export type CompileWorkerOutputMessage =
  | {
      type: 'compileSuccess'
      id: string
      dist: string
    }
  | {
      type: 'compileFailed'
      id: string
      err: string
    }
