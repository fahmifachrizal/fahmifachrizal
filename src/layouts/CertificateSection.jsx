import React from 'react'
import { useSelector } from 'react-redux'

function CertificateSection() {
  const { certificates } = useSelector((state)=>state.uxReducer)
  return (
    <div className="my-20 w-full px-56">
        <h1 className='text-white text-4xl font-bold mb-10'>Certificates</h1>
        <div className='w-full flex flex-col gap-y-4 font-raleway'>
          {
            certificates.map((cert)=>(
              <div className='text-white text-xl' key={cert.id}>
                <div>
                  <div className='flex items-center justify-between'>
                    <p className='font-semibold'>{cert.name}</p>
                    <p className='italic'>Issued on {(new Date(cert.date)).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
                  </div>
                  <div className='flex items-center justify-between italic text-lg font-light'>
                    <p className=''>Certificate: <a href={cert.link} alt={cert.name} target='_blank' className='underline'>{(cert.number).toUpperCase()}</a></p>
                    <p>{cert.expiration?(new Date(cert.expiration)).toLocaleDateString("en-US", { year: "numeric", month: "long" }):'No Expiration Date'}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
  )
}

export default CertificateSection