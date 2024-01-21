import { Headless } from "../components/Layout";
import { registerFormSchema } from "../utils/schemas";
import { Fetch } from "../utils/trpc";
import { Show, createSignal } from "solid-js";
import z from "zod";
import { faker } from "@faker-js/faker";
export default function Register() {
  const [issue, setissue] = createSignal();
  const Validation = (formData: FormData) => {
    const result = registerFormSchema.safeParse(formData);
    if (result.success) {
      return result.data;
    }
    console.log(result);
    return null;
  };
  //onClientSubmit(validatedContent) ? onServerSubmit(validatedContent) : console.log("fall back to error state here") }

  type registerFormSchema = ReturnType<typeof Validation>;
  const registerFN = async (validatedContent: registerFormSchema) => {
    const data = await Fetch("/session/register", {
      method: "POST",
      body: JSON.stringify({
        email: validatedContent.email,
        username: validatedContent.username,
        password: validatedContent.password,
        re_password: validatedContent.re_password,
      }),
      headers: {
        credentials: "include",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",

      },
    });
    const ouput = z
      .object({
        creds: z.object({
          email: z.string().describe("email"),
          username: z.string().describe("username"),
        }),
      })
      .safeParse(data);
    return ouput.success ? ouput.data : null;
  };
  const handleSubmit = async (e: Event) => {
    const form = e.target as HTMLFormElement;
    e.preventDefault();

    const formData = new FormData(form);
    console.log(formData);
    const validatedContent = Validation(formData);
    if (validatedContent === null || validatedContent === undefined) {
      console.log("error state");
      return null;
    }

    const data = await registerFN(validatedContent);
    if (data === null) {
      setissue(false);
      return null;
    }
    setissue(true);
  };
  const mockFn = (name: string) => {
    const field = {
      email: faker.internet.email({ lastName: "Martel" }),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    } as { [key: string]: string };
    return field[name];
  };
  const pass = "hello!itsMeMAYa" + "!123";

  return (
    <Headless>
      <div
        class=" flex flex-col items-center justify-center 
       border border-1 border-gray-900 rounded-lg  my-[100px] p-[2em]"
      >
        <Show when={issue() === false}>
          <h1> your request as been denied</h1>
        </Show>
        <Show when={issue() === true}>
          <h1> your request as succesfull</h1>
        </Show>
        <h1> Register to platform hugging</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div
            class={
              "flex flex-col items-center justify-center    w-96 h-[25rem] border-1  "
            }
          >
            <div class="flex flex-col items-center justify-center    w-96 h-[25rem] border-1  ">
              <input
                name="email"
                type="text"
                placeholder="email"
                value={mockFn("email")}
                class="bg-transparent border border-1 border-gray-900 text-center text-slate-50"
              />
              <input
                name="username"
                type="text"
                placeholder="username"
                value={mockFn("username")}
                class="bg-transparent border border-1 border-gray-900 text-center text-slate-50"
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                value={pass}
                class="bg-transparent border border-1 border-gray-900 text-slate-50 text-center"
              />
              <input
                name="re_password"
                type="password"
                placeholder="retype password"
                value={pass}
                class="bg-transparent border border-1 border-gray-900 text-slate-50 text-center"
              />
              <button class="mt-6" type="submit">
                {" "}
                submit{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Headless>
  );
}
