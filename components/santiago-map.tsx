'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'

const icon = (selected:boolean, image:string) => L.divIcon({className:'custom-marker-wrap', html:`<div class="custom-marker ${selected?'selected':''}"><img src="${image}" alt=""/></div>`, iconSize:[46,46], iconAnchor:[23,23]})
const center:[number,number]=[-33.4372,-70.6506]
function MapEffects({selected,places}:{selected:any;places:any[]}){const map=useMap(); useEffect(()=>{if(selected)map.flyTo(selected.coords,14,{duration:.8}); else if(places.length>1)map.fitBounds(places.map(p=>p.coords),{padding:[28,28]})},[selected,places,map]); return null}
export default function SantiagoMap({places,selected,dark,onSelect,route}:{places:any[];selected:any;dark:boolean;onSelect:(p:any)=>void;route:boolean}){const line=route&&places.length>1?places.map(p=>p.coords):[]; return <div className="real-map"><MapContainer center={center} zoom={13} zoomControl={false} scrollWheelZoom doubleClickZoom className="leaflet-map"><TileLayer attribution="© OpenStreetMap contributors" url={dark?'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png':'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}/><MapEffects selected={selected} places={places}/>{line.length>1&&<Polyline positions={line} pathOptions={{color:'#D9622B',weight:5,opacity:.85,dashArray:'10 8'}}/>}{places.map((p,i)=><Marker key={p.id} position={p.coords} icon={icon(selected?.id===p.id,p.img)} eventHandlers={{click:()=>onSelect(p)}}><Popup><b>{i+1}. {p.name}</b><br/>★ {p.rating}</Popup></Marker>)}</MapContainer><div className="map-attribution">© OpenStreetMap contributors · OpenStreetMap</div></div>}
