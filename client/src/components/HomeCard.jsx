export default function HomeCard({ image, title, description }) {
  return (
    <div className="group bg-sky-50 hover:bg-sky-100 p-8 shadow-md w-1/3 flex flex-col items-center gap-y-5 rounded-xl hover:shadow-2xl">
        <div className="bg-teal-100 group-hover:bg-teal-200 transition h-20 w-20 rounded-full ">
            <img className="h-20 w-20 p-4" src={image} />
        </div>
        <div className="text-center flex flex-col gap-y-3">
            <p className="text-lg font-semibold">{title}</p>
            <p>{description}</p>
        </div>
    </div>
  )
}
