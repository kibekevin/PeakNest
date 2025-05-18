import React from 'react'

const About = () => {
  return (
    <div className='max-w-6xl mx-auto mt-10 md:mt-20 lg:mt-20 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
      <h1 className='text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-8 lg:mb-12 text-slate-800'>
        About PeakNest
      </h1>
      <p className='text-slate-600 mb-4 md:mb-8 lg:mb-12'>
        PeakNest is a real estate platform that allows you to find your next home.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
        <div className='bg-white shadow-md rounded-lg p-4'>
          <h2 className='text-lg font-bold mb-2 text-slate-800'>Our Mission</h2>
          <p className='text-slate-600'>
            Our mission is to provide a seamless and efficient platform for buying and selling properties.
          </p>
        </div>
        <div className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-lg font-bold mb-2 text-slate-800'>Our Vision</h2>
            <p className='text-slate-600'>
                Our vision is to make the process of buying and selling properties easier and more efficient.
            </p>
        </div>
        <div className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-lg font-bold mb-2 text-slate-800'>Our Team</h2>
            <p className='text-slate-600'>
                Our team is made up of experienced professionals who are dedicated to providing the best possible service to our clients.
            </p>
        </div>
        <div className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-lg font-bold mb-2 text-slate-800'>Our Values</h2>
            <p className='text-slate-600'>
                Our values are integrity, professionalism, and customer satisfaction.
            </p>
        </div>
      </div>
    </div>
  )
}

export default About
