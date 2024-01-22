import { compile } from 'rustedscript'
import { CompileWorkerInputMessage, CompileWorkerOutputMessage } from './types'

onmessage = (e: MessageEvent<CompileWorkerInputMessage>) => {
  switch (e.data.type) {
    case 'compile': {
      try {
        postMessage({
          type: 'compileSuccess',
          id: e.data.id,
          dist: compile(e.data.src),
        } as CompileWorkerOutputMessage)
      } catch (err) {
        if (err instanceof Error) {
          postMessage({
            type: 'compileFailed',
            id: e.data.id,
            err: err.message,
          } as CompileWorkerOutputMessage)
        } else {
          postMessage({
            type: 'compileFailed',
            id: e.data.id,
            err: '',
          } as CompileWorkerOutputMessage)
        }
      }
    }
  }
}
