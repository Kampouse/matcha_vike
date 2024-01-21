import { For } from "solid-js";
export const Nav = () => {
  const pages = [
    { name: "swipe", href: "/swipe", current: true },
    { name: "me", href: "/me", current: false },
    { name: "register", href: "/register", current: false },
    { name: "login", href: "/login", current: false },
    { name: "error", href: "/error", current: false },
  ];

  return (
    <nav class="bg-pink-200 text-gray-900 px-4">
      <ul class="flex items-center">
        <For each={pages}>
          {(page) => (
            <li class="py-2 px-4">
              <a href={page.href} class="no-underline hover:underline">
                {page.name}
              </a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
};
