import './globals.css'
import SessionContext from './context/SessionContext'
import ToasterContext from './context/ToasterContext'

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className='bg-gray-100 h-full' >
    
        <SessionContext>
         <ToasterContext />
         {children}

        </SessionContext>
        
        
        </body>
    </html>
  )
}
