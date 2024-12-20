import React from 'react'
import {Link} from '@inertiajs/react';

export default function Pagination({links}) {
  return (
    links.length > 0 && (
        <div className="flex items-center justify-between mt-4">
            <div>
                {links.map((link,index)=>(
                    <Link 
                    key={index}
                    href={link.url}
                    className={link.active ? 'bg-blue-400 px-4 py-2 mx-1 border text-white rounded-lg' : 'bg-white px-4 py-2 mx-1 border hover:bg-blue-400 hover:text-white rounded-lg'}
                    dangerouslySetInnerHTML={{__html: link.label}}
                    />
                      
                ))}
            </div>
        </div>
    )
  )
}
