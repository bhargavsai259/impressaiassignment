import { http, HttpResponse } from "msw";
import initiateDB from "../db/initDB";

const { addUser, getUsers, editUser, deleteUser } = initiateDB();

export const handlers = [
  http.get("http://localhost:3000/users", async () => {
    const users = await getUsers();
    return HttpResponse.json(users);
  }),

  http.post("http://localhost:3000/user", async ({ request }) => {
    const newUser = await request.json();
    if (!newUser.name || !newUser.email) {
      return HttpResponse.json({
        success: false,
        message: "Name and email are required",
      });
    }
    const resp = await addUser(newUser);
    return HttpResponse.json(resp);
  }),

  http.put("http://localhost:3000/user/:id", async ({ params, request }) => {
    const { id } = params;
    const newData = await request.json();
    if (!id) {
      return HttpResponse.json({ success: false, message: "Id is required" });
    }
    if (!newData.name || !newData.email) {
      return HttpResponse.json({
        success: false,
        message: "Name and email are required",
      });
    }
    const resp = await editUser(id, newData);
    return HttpResponse.json(resp);
  }),

  http.patch("http://localhost:3000/user/:id", async ({ params, request }) => {
    const { id } = params;
    const newData = await request.json();
    if (!id) {
      return HttpResponse.json({ success: false, message: "Id is required" });
    }
    const users = await getUsers();
    const existingUser = users.find(user => user.id === parseInt(id));
    if (!existingUser) {
      return HttpResponse.json({ success: false, message: "User not found" });
    }
    const updatedUser = { ...existingUser, ...newData };
    const resp = await editUser(id, updatedUser);
    return HttpResponse.json(resp);
  }),

  http.delete("http://localhost:3000/user/:id", async ({ params }) => {
    const { id } = params;
    if (!id) {
      return HttpResponse.json({ success: false, message: "Id is required" });
    }
    const resp = await deleteUser(id);
    return HttpResponse.json(resp);
  }),
];
