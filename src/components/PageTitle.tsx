interface PageTitleProps {
  title: string;
}

function PageTitle({ title }: PageTitleProps) {
  return (
    <section>
      <h1 className="text-5xl font-bold py-10">{title}</h1>
    </section>
  );
}

export default PageTitle; 