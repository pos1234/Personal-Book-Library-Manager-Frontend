import Image from 'next/image'
import { Pencil, Star, X} from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"
import EditBook from './EditBook'
import DeleteBook from './DeleteBook'
interface BookCardProps {
    bookData:{
        id?:number;
        createdAt?:string;
        updateAt?:string;
        ISBN?:string
        coverId?:number;
        key?:string;
        title: string
        author: string
        notes: string
        rating: number
        isRead: boolean
    }
    userData?:any
}

export default function BookCard({ bookData ,userData}: BookCardProps) {
    const {title, author, notes, rating, isRead,coverId} = bookData
    const imageUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`

  return (
    <div className="w-full p-5 md:w-1/2 xl:w-1/3 2xl:w-1/4 cursor-pointer">
<ContextMenu>
      <ContextMenuTrigger >
      <Card className="flex flex-col w-full">
      <div className="h-[200px] relative">
        <Image
          src={imageUrl}
          alt={`Cover of ${title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className=" p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-sm text-muted-foreground mb-2">by {author}</p>
          <p className="text-sm mb-4">{notes}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <Badge variant={isRead ? "default" : "secondary"}>
            {isRead ? "Read" : "Unread"}
          </Badge>
        </div>
        <div className='flex justify-between pt-5'>
            <EditBook 
            formData={bookData} userData={userData} triggerButton={<Pencil size={15} fill="silver"/>}/>
            <DeleteBook id={bookData?.id} userData={userData} triggerButton={<X size={17} />}/>
        </div>
      </div>
    </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-fit">
        <ContextMenuItem inset>
          Back
        </ContextMenuItem>
        <ContextMenuItem inset>
        <EditBook 
            formData={bookData} userData={userData} triggerButton={<p>Edit</p>}/>
        </ContextMenuItem>
        <ContextMenuItem inset>
        <DeleteBook id={bookData?.id} userData={userData} triggerButton={<p>Remove</p>}/>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
    </div>
  )
}