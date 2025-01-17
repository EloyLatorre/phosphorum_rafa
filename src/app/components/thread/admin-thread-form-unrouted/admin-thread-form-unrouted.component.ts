import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IThread, formOperation } from 'src/app/model/model.interfaces';

@Component({
  selector: 'app-admin-thread-form',
  templateUrl: './admin-thread-form.component.html',
  styleUrls: ['./admin-thread-form.component.css']
})
export class AdminThreadFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  threadForm!: FormGroup;
  oThread: IThread = {} as IThread;
  status: HttpErrorResponse | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private oHttpClient: HttpClient,
    private router: Router,
    private oMatSnackBar: MatSnackBar
  ) {
    this.initializeForm(this.oThread);
  }

  initializeForm(oThread: IThread) {
    this.threadForm = this.formBuilder.group({
      id: [oThread.id],
      title: [oThread.title, [Validators.required, Validators.minLength(1), Validators.maxLength(2048)]],
     id_user: [oThread.user.id]

    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oHttpClient.get<IThread>("http://localhost:8083/thread/" + this.id).subscribe({
        next: (data: IThread) => {
          this.oThread = data;
          this.initializeForm(this.oThread);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error reading user from server.", '', { duration: 1200 });
        }
      })
    } else {
      this.initializeForm(this.oThread);
    }
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.threadForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.threadForm.valid) {
      if (this.operation === 'NEW') {
        this.oHttpClient.post<IThread>('http://localhost:8083/thread', this.threadForm.value).subscribe({
          next: (data: IThread) => {
            this.oThread = data;
            this.initializeForm(this.oThread);
            this.oMatSnackBar.open('Thread has been created.', '', { duration: 1200 });
            this.router.navigate(['/admin', 'thread', 'view', this.oThread.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Failed to create thread.', '', { duration: 1200 });
          }
        });
      } else {
        this.oHttpClient.put<IThread>('http://localhost:8083/thread', this.threadForm.value).subscribe({
          next: (data: IThread) => {
            this.oThread = data;
            this.initializeForm(this.oThread);
            this.oMatSnackBar.open('Thread has been updated.', '', { duration: 1200 });
            this.router.navigate(['/admin', 'thread', 'view', this.oThread.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Failed to update thread.', '', { duration: 1200 });
          }
        });
      }
    }
  }
}
