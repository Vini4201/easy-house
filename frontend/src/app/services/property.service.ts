import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseURL = 'http://localhost:8080/easyhouse/properties';

  constructor(private httpClient: HttpClient) { }

  getPropertiesList(): Observable<Property[]> {
    return this.httpClient.get<Property[]>(this.baseURL);
  }

    //method to send form data
    addProperty(property: Property): Observable<Object> {
      return this.httpClient.post(`${this.baseURL}`, property);
    }

      //method to get property by id
  getPropertyById(id: number): Observable<Property>{
    return this.httpClient.get<Property>(`${this.baseURL}/${id}`);
  }

  //method to update property
  updateProperty(id: number, property: Property): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, property);
    }

    //method to delete property
    deleteProperty(id: number): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

    getPropertiesBySellerId(sellerId: number): Observable<Property[]> {
      return this.httpClient.get<Property[]>(`${this.baseURL}/seller/${sellerId}`);
    }

    // for property approve
    approveProperty(id: number): Observable<any> {
      return this.httpClient.put(`${this.baseURL}/${id}/approve`, {});
    }
  
    // for property approve
    rejectProperty(id: number): Observable<any> {
      return this.httpClient.put(`${this.baseURL}/${id}/reject`, {});
    }

}