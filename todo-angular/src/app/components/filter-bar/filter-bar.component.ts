import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  filterForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      priority: new FormControl(0),
      label: new FormControl(0),
      status: new FormControl(0)
    })
  }

  onSubmit() {
    console.log(this.filterForm.value);
  }

}
