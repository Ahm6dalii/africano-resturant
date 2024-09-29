import React from 'react'
import { useSelector } from 'react-redux'

export default function MapLocation() {
  const { translation } = useSelector(state => state.lang)

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-red-500 mb-4 text-center" style={{ fontFamily: "Oswald" }}>
        <i className="fa-solid fa-location-dot pe-4"></i>
        {translation.findUs}
      </h2>
      <div className="w-full h-72 rounded-lg overflow-hidden shadow-inner">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight="0" 
          marginWidth="0" 
          id="gmap_canvas" 
          src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=Africano%20pizza&amp;pasta%20ras%20gharib+(Affricano%20Restaurant)&amp;t=&amp;z=19&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          title="Affricano Restaurant Location"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}