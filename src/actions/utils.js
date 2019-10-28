function getDefaultOptions(method, headers = {}, body = null) {
    return {
      method,
      body,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      }
    }
  }
  
  function fetcher(method, URL, params, headers) {
    if (params) {
      URL = mountURLWithParams(URL, params);
    }
  
    return fetch(URL, getDefaultOptions(method, headers))
      .then(handleErrors)
      .then(res => res.json())
  }
  
  function mountURLWithParams(URL, params) {
    return `${URL}?${new URLSearchParams(params).toString()}`;
  }
  
  export const get = (URL, params, headers) => {
    return fetcher('GET', URL, params, headers);
  };
  
  export const patch = (URL, data, headers) => {
    const body = JSON.stringify(data);
    const patchOptions = {
      body,
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
  
    return fetch(URL, patchOptions)
      .then(handleErrors)
      .then(res => res.json());
  };
  
  export const post = (URL, data, headers) => {
    const body = JSON.stringify(data);
    const patchOptions = {
      body,
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
  
    return fetch(URL, patchOptions)
      .then(handleErrors)
      .then(res => res.json());
  };
  
  const handleErrors = (response) => {
      if (!response.ok) {
        return response.json().then(({ message }) => {
          if (message) {
            throw Error(message);
          }
  
          throw Error('Ocorreu um problema de comunicação. Por favor tente novamente.')
        });
      }
      return response;
  };
  
  export const getAuthorizationHeader = () => {
    const serializedUser = localStorage.getItem('user');
    let authorization = '';
  
    if (serializedUser !== null) {
      authorization = JSON.parse(serializedUser).authToken;
    }
  
    return { Authorization: authorization };
  };
  