export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} Your Brand. Alla rättigheter förbehållna.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Facebook
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Twitter
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 