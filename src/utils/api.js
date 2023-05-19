export class Api {
    constructor({baseUrl, headers}) {
      this._headers = headers;
      this._baseUrl =baseUrl;
    }

    /** проверить ответ */
    _checkResponse(res){
      if(res.ok || res.success){
        return res.json().then(res=> res)
      }else{
        return Promise.reject(res)
      }
    }

    /** получить настройки аккаунта */
    getSettings(idInstance, apiTokenInstance){
      const endpoint = `/waInstance${idInstance}/GetSettings/${apiTokenInstance}`
      return fetch(`${this._baseUrl}${endpoint}`, {
        headers: this._headers
      })
      .then(this._checkResponse)
    }

    /** отправить текстовое сообщение */
    sendMessage(idInstance, apiTokenInstance, chatId, message){
      const endpoint = `/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
      return fetch(`${this._baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          "chatId": chatId,
          "message": message
        })
      })
      .then(this._checkResponse)
    }

    /** получить текстовое сообщение */
    receiveNotification(idInstance, apiTokenInstance){
      const endpoint = `/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;
      return fetch(`${this._baseUrl}${endpoint}`, {
        headers: this._headers,
      })
      .then(this._checkResponse)
    }

    /** удалить в очереди полученное текстовое сообщение */
    deleteNotification(idInstance, apiTokenInstance, receiptId){
      const endpoint = `/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`;
      return fetch(`${this._baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse)
    }

  };

  const api = new Api({
    baseUrl: 'https://api.green-api.com',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export default api;
