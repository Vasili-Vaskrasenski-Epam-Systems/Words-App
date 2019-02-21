import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
})
export class WordsComponent {
  private  words: WordModel[];
  private baseUrl: string;

  ngOnInit() {
    this.http.get<WordModel[]>(this.baseUrl + 'api/Words/GetWords').subscribe(result => {
      this.words = result;
    }, error => console.error(error));
  }


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }
}
