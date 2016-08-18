var Url = require("modules/Url.js");

class Route {
  constructor(baseUrl) {
    this.baseUrl = `${baseUrl}/`;
  }
  fetchPost(url, data) {
    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };
    if(arguments.length == 1) {
      return fetch(url, options).then(res => res.json());
    }
    options.body = JSON.stringify(data);
    return fetch(url, options).then(res => res.json());
  }
  fetchDelete(url, data) {
    var options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };
    if(arguments.length == 1) {
      return fetch(url, options).then(res => res.json());
    }
    options.body = JSON.stringify(data);
    return fetch(url, options).then(res => res.json());
  }
  post(url, data) {
    if(arguments.length == 1) {
      return this.fetchPost(this.baseUrl + url);
    }

    return this.fetchPost(this.baseUrl + url, data);
  }
  create(model, data) {
    return this.fetchPost(this.baseUrl + model + '/create', data);
  }
  findOne(model, id) {
    return this.fetchPost(this.baseUrl + model + '/find/' + id);
  }
  find(model, data) {
    var findUrl = '/find/';
    if(arguments.length == 1) {
      return this.fetchPost(this.baseUrl + model + findUrl);
    }

    return this.fetchPost(this.baseUrl + model + findUrl, data);
  }
  update(model, data, id) {
    if(arguments.length == 2){
      return this.fetchPost(this.baseUrl + model + '/update', data);
    }
    return this.fetchPost(this.baseUrl + model + '/update/' + id, data);
  }
  updateId(model, id,data) {
    return this.fetchPost(this.baseUrl + model + '/update/' + id, data);
  }
  addTo(model, id, association, fk) {
    // /:model/:id/:association/:fk
    return this.fetchPost(`${this.baseUrl}${model}/${id}/${association}/${fk}`);
  }
  delete(model, id, data) {
    if(arguments.length == 2) {
      return this.fetchPost(this.baseUrl + model + '/delete/' + id);
    }

    return this.fetchPost(this.baseUrl + model + '/delete/' + id, data);
  }
  deleteFrom(model, id, association, fk) {
    // /:model/:id/:association/:fk
    return this.fetchDelete(`${this.baseUrl}${model}/${id}/${association}/${fk}`);
  }
}

function chooseUrl(routeType){
  //XXX: Find a way to remove .com
  var domain = window.location.hostname.match(/(http(s)?:\/\/)?(www\.)?(.+)(\.com)?/);
  switch(domain[4]){
    case "localhost":
      return Url[`${routeType}Stable`];
    case `corner-${routeType.toLowerCase()}-dev.herokuapp.com`:
      return Url[`${routeType}Stable`];
    case `corner-${routeType.toLowerCase()}-prod.herokuapp.com`:
      return Url[`${routeType}Stable`];
    case `corner-${routeType.toLowerCase()}-demo.herokuapp.com`:
      return Url[`${routeType}Demo`];
    default:
      return Url[`${routeType}Stable`];
  }
}

var Api = module.exports = {
  server: new Route(""),
  baseUrl: window.location.port == '8080' ? 'https://localhost:1337' : 'https://corner-prod.herokuapp.com',
}
