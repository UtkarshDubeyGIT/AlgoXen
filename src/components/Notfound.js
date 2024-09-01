const Notfound = () => {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl text-gray-700">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="mt-6 text-blue-500 hover:underline">Go back to Home</a>
      </div>
    );
  };
  
  export default Notfound;