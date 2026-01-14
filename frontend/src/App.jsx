import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import viteLogo from '/vite.svg'
import './App.css'

const API_URL = 'http://34.68.91.195:3000' //reemplazaremos esto con la ip de la vm

function App(){
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    setError(null)
    setShortUrl(null)

    try {
      const response = await axios.post(`${API_URL}/acortador`, {
        longUrl : url
      })
      setShortUrl(response.data.shortUrl);
    }

    catch(err){
      console.error(err)
      setError('Error al conectar con el servidor')
    }
    finally{
      setLoading (false)
    }
  }
  return (
    <div className="container">
      <div className="card">
        <h1>Acortador de URLs</h1>
        <p>Pega tu enlace largo y hazlo pequeño</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="https://ejemplo.com/articulo-muy-largo"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Acortando...' : 'Acortar URL'}
          </button>
        </form>
  
        {error && <div className="error">{error}</div>}
  
        {shortUrl && (
          <div className="result">
            <p>¡Listo! Aquí tienes tu enlace:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <button onClick={() => navigator.clipboard.writeText(shortUrl)} className="copy-btn">
              Copiar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


export default App
