import React from 'react'
import { useSelector } from 'react-redux'

export default function MapLocation() {
    const { translation } = useSelector(state => state.lang)

  return (



    <div className="mt-12">
    <h2 className="text-3xl font-bold  text-red-500 mb-4 text-center" style={{"fontFamily":" Oswald"}}>
    <i className="fa-solid fa-location-dot pe-4"></i>
    {translation.findUs }
    </h2>
    <div className="w-full h-72 rounded-lg overflow-hidden shadow-inner">
    <iframe width="100%" height="246" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=555&amp;height=246&amp;hl=en&amp;q=Africano%20pizza&amp;pasta%20ras%20gharib+(Affricano%20Restaurant)&amp;t=&amp;z=19&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='https://www.acadoo.de/fachrichtungen/ghostwriter-medizin/'>Abschluss Medizin Ghostwriter</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=1375af41786d56d7af676694311977dcd537450d'></script>
    </div>
</div>

  )
}

<div style={{width: '100%'}}>
    <iframe width="100%" loading="lazy" allowFullScreen="full" title="Affricano Restaurant" height={300} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=100%25&height=100&hl=en&q=Africano%20pizza+(%D8%A7%D9%81%D8%B1%D9%8A%D9%83%D8%A7%D9%86%D9%88)&t=&z=19&ie=UTF8&iwloc=B&output=embed">&lt;a href="https://www.gps.ie/"&gt;gps tracker sport&lt;/a&gt;</iframe>
 </div>

