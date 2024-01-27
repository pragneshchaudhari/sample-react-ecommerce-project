const NotFound = () => {
  return <>
    <div className="flex grow flex-row items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-3xl lg:text-9xl text-purple-950">404</h1>
          <span className="font-medium text-gray-550 text-lg">not found</span>
        </div>
      </div>
    </div>
  </>
}

export default NotFound;