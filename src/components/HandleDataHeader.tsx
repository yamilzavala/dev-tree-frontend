type HandleDataHeaderProps = {
    image: string,
    handle: string,
    description: string,
}


  const HandleDataHeader = ({ image, handle, description }: HandleDataHeaderProps) => {
  return (
    <div className="rounded-b-3xl px-8 py-10 flex items-center gap-6">

      {image && (
        <img
          src={image}
          alt={handle}
          className="w-32 h-32 rounded-full object-cover"
        />
      )}

      <div className="flex flex-col text-start">
        <h2 className="text-3xl font-bold text-gray-900">
          {handle}
        </h2>
        <p className="text-md text-gray-500">
          {description}
        </p>
        <span className="mt-2 text-gray-600 text-sm">
          website.com
        </span>
      </div>

    </div>
  )
}


export default HandleDataHeader