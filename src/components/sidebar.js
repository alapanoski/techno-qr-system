export default function Sidebar() {
  return (
    <div className="h-full overflow-x-hidden md:w-72 p-4 flex flex-col items-start gap-10 bg-gray-300">
      <div>
        <h1 className="m-2 w-full text-3xl font-bold tracking-wider">
          Technopreneur
        </h1>
      </div>
      <ul className="ml-8 w-full flex flex-col justify-evenly items-start gap-6 tracking-wide">
        <li className="w-full hover:cursor-pointer">Home</li>
        <li className="w-full hover:cursor-pointer">Check In</li>
        <li className="w-full hover:cursor-pointer">Food</li>
        <li className="w-full hover:cursor-pointer">Add Points</li>
      </ul>
    </div>
  )
}
