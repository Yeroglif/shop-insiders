import { useState } from "react";
import Modal from "./Modal";

type LayoutProps = {
  children: React.ReactNode;
  setIsShowSaved?: (isShowSaved: boolean) => void;
  setIsAuthorized?: (IsAuthorized: boolean) => void;
  isAuthorized?: boolean;
};

export default function Layout({
  children,
  setIsShowSaved,
  setIsAuthorized,
  isAuthorized,
}: LayoutProps) {
  const [isLogingIn, setIsLoggingIn] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const header = (
    <div>
      {/* Open main window view button */}
      <button
        onClick={() => {
          if (setIsShowSaved) {
            setIsShowSaved(false);
          }
        }}
      >
        <h1 className="text-gradient">Shop-Insiders</h1>
      </button>
      {/* Open saved products window view button */}
      {isAuthorized && (
        <button
          onClick={() => {
            if (setIsShowSaved) {
              setIsShowSaved(true);
              console.log("Show Saved");
            } else {
              console.log("setSHowSaved is undefined");
            }
          }}
        >
          Saved
        </button>
      )}
      {/* Sign up button */}
      {!isAuthorized && (
        <button
          onClick={() => {
            if (setIsShowModal) {
              setIsShowModal(true);
            }
          }}
        >
          Log In
        </button>
      )}
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

  async function LogInUser(userName: string, password: string) {
    if (isLogingIn) {
      return;
    }
    try {
      setIsLoggingIn(true);
      fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: "mor_2314",
          password: "83r5^_",
        }),
      })
        .then((res) => res.json())
        .then((json) => console.log(json));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <div>
      {header}
      {children}
      {/* Log in modal */}
      {isShowModal && <Modal handleCloseModal={()=>{
        setIsShowModal(false)
      }}>
        <h2>Log into your account</h2>
        <input value={userName} placeholder="Enter Username" />
        <input placeholder="Enter Password" />
        </Modal>}
      {footer}
    </div>
  );
}
