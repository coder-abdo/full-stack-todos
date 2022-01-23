import { runInAction, makeAutoObservable } from "mobx";
import { IUser, loginDTO, userDTO } from "../../interfaces";
import { makeLocalStorage } from "../autoSave";
import { config } from "../../config";
export class Auth {
  isAuthenticated!: boolean;
  user: IUser | undefined;
  state!: string;
  message!: string;
  token!: string | null;

  constructor() {
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
    makeAutoObservable(this);
    makeLocalStorage(this, "store", ["isAuthenticated", "token"]);
  }
  async signup(userDTO: userDTO) {
    const requestUser = await fetch(`${config.serverUrl}/auth/register`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDTO),
    });
    try {
      const successUser = await requestUser.json();
      runInAction(() => {
        if (successUser.status >= 400) {
          this.state = "failed";
          this.message = successUser.message;
        } else {
          this.state = "success";
          this.message = successUser.message;
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        this.state = "failed";
        this.message = err.message;
      }
    }
  }
  async login(loginDto: loginDTO) {
    const requestUser = await fetch(`${config.serverUrl}/auth/login`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDto),
    });
    try {
      const successUser = await requestUser.json();
      runInAction(() => {
        if (successUser.status >= 400) {
          this.state = "failed";
          this.message = successUser.message;
        } else {
          this.isAuthenticated = successUser.isAuthenticated;
          this.token = successUser.token;
          localStorage.setItem(
            "authenticated",
            JSON.stringify(this.isAuthenticated)
          );
          localStorage.setItem("token", JSON.stringify(this.token));
          this.message = successUser.message;
          this.state = "success";
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        this.state = "failed";
        this.message = err.message;
      }
    }
  }
  async logout() {
    const sendLogoutRequest = await fetch(`${config.serverUrl}/auth/logout`);
    try {
      const successLogout = await sendLogoutRequest.json();
      runInAction(() => {
        this.isAuthenticated = successLogout.isAuthenticated;
        this.message = successLogout.message;
        this.token = null;
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
      });
    } catch (err) {
      if (err instanceof Error) {
        this.state = "failed";
        this.message = err.message;
      }
    }
  }
  async getUser() {
    const fetchUser = await fetch(`${config.serverUrl}/user`, {
      headers: {
        authorization: "Bearer " + this.token,
      },
    });
    try {
      const successUser = await fetchUser.json();
      runInAction(() => {
        if (successUser.status >= 400) {
          this.state = "failed";
          this.isAuthenticated = false;
          this.message = successUser.message;
        } else {
          this.isAuthenticated = true;
          this.state = "success";
          this.user = successUser.user;
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        this.state = "failed";
        this.message = err.message;
      }
    }
  }
}
