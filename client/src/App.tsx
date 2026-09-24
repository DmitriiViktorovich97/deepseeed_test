import { useState } from 'react'
import './App.css'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const sendMessage = () => {
    const text = input.trim()

    if (!text || isGenerating) {
      return
    }

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: text,
      },
      {
        role: 'assistant',
        content: 'Здесь скоро будет ответ ИИ...',
      },
    ])

    setInput('')
  }

  const stopGeneration = () => {
    setIsGenerating(false)
  }

  return (
      <main className="chat">
        <header className="chat-header">
          <h1>AI Chat</h1>
          <span>OpenRouter</span>
        </header>

        <section className="messages" aria-live="polite">
          {messages.length === 0 && (
              <div className="empty-state">
                <h2>Чем могу помочь?</h2>
                <p>Напишите сообщение, чтобы начать диалог.</p>
              </div>
          )}

          {messages.map((message, index) => (
              <article
                  className={`message ${message.role}`}
                  key={index}
              >
                <div className="message-role">
                  {message.role === 'user' ? 'Вы' : 'AI'}
                </div>

                <div className="message-content">
                  {message.content}
                </div>
              </article>
          ))}
        </section>

        <form
            className="composer"
            onSubmit={(event) => {
              event.preventDefault()
              sendMessage()
            }}
        >
        <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Напишите сообщение..."
            rows={3}
            disabled={isGenerating}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                sendMessage()
              }

              if (event.key === 'Escape' && isGenerating) {
                stopGeneration()
              }
            }}
        />

          <div className="composer-footer">
            <span>Enter — отправить · Shift + Enter — новая строка</span>

            {isGenerating ? (
                <button
                    type="button"
                    onClick={stopGeneration}
                >
                  Stop
                </button>
            ) : (
                <button
                    type="submit"
                    disabled={!input.trim()}
                >
                  Send
                </button>
            )}
          </div>
        </form>
      </main>
  )
}

export default App