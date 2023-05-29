import { WebStorage } from "./WebStorage";

/** This class provides typed access to a particular domain's session storage. */
export class SessionStorage extends WebStorage {
    protected readonly store = window.sessionStorage;
}
