import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  myContactForm: FormGroup;
  @Input() contacts: Contact[] = [];
  constructor(private contactService: ContactService, 
    private router: Router) { }

  ngOnInit(): void {
    this.myContactForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'jobtitle': new FormControl(null, Validators.required),
      'company': new FormControl(null, Validators.required)
    })
  }

  submitAddContactForm() {
    this.contactService.addContact(this.myContactForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.contacts.push(res);
          this.router.navigate(['/contactApp'])
        },
        (err) => console.log(err)
      );
  }

}
