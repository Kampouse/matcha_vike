/* eslint-disable solid/no-innerhtml */

// Default <head> (can be overridden by pages)

import logoUrl from "../assets/logo.svg";

export default function HeadDefault() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
    </>
  );
}
