import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit{
 
  @Input() totalPages!:[];
  @Input() currentPage!:number;

  @Output() change = new EventEmitter();
  
  ngOnInit(): void {
  }

  changePage(page:number){
    if (page !== 0 && page <= this.totalPages.length) {
      const pageFinal = page.toString();
      this.change.emit(pageFinal)
    } else {
      console.log("Página no válida");
    }
  }

  
}
