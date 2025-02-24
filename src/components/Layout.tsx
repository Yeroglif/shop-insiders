type LayoutProps = {
  children: React.ReactNode;
  setIsShowSaved?: (isShowSaved: boolean) => void;
};

export default function Layout({ children, setIsShowSaved }: LayoutProps) {
  const header = (
    <div>
      <button onClick={()=>{
        if (setIsShowSaved) {
          setIsShowSaved(false);
        }
      }}>
        <h1 className="text-gradient">Shop-Insiders</h1>
      </button>
      <button
        onClick={() => {
          if (setIsShowSaved) {
            setIsShowSaved(true);
            console.log('Show Saved')
          }else {
            console.log('setSHowSaved is undefined')
          }
        }}
      >
        Saved
      </button>
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
