type HandleDataHeaderProps = {
    image: string,
    handle: string,
    description: string,
}

const HandleDataHeader = ({ image, handle, description }: HandleDataHeaderProps) => {
  return (
    <div className="relative w-full h-1/2 overflow-hidden rounded-t-lg border">
      {/* Background overlay */}
      <div className="absolute inset-0 z-30 bg-black/35" />
      
      {/* Background image */}
      {image && (
        <img
          src={image}
          alt={handle}
          className="relative z-20 h-[300px] w-full object-cover brightness-60"
        />
      )}
      
      {/* Content overlay */}
      <div className="absolute inset-0 z-40 flex flex-col justify-end p-6 text-white">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold">
              {handle}
            </h2>
            <p className="mt-2 text-sm text-gray-200">
              {description}
            </p>
          </div>
          
          {/* Badge */}
          <span className="rounded-full bg-gray-800/80 px-3 py-1 text-xs font-medium text-gray-200 backdrop-blur-sm">
            Featured
          </span>
        </div>
      </div>
    </div>
  )
}

export default HandleDataHeader