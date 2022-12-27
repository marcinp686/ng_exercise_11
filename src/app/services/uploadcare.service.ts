import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UploadcareResponse } from '../models/uploadcareResponse.model';

@Injectable({
  providedIn: 'root'
})
export class UploadcareService {

  constructor(private http: HttpClient) { }

  uploadProductImage(file: File) : Observable<UploadcareResponse> {
    
    const body : FormData = new FormData();
    body.append('UPLOADCARE_PUB_KEY', '785756c320c263dda2c7');
    body.append(file.name, file);
    
    return this.http.post<Record<string, string>>('https://upload.uploadcare.com/base/', body).pipe( 
      map( x=> { return {filename: Object.keys(x).pop()!, hash: Object.values(x).pop()!} }
        
  ) )

  }
}

