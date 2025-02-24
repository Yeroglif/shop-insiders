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
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const header = (
    <div className="flex flex-row justify-between">
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
            } else {
              console.log("setSHowSaved is undefined");
            }
          }}
        >
          Saved
        </button>
      )}
      {/* Log in button */}
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

  async function LogInUser(userName: string, userPassword: string) {
    if (isLogingIn) {
      return;
    }
    try {
      setIsLoggingIn(true);
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        body: JSON.stringify({"username" : "mor_2314",
          "password" : "83r5^_"}),
      });
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      // const tokenData = await response.json();
      // console.log(tokenData);
      if (setIsAuthorized && setIsShowModal) {
        setIsAuthorized(true);
        setIsShowModal(false)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {header}
      {children}
      {/* Log in modal */}
      {isShowModal && (
        <Modal
          handleCloseModal={() => {
            setIsShowModal(false);
          }}
        >
          <h2>Log into your account</h2>
          <input
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={username}
            placeholder="Enter Username"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Enter Password"
          />
          <button
            onClick={() => {
              LogInUser(username, password);
            }}
          >
            Log In
          </button>
        </Modal>
      )}
      {footer}
    </div>
  );
}
