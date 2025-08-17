const Header = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Species Assembly Summaries
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Explore genome assemblies and chromosome data from the Ensembl database.
        Select a species to view detailed chromosome information
      </p>
    </div>
  );
};

export default Header;
