import { Injectable } from '@angular/core';
import { GoogleAuthProvider,  } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { QuerySnapshot, addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { Users } from '../domain/user';

export interface User {
  id: string;
  nombre: string;
  apellido: string
  role: string
  editing?: boolean
  email: string;
  password: string
  phone: string
  biography: string
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  
  email: any
  pswd : any

  constructor(private afAuth: AngularFireAuth, private router: Router, private authfirebase: AngularFireAuth, private firestore: Firestore, private afs: AngularFirestore) { }

  registrarConGoogle(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then((result)=>{
      this.email = result.user?.email
      console.log('Iniciar sesión con Google exitoso:', result);
      this.router.navigate(['/dashboard'])
    }).catch((error) => {
      console.error('Error Inicio de sesión con Google:', error);
    });
  }

  addUsers(user: Users) {
    return addDoc(collection(this.firestore, 'usuarios'), Object.assign({}, user));
  }

  getUserss(){
    return getDocs(query(collection(this.firestore, 'usuarios')))
  }

  deleteUsers(userId: string){
    return deleteDoc(doc(this.firestore, 'usuarios', userId))
  }

  updateUsers(id: string, data: any){
    const userDoc = doc(this.firestore, `usuarios/${id}`);
    return updateDoc(userDoc, data);
  }

  getUsers(): Observable<User[]> {
    const userCollection = collection(this.firestore, 'usuarios');
    return from(getDocs(query(userCollection))).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        return querySnapshot.docs.map(doc => {
          const data = doc.data() as User;
          data.id = doc.id;
          return data;
        });
      })
    );
  }

  updateUserDetails(uid: string, user: User): Promise<void> {
    const userDoc = doc(this.firestore, `${'usuarios'}/${uid}`);
    return updateDoc(userDoc, { ...user });
  }
}
