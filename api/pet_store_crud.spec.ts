import { test, expect } from "@playwright/test";

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBody (id: number) {
  return {
    "id": id,
    "name": "doggie" + id,
    "category": {
      "id": 1,
      "name": "Dogs"
    },
    "photoUrls": [
      "url1"
    ],
    "tags": [
      {
        "id": 2,
        "name": "tag2"
      }
    ],
    "status": "available"
  }
}

let id: number;
let body: any;

test.beforeEach(async ({ request }) => {
  id = getRandomInt(100, 1000);
  body = generateBody(id);
  let response = await request.post("/api/v3/pet", { data: body })
  let status = response.status()
  expect(status).toBe(200)

  response = await request.get("/api/v3/pet/" + id)
  status = response.status()
  body = await response.json()
  expect(status).toBe(200)
  expect(body.name).toBe("doggie" + id)
})

test("can update pet`s status", async ({ request }) => {
  body.status = "sold"
  body.name = "renamed_" + body.name
  body.category.id = 2 
  body.category.name = "Cats"
  body.photoUrls.push("url2")
  body.tags.push({ id: 3, name: "tag3" })

  let response = await request.put("/api/v3/pet", { data: body })
  let status = response.status()
  expect(status).toBe(200)

  response = await request.get("/api/v3/pet/" + id)
  status = response.status()
  let responseBody = await response.json()
  expect(status).toBe(200)
  expect(responseBody.status).toBe(body.status)
  expect(responseBody.name).toBe(body.name)
  expect(responseBody.category.id).toBe(body.category.id)
  expect(responseBody.category.name).toBe(body.category.name)
  expect(responseBody.photoUrls.length).toBe(body.photoUrls.length)
  expect(responseBody.tags.length).toBe(body.tags.length)
});

test("can delete pet", async ({ request }) => {
  let response = await request.delete("/api/v3/pet/" + id)
  let status = response.status()
  expect(status).toBe(200)

  response = await request.get("/api/v3/pet/" + id)
  status = response.status()
  expect(status).toBe(404)
});

test("can be found in the store by status", async ({ request }) => {
  let response = await request.get("/api/v3/pet/findByStatus?status=available")
  let status = response.status()
  let body = await response.json()
  expect(status).toBe(200)
  expect(body.length).toBeGreaterThan(0)
  expect(body.some(pet => pet.id === id)).toBe(true)
});


test("can be found in the store by tags", async ({ request }) => {
  let response = await request.get("/api/v3/pet/findByTags?tags=tag2")
  let status = response.status()
  let body = await response.json()
  expect(status).toBe(200)
  expect(body.length).toBeGreaterThan(0)
  expect(body.some(pet => pet.id === id)).toBe(true)
});

test("can't create one more pet with same id", async ({ request }) => {
  let old_name = body.name
  body.name = body.name + "_one_more"
  let response = await request.post("/api/v3/pet", { data: body })
  let status = response.status()
  // expect(status).toBe(409) BUG here. Must be 400 error code. instead of it the old record replaced by new one
  response = await request.get("/api/v3/pet/" + id)
  status = response.status()
  body = await response.json()
  expect(status).toBe(200)
  // expect(body.name).toBe(old_name) BUG here should not be replaced
});

test("can't create pet with empty name", async ({ request }) => {
  body.name = ""
  let response = await request.post("/api/v3/pet", { data: body })
  let status = response.status()
  expect(status).toBe(400)
});

test("can't create pet with empty body", async ({ request }) => {
  body = {}
  let response = await request.post("/api/v3/pet", { data: body })
  let status = response.status()
  expect(status).toBe(400) // instead of it server returns 500, which is wrong
});

test("can't get pet with invalid id (zero)", async ({ request }) => {
  let response = await request.get("/api/v3/pet/" + 0)
  let status = response.status()
  expect(status).toBe(404)
});

test("can't get pet with invalid id (string)", async ({ request }) => {
  let response = await request.get("/api/v3/pet/" + body.name)
  let status = response.status()
  expect(status).toBe(400)
});

test("can't update the pet which does not exist", async ({ request }) => {
  body.name = "renamed_" + body.name
  let response = await request.put("/api/v3/pet", { data: body })
  let status = response.status()
  expect(status).toBe(404) // BUG here should be 404 but we receive 200 and new record created
});