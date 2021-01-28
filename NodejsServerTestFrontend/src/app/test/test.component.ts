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
}
