import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  myContactForm: FormGroup;
  contactId: any;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.myContactForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'jobtitle': new FormControl(null, Validators.required),
      'company': new FormControl(null, Validators.required)
    })
    this.contactId = this.route.snapshot.paramMap.get('id')
    this.getContact(this.contactId);
  }

  getContact(id): void {
    this.contactService.getContact(id)
      .subscribe(
        (contact: Contact) => {
          console.log(contact);
          this.myContactForm.get('name').setValue(contact.name);
          this.myContactForm.get('email').setValue(contact.email);
          this.myContactForm.get('phone').setValue(contact.phone);
          this.myContactForm.get('jobtitle').setValue(contact.jobtitle);
          this.myContactForm.get('company').setValue(contact.company);
          this.myContactForm.updateValueAndValidity();
        },
        error => {
          console.log(error);
        });
  }

  submitUpdateContactForm() {
    this.contactService.updateContact(this.contactId, this.myContactForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/contactApp'])
        },
        (err) => console.log(err)
      );
  }

}
