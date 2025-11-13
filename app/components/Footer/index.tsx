import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800"
      style={{
        minHeight: '20px',  // hauteur minimum plus petite
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
      }}
    >
      <div className="w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-between p-2">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025 Frankenbike. Tout droits réservés.
        </span>
        <ul className="flex flex-wrap items-center mt-1 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link href="#" className="hover:underline me-4 md:me-6">
              Mentions Légales
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
