import { Injectable, signal } from "@angular/core";
import { delay, Observable, of, tap } from "rxjs";

type Token = string | null | undefined;

export interface ILoginDto {
  token: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private currentUserSig = signal<Token>(localStorage.getItem("token") ? localStorage.getItem("token") : undefined);

  private setUser(token: Token): void {
    localStorage.setItem("token", token ? token : "");
    this.currentUserSig.set(token);
  }

  get token() {
    return this.currentUserSig();
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSig();
  }

  public signIn(data: ILoginDto): Observable<ILoginDto> {
    // signing mock
    return of(data).pipe(delay(1000), tap(res => this.setUser(res.token)));

  }

  public signOut(): void {
    // some rxjs blah blah blah
    this.setUser(null);

  }
}

