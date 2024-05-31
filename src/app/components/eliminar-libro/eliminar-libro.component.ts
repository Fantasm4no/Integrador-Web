import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-eliminar-libro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './eliminar-libro.component.html',
  styleUrl: './eliminar-libro.component.scss'
})
export class EliminarLibroComponent {

  books : any

  constructor(private bookService: BooksService, private router: Router){}

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

  borrar(bookId: string){
    this.bookService.deleteBooks(bookId).then(()=>{
      console.log('Documento eliminado exitosamente');
      this.router.navigate(['/dashboard'])
    }).catch(error => {
      console.log('Error al eliminar documento:', error);
    });
  }

  actualizar(titulo: string){
    this.router.navigate(['/actualizar'])
    this.bookService.titulo = titulo
  }
}
