import { Component } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	students = {};
	studentBtn = 'Add';
	selectedStudent = [{'id':'','name':'','desc':''}];
	private api_base_url: string = 'http://localhost:3000';
	constructor(private _http: Http){}

	ngOnInit(): void {
		 this._http.get('http://localhost:3000/app')
		.subscribe(
		(data) => 
		{
			this.students = data.json()
		  console.log(data);
		});
	}

	getStudent(id:string){
		this._http.get('http://localhost:3000/api/student/'+id)
		.subscribe(
		(data) => 
		{
			this.selectedStudent = data.json();
			this.studentBtn = 'Save';
			console.log(data);
		}, (err) => {
          console.log(err);
        });
	}

	deleteStudent(id:string){
		this._http.delete('http://localhost:3000/api/student/'+id)
		.subscribe(
		(data) => 
		{
			this.students = data.json();
			console.log(data);
		}, (err) => {
          console.log(err);
        });
	}

	saveStudent(id:string){
		this.studentBtn = 'Saving...';
		if(id == ""){
			this._http.post('http://localhost:3000/api/student/add',this.selectedStudent[0])
			.subscribe(
			(data) => 
			{
				this.students = data.json();
				this.selectedStudent = [{'id':'','name':'','desc':''}];
				this.studentBtn = 'Add';
			}, (err) => {
	          console.log(err);
	        });
		}else{
			this._http.post('http://localhost:3000/api/student/save',this.selectedStudent[0])
			.subscribe(
			(data) => 
			{
				this.selectedStudent = [{'id':'','name':'','desc':''}];
				this.studentBtn = 'Add';
				this.students = data.json();
				
			}, (err) => {
	          console.log(err);
	        });
        }
        
	}
}
