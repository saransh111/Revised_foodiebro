export default function No_dish() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Sorry, we don't have any dish for you
          </h1>
          <p className="text-gray-500">Please try searching for something else.</p>
        </div>
      </div>
    );
  }
  