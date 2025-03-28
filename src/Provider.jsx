import HotelsProvider from './context/HotelContext'
import BookmarkListProvider from './context/BookmarkListContext'

function Provider({children}) {
  return (
   <HotelsProvider>
    <BookmarkListProvider>
        {children}
    </BookmarkListProvider>
   </HotelsProvider>
  )
}

export default Provider