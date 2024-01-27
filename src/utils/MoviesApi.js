class MoviesApi {
  constructor ({ url, headers }) {
    this._url = url

    this._headers = headers
  }

  _getResponse (res) {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(new Error(`${res.status}`))
  }

  getAllMovies () {
    return fetch(this._url, {
      headers: this._headers
    }).then(this._getResponse)
  }
}

const movieApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default movieApi
