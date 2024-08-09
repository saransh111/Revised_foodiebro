export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">THIS IS FOOTER</p>
          <p className="text-xs mt-2">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  