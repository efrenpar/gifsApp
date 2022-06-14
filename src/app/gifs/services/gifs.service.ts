import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey:string = "0uVd372GrDmL6fo7KMaXk6eGHCC3LCz2";
  public url:string = "https://api.giphy.com/v1/gifs";

  public resultados:Gif[]=[];

  get historial(){
    //this._historial = this._historial.splice(0,10);  //funcion que me permite retornar siempre los ultimos 10 elementos
    return [...this._historial];
  }

  constructor(private http:HttpClient){
    this._historial = JSON.parse(localStorage.getItem("historial")!) || []!;
    this.resultados = JSON.parse(localStorage.getItem("ultimosResultados")!) || []!;
  }

  buscarGifs(query:string){

      query = query.trim().toLocaleLowerCase();

      if(!this._historial.includes(query)){
        this._historial.unshift(query); //unshift agrega elementos al inicio
        this._historial = this._historial.splice(0,10); 

        localStorage.setItem('historial',JSON.stringify(this._historial));
      }

      const params = new HttpParams()
            .set('api_key',this.apiKey)
            .set('q',query)
            .set('limit','10')

      this.http.get<SearchGifsResponse>(`${this.url}/search`,{params})
            .subscribe((res)=>{
              console.log(res.data);
              this.resultados = res.data;
              localStorage.setItem('ultimosResultados',JSON.stringify(this.resultados));
            })
   }
}
