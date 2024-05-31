import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { UsersService } from '../../services/users.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AutecticationService } from '../../services/autectication.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  books: any[] = [];
  searchForm: FormGroup;
  isAdmin = false;
  booksFromApi: any[] = [];
  showSearchResults: boolean = false;
  isSearchPerformed: boolean = false;
  usuario: any;

  constructor(private router: Router, private bookService: BooksService, private fb: FormBuilder,
    private userService: UsersService, private autetication: AutecticationService, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
      this.usuario = this.userService.email;
      this.searchForm = this.fb.group({
        query: ['']
      });
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.afs.doc<any>(`usuarios/${user.uid}`).valueChanges().subscribe(userData => {
          this.isAdmin = userData && userData.role === 'admin'; // Establece la bandera isAdmin según el rol del usuario
        });
      } else {
        this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión si no está autenticado
      }
    });

    this.bookService.getBooks().then(data => {
      this.books = data.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
    });

    this.bookService.getBooksFromOpenLibrary().subscribe((data: any) => {
      this.booksFromApi = data.works.map((work: any) => {
        return {
          title: work.title,
          authors: work.authors?.map((author: any) => author.name),
          edition_count: work.edition_count,
          cover_i: work.cover_i,
          image_url: `https://covers.openlibrary.org/b/id/${work.cover_i}-L.jpg` // Construir la URL de la imagen
        };
      });
    });
  }

  onSearch() {
    const query = this.searchForm.value.query;
    this.bookService.searchBooks(query).subscribe((data: any) => {
      this.books = data.docs;
      this.isSearchPerformed = true;
      this.showSearchResults = true;
    });
  }

  getCoverUrl(cover_i: number) {
    return cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : 'default-cover.jpg';
  }

  logout() {
    this.autetication.logout();
  }
}
