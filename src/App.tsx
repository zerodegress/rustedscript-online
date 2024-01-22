import { createMemo, createSignal } from 'solid-js'
import './App.css'
import { compile } from 'rustedscript'

export function App() {
  const [src, setSrc] = createSignal(`@type('number') let a
fn test() {
  a = a + 1
  __asm_code('debugMessage', 'Hello World')
  if a > 1 {
    a = a - 1
  } else if a < 1 {
    a = a + 1
  } else {
    a = a * 2
  }
}`)
  const [err, setErr] = createSignal('')
  const dist = createMemo(() => {
    try {
      const dist = compile(src())
      setErr('')
      return dist
    } catch (e) {
      if (e instanceof Error) {
        setErr(e.message)
      } else {
        setErr('未知错误')
      }
    }
  })

  return (
    <div
      style={{
        width: '100%',
        'min-height': '100vh',
        display: 'flex',
        'flex-direction': 'column',
      }}
    >
      <div>
        <span
          style={{
            'font-size': '30px',
            'font-weight': 'bold',
          }}
        >
          RustedScript 在线编译
        </span>
      </div>
      <div style={{ margin: '5px' }}>
        <div>相关链接：</div>
        <div>
          项目仓库：
          <a href='https://github.com/zerodegress/rustedscript'>
            https://github.com/zerodegress/rustedscript
          </a>
        </div>
        <div>
          Wiki文档：
          <a href='https://github.com/zerodegress/rustedscript/wiki'>
            https://github.com/zerodegress/rustedscript/wiki
          </a>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          'flex-direction': 'row',
          'justify-content': 'center',
        }}
      >
        <div>
          <span>RustedScript</span>
          <textarea
            rows={50}
            cols={50}
            style={{
              display: 'block',
              margin: '5px',
              resize: 'none',
            }}
            value={src()}
            onInput={e => {
              setSrc(e.currentTarget.value)
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            'align-items': 'center',
          }}
        >
          <button
            onClick={() => {
              const distt = dist()
              if (distt) {
                navigator.clipboard.writeText(distt)
              }
            }}
          >
            复制rwini
          </button>
        </div>
        <div>
          <div>rwini</div>
          <div
            style={{
              color: 'red',
            }}
          >
            {err()}
          </div>
          <textarea
            rows={50}
            cols={50}
            style={{
              display: 'block',
              margin: '5px',
              resize: 'none',
            }}
            value={dist()}
          />
        </div>
      </div>
    </div>
  )
}

export default App
