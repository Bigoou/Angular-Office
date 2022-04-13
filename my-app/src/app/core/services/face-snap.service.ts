import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {FaceSnap} from '../models/face-snap.model'

@Injectable({
    providedIn: 'root'
})

export class FaceSnapsService {

    constructor(private http: HttpClient) {}


    getAllFaceSnap() : Observable<FaceSnap[]> {
        return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
        }

        addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
            return this.getAllFaceSnap().pipe(
                 map(facesnaps => [...facesnaps].sort((a,b) => a.id - b.id)),
                 map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
                 map(previousFacesnap => ({
                    ...formValue,
                    snaps: 0,
                    createdDate: new Date(),
                    id: previousFacesnap.id + 1
                })),
                switchMap(newFacesnap => this.http.post<FaceSnap>(
                    'http://localhost:3000/facesnaps',
                    newFacesnap)
                )
            );
          }

    getFaceSnapById (faceSnapId: number): Observable<FaceSnap> {
        return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
        
    }

    snapFaceSnapById (faceSnapId: number, snapType : 'snap' | 'unsnap'): Observable<FaceSnap> {
      return this.getFaceSnapById(faceSnapId).pipe(
          map(faceSnap => ({
              ...faceSnap,
              snaps : faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
          })),
          switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap))
      ) 
    }

    unSnapFaceSnapById (faceSnapId: number): void {
        const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
        if (faceSnap) {
            faceSnap.snaps--;
            faceSnap.buttonText = 'Voter';
            faceSnap.snapped = false;
        } else {
            throw new Error ('FaceSnap not found')
        }
    }

    faceSnaps : FaceSnap[] = [
        {
            id: 1,
            title:'Archibald',
            description: 'Mon meilleur ami depuis tout petit !',
            createdDate : new Date(),
            snaps : 64000000.25,
            imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
            snapped :false,
            buttonText: 'Voter',
            location: 'Au sommet du mont Everest'
          },
      
          {
            id: 2,
            title: 'Jason',
            description: 'Quel filou, celui-là alors !',
            createdDate : new Date(),
            snaps : 0,
            imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
            snapped : false,
            buttonText: 'Voter',
            
          },
      
          {
            id: 3,
            title: 'Tony',
            description: 'Un brigand en herbe ! ^^ !',
            createdDate : new Date(),
            snaps : 0,
            imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
            snapped : false,
            buttonText: 'Voter'
            
          }
    ];
}