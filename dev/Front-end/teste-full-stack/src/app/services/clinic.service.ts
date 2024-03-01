import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Clinic } from "../models/clinic.model";

@Injectable({
    providedIn: 'root'
})
export class ClinicService {
    constructor(private http: HttpClient) { }

    list(): Observable<Clinic[]> {
        return this.http.get<Clinic[]>(`${environment.api}/clinics/`)
    }

    find(id: number): Observable<Clinic> {
        return this.http.get<Clinic>(`${environment.api}/clinics/${id}`);
    }

    save(clinic: Clinic): Observable<number> {
        return this.http.post<number>(`${environment.api}/clinics/`, clinic);
    }


    update(id: number, clinic: Clinic): Observable<number> {
        return this.http.put<number>(`${environment.api}/clinics/${id}`, clinic);
    }

    remove(id: number): Observable<Clinic> {
        return this.http.delete<Clinic>(`${environment.api}/clinics/${id}`)
    }
}