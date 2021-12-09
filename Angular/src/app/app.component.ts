import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  id:string = "";
  tasks: any[] = [];
  taskDetail: any = {};
  newTask: any = {title: "", description: "", completed:false};
  taskEdit:any={ title:"", description:"", completed: false};

  constructor(private _httpService: HttpService){}
  
  ngOnInit(){
  }

  getTasksFromService(){
        this._httpService.getTasks()
        .subscribe((data:any)=>{
          this.tasks = data;          
        });
  }

  getTasksByID(event:any):void{
      event.preventDefault();
      let id = event.target.id.value;
      this._httpService.getTaskbyId(id)
      .subscribe((data:any)=>{
        this.taskDetail = data;        
      });  
  }

  delete(event:any):void{
    this.id = event.target.id.value;
    this._httpService.deleteTaskbyID(this.id)
    .subscribe((data:any) =>{ 
      this.getTasksFromService();
    });
  }

  edit(event:any):void{
    this.id = event.target.id.value;
    this._httpService.editTask(this.id, this.taskEdit)
    .subscribe((data:any) =>{
      console.log("this is the ID to change", this.id, "this is this is the change", this.taskEdit);
      location.reload();
    });
  }

  onSubmit( event: any ): void {
    this._httpService.addTask(this.newTask)
    .subscribe((data:any) =>{
      this.getTasksFromService();
    });
  }
}