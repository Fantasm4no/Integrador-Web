import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Books } from '../../domain/book';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir-libro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './anadir-libro.component.html',
  styleUrl: './anadir-libro.component.scss'
})
export class AnadirLibroComponent {

  book: Books = new Books()

  constructor(private bookService: BooksService, private router: Router){}

  anadir(){
    this.bookService.addBooks(this.book)
    this.router.navigate(['/eliminar'])
  }

}
