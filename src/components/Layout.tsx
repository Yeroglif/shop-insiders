export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;

  const header = (
    <div>
      <h1 className="text-gradient">Shop-Insiders</h1>
    </div>
  );

  const footer = (
    <div>
      <p>
        Site is made by{" "}
        <a target="_blank" href="">
          Yeroglif
        </a>
      </p>
    </div>
  );

  return (
    <div>
      {header}
      {children}
      {footer}
    </div>
  );
}
