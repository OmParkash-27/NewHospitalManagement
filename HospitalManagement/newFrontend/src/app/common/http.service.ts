import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  serverUrl = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) { }

  getRequest(api: string) {
    return this.http.get(this.serverUrl + api);
  }

  getRequestById(api: string, id: string) {
    return this.http.get(this.serverUrl + api + "/" + id);
  }


  postRequest(form: any, api: string) {
    return this.http.post(this.serverUrl + api, form);
  }

  putRequest(form: any, api: string, id: string) {
    return this.http.put(this.serverUrl + api + "/" + id, form);
  }

  deleteRequest(api: string, id: string) {
    return this.http.delete(this.serverUrl + api + "/" + id);
  }
}
