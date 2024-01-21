import { setResponseStatus } from "h3";
import { createRouter, eventHandler, setCookie } from "h3";
import z from "zod";
import { readZodBody } from "../modules/utils";
import { ValidateUser, createUser, deleteAccount, isExistingUser } from "../modules/sessions";

const SessionsRouter = createRouter({});

SessionsRouter.get(
  "/logout",
  eventHandler(async () => {

    return { session: "login" };
  }),
);

SessionsRouter.post(
  "/register",
  eventHandler(async (event) => {
    const register_schema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      re_password: z.string().min(8),
      username: z.string().min(3),
    })
    const body = await readZodBody(event, register_schema);
    if (body.success) {
      const isExisting = await isExistingUser(body.data?.email, body.data?.username);
      if (isExisting == true) {
        setResponseStatus(event, 401);
        return { payload: { success: false, data: "exisisting credentials" } };
      }

      if (isExisting == false) {
        if (body.success) {
          // destructre the content of the body
          createUser({
            email: body.data.email,
            username: body.data.username,
            password: body.data.password,
          })
        }

        const valid = await createUser({
          email: body.data.email,
          username: body.data.username,
          password: body.data.password,
        });

        if (valid) {
          setCookie(event, "session", "session", { httpOnly: true });
          const crafted = { username: body.data.username, email: body.data.email }
          return { payload: { success: true, data: crafted } };
        }
        else {
          setResponseStatus(event, 401);
          return { payload: { success: false, data: null } };
        }
      }
    }
    setResponseStatus(event, 401);
    return { payload: { success: false, data: body } };
  }),
);


SessionsRouter.post(
  "/login",
  eventHandler(async (event) => {
    const login = z.object({ email: z.string(), password: z.string() });

    const validated_body = await readZodBody(event, login);


    if (validated_body.success) {
      const valid = await ValidateUser(validated_body.data.email, validated_body.data.password);
      if (valid) {
        // #TODO make this work with cookies
        setCookie(event, "session", "hello", { httpOnly: true });
        return { payload: { success: true, data: valid } };
      } else {
        setResponseStatus(event, 401);
        return { payload: { success: false, data: valid } };
      }
    }
    setResponseStatus(event, 401);
    return { payload: validated_body };
  }),
);
SessionsRouter.post("/delete", eventHandler(async (event) => {
  const delete_schema = z.object({ email: z.string().email() });
  const body = await readZodBody(event, delete_schema);
  if (body.success) {
    const valid = await deleteAccount(body.data.email);
    if (valid) {
      return { payload: { success: true, data: valid } };
    }
    else {
      setResponseStatus(event, 401);
      return { payload: { success: false, data: null } };
    }
  }
}));
SessionsRouter.get(
  "/session",
  eventHandler(() => {
    return { session: "sesh" };
  }),
);

export default SessionsRouter;
