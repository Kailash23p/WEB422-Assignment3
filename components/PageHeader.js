function PageHeader({ text, subtext }) {
  return (
    <header className="mb-4">
      <h1 className="display-5 fw-semibold">{text}</h1>
      {subtext && <p className="text-muted lead mb-0">{subtext}</p>}
      <hr />
    </header>
  );
}

export default PageHeader;
