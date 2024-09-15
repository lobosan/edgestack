export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-10 mt-8">
      <div className="container mx-auto text-center">
        <p>Powered by EdgeStack</p>
        <p>MIT License - {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
