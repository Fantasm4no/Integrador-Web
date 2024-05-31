import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Books } from '../../domain/book';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-actualizar-libro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './actualizar-libro.component.html',
  styleUrl: './actualizar-libro.component.scss'
})
export class ActualizarLibroComponent {

  books : any
  id: any

  constructor(private bookService: BooksService, private router: Router){
    this.id = this.bookService.titulo
  }

  ngOnInit(){
    this.bookService.getBooks().then(data => {
      this.books = data.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
    })
  }

  updateBook(book: Books) {
    this.bookService.updateBook(book.id, {
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      portada: book.portada
    }).then(() => {
      console.log('Libro actualizado');
      this.router.navigate(['/eliminar'])
    }).catch(error => {
      console.error('Error actualizando libro: ', error);
    });
  }
}
