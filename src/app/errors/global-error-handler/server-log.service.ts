import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ServerLog } from './server-log';

const URL = environment.logURL;

@Injectable({
  providedIn: 'root'
})
export class ServerLogService {

  constructor(private http : HttpClient) { }

  log(serverLog: ServerLog) {
    return this.http.post(URL+'/infra/log', serverLog);
  }
}
