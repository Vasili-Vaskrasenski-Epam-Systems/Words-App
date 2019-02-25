import { Component, OnInit } from '@angular/core';
import { IrregularVerbModel } from './irregular-verb.model';
import { IrregularVerbsService } from './irregular-verbs.service';

@Component({
  selector: 'app-irregular-verbs',
  templateUrl: './irregular-verbs.component.html',


})
export class IrregularVerbsComponent implements OnInit {
  private irregularVerbs : Array<IrregularVerbModel>;

  constructor(public irregularVerbsService: IrregularVerbsService) {

  }
  
  ngOnInit(): void {
    this.irregularVerbsService.getIrregularVerbs().subscribe(result => {
      this.irregularVerbs = result;
    }, error => console.error(error));
  }
}
