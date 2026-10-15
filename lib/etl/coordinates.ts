/** 같은 주소에 대한 유효한 좌표 쌍만 재사용한다. 좌표를 추정해서 보완하지 않는다. */
export function validCoordinates(lat: unknown, lng: unknown): boolean {
 return typeof lat === 'number' && typeof lng === 'number' && Number.isFinite(lat) && Number.isFinite(lng)
  && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
}
export function retainedCoordinates(previous: {address:string;lat:number|null;lng:number|null}|null, address:string) {
 if (previous?.address === address && validCoordinates(previous.lat,previous.lng)) return {lat:previous.lat,lng:previous.lng};
 return {lat:null,lng:null};
}
