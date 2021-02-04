import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  getGoogle = () => {
    this.httpClient.get('http://localhost:8080/api/google').subscribe(res => {
      console.log(res);
    });
  }

  getLbryVersionWithCurl = () => {
    this.httpClient.get('http://localhost:8080/api/lbry/curl/version').subscribe(res => {
      console.log(res);
    });
  }

  getLbryVersionWithHttp = () => {
    this.httpClient.get('http://localhost:8080/api/lbry/http/version').subscribe(res => {
      console.log(res);
    });
  }

  getAccountListWithCurl = () => {
    this.httpClient.get('http://localhost:8080/api/lbry/curl/accountList').subscribe(res => {
      console.log(res);
    });
  }

  getChannelListWithCurl= () => {
    this.httpClient.get('http://localhost:8080/api/lbry/curl/channelList').subscribe(res => {
      console.log(res);
    });
  }
}
