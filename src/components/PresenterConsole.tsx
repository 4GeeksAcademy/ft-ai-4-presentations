import { useCallback, useState } from 'react'
import { listLectures } from '../lectures'
import {
  buildMasterLink,
  buildStudentLink,
  fetchMultiplexToken,
  isLocalPresenterHost,
  type MultiplexToken,
} from '../multiplex/resolve'
import './PresenterConsole.css'

type CopyState = 'idle' | 'copied' | 'error'

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Local-only presenter helper: mint a session token, copy the Pages student link,
 * open the local master deck. Never mounts useful UI on github.io.
 */
export function PresenterConsole() {
  const lectures = listLectures()
  const [lectureId, setLectureId] = useState(lectures[0]?.id ?? 'welcome')
  const [token, setToken] = useState<MultiplexToken | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const [manualSecret, setManualSecret] = useState('')
  const [manualSocketId, setManualSocketId] = useState('')

  const local = isLocalPresenterHost()

  const studentLink = token
    ? buildStudentLink({ lectureId, socketId: token.socketId })
    : ''
  const masterLink = token
    ? buildMasterLink({
        lectureId,
        socketId: token.socketId,
        secret: token.secret,
      })
    : ''

  const startSession = useCallback(async () => {
    setBusy(true)
    setError(null)
    setCopyState('idle')
    try {
      const next = await fetchMultiplexToken()
      setToken(next)
      setManualSecret(next.secret)
      setManualSocketId(next.socketId)
    } catch (err) {
      setToken(null)
      setError(
        err instanceof Error
          ? `${err.message}. You can paste a token from the relay manually.`
          : 'Token fetch failed.',
      )
    } finally {
      setBusy(false)
    }
  }, [])

  const applyManual = useCallback(() => {
    const secret = manualSecret.trim()
    const socketId = manualSocketId.trim()
    if (!secret || !socketId) {
      setError('Both secret and socketId are required.')
      return
    }
    setError(null)
    setToken({ secret, socketId })
    setCopyState('idle')
  }, [manualSecret, manualSocketId])

  const onCopyStudent = useCallback(async () => {
    if (!studentLink) return
    const ok = await copyText(studentLink)
    setCopyState(ok ? 'copied' : 'error')
  }, [studentLink])

  if (!local) {
    return (
      <main className="presenter">
        <p className="presenter__blocked">
          Presenter tools only run on localhost. Use{' '}
          <code>npm run dev</code> on your machine.
        </p>
        <p>
          <a href={import.meta.env.BASE_URL}>Back to course home</a>
        </p>
      </main>
    )
  }

  return (
    <main className="presenter">
      <header className="presenter__header">
        <p className="presenter__eyebrow">Local only</p>
        <h1>Presenter session</h1>
        <p className="presenter__lede">
          Create a live session, copy the student link for Pages, then open the
          master deck here. The secret never goes to github.io.
        </p>
      </header>

      <label className="presenter__field">
        <span>Lecture</span>
        <select
          value={lectureId}
          onChange={(e) => {
            setLectureId(e.target.value)
            setCopyState('idle')
          }}
        >
          {lectures.map((lecture) => (
            <option key={lecture.id} value={lecture.id}>
              {lecture.title}
            </option>
          ))}
        </select>
      </label>

      <div className="presenter__actions">
        <button type="button" onClick={() => void startSession()} disabled={busy}>
          {busy ? 'Requesting token…' : 'New session token'}
        </button>
        <a
          className="presenter__ghost"
          href={`${import.meta.env.BASE_URL}`}
        >
          Course home
        </a>
      </div>

      {error ? <p className="presenter__error">{error}</p> : null}

      <details className="presenter__manual">
        <summary>Paste token manually</summary>
        <p className="presenter__hint">
          From{' '}
          <a
            href="https://multiplex.up.railway.app/token"
            target="_blank"
            rel="noreferrer"
          >
            multiplex.up.railway.app/token
          </a>
        </p>
        <label className="presenter__field">
          <span>socketId → id</span>
          <input
            value={manualSocketId}
            onChange={(e) => setManualSocketId(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        <label className="presenter__field">
          <span>secret</span>
          <input
            value={manualSecret}
            onChange={(e) => setManualSecret(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        <button type="button" onClick={applyManual}>
          Use pasted token
        </button>
      </details>

      {token ? (
        <section className="presenter__session">
          <h2>Student link</h2>
          <p className="presenter__hint">No secret — safe to share.</p>
          <textarea
            className="presenter__link"
            readOnly
            rows={3}
            value={studentLink}
          />
          <div className="presenter__actions">
            <button type="button" onClick={() => void onCopyStudent()}>
              {copyState === 'copied'
                ? 'Copied'
                : copyState === 'error'
                  ? 'Copy failed'
                  : 'Copy student link'}
            </button>
            <a className="presenter__primary" href={masterLink}>
              Open master deck
            </a>
          </div>
        </section>
      ) : null}
    </main>
  )
}
