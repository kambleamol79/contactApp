import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contact = new Contact();
  contacts: Contact[] = [];
  isUpdating = false;
  title = "";
  constructor(private contactService: ContactService,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchContacts();
  }

  fetchContacts() {
    this.contactService.getContacts().subscribe(res => {
      this.title = "Contact Details";
      this.contacts = res.contacts;
    },
      err => {
        console.log(err)
      }
    )
  }

  enableUpdating(contact: Contact): void {
    this.isUpdating = true;
    this.title = "Contact Update";
    this.contact = contact;
  }

  cancelUpdating(): void {
    this.isUpdating = false;
    this.contact = new Contact();
    this.fetchContacts();
  }

  deleteContact(contact: Contact) {
    if (window.confirm('Are you sure you want to permanently delete this contact?')) {
      this.contactService.deleteContact(contact).subscribe(
        () => {
          this.contacts = this.contacts.filter(elem => elem._id !== contact._id);
        },
        err => console.log(err)
      );
    }
  }

}

