interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default functin Card({ title= "Card Title", description = "Card Subtitle", children}: CardProps){

  return (
    <div className="bg-white dark:bg-zinc-900 border-zinc-200 dark: border-zinc-800 border rounded-lg shadow-sm p-6">
      <h3 className="text-md font-semibold mb-2">{ title }</h3>
      <p className="mb-6">{ description }</p>
      <div className="space-y-6">
        { children }
      </div>
    </div>
  );
};
