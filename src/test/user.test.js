import supertest from "supertest";
import { app } from "../application/app.js";
import utils from "./testUtils.js"

describe("post users/register",() => {
    afterEach(async () => {
       await utils.removeTestUser()
    })
    it("should can register",async () => {
        const result = await supertest(app)
            .post("/users/register")
            .send({
                "name" : "habil",
                "email" : "aabiljr@gmail.com",
                "password" : "habil",
                "role" : "admin",
                "key" : "habil nih guys"
            })

        expect(result.status).toBe(201)
        expect(result.body.data.name).toBe("habil")
        expect(result.body.data.email).toBe("aabiljr@gmail.com")
        expect(result.body.data.role).toBe("admin")
    })

    it("should can register if role is empty",async () => {
        const result = await supertest(app)
            .post("/users/register")
            .send({
                "name" : "habil",
                "email" : "aabiljr@gmail.com",
                "password" : "habil"
            })

        expect(result.status).toBe(201)
        expect(result.body.data.name).toBe("habil")
        expect(result.body.data.email).toBe("aabiljr@gmail.com")
        expect(result.body.data.role).toBe("regular")
    })

    it("should can reject if request is invalid",async () => {
        const result = await supertest(app)
            .post("/users/register")
            .send({
                "name" : "",
                "email" : "aabiljr@gmail.com",
                "password" : "habil"
            })
        expect(result.status).toBe(400)
    })
})

describe("post users/login",() => {
    beforeEach(async () => {
        await utils.createTestUser()
    })
    afterEach(async () => {
       await utils.removeTestUserRegular()
    })

    it("should can login", async () => {
        const result = await supertest(app)
            .post("/users/login")
            .send({
                "email" : "aabiljrRegular@gmail.com",
                "password" : "habil"
            })
            
        expect(result.status).toBe(200)
    })
    it("should reject if email wrong", async () => {
        const result = await supertest(app)
            .post("/users/login")
            .send({
                "email" : "aabiljrRegular@gmail.com",
                "password" : "salah"
            })
        expect(result.status).toBe(400)
    })
    it("should reject if password wrong", async () => {
        const result = await supertest(app)
            .post("/users/login")
            .send({
                "email" : "salah@gmail.com",
                "password" : "habil"
            })
        expect(result.status).toBe(400)
    })
})

describe("post users/refresh",() => {
    beforeEach(async () => {
        await utils.createTestUser()
        await supertest(app)
        .post("/users/login")
        .send({
            "email" : "aabiljrRegular@gmail.com",
            "password" : "habil"
        })
    })
    afterEach(async () => {
       await utils.removeTestUserRegular()
    })

    it("should can refresh token", async () => {
        const userTest = await utils.findRegularUser()
        const result = await supertest(app)
            .post("/users/refresh")
            .set("Authorization",`Bearer ${userTest.refresh_token}`)
    
        expect(result.status).toBe(200)
    })
    it("should reject if token is invalid", async () => {
        const userTest = await utils.findRegularUser()
        const result = await supertest(app)
            .post("/users/refresh")
            .set("Authorization",`Bearer ${userTest.refresh_token}dff`)
        expect(result.status).toBe(401)
    })
})

describe("get users/:identify",() => {
    beforeEach(async () => {
        await utils.createTestUserAdmin()
        await supertest(app)
        .post("/users/login")
        .send({
            "email" : "aabiljr@gmail.com",
            "password" : "habil"
        })
    })
    afterEach(async () => {
       await utils.removeTestUser()
    })

    it("should can get users", async () => {
        const userTest = await utils.findUser()
        const result = await supertest(app)
            .get("/users/haqi@gmail.com")
            .set("Authorization",`Bearer ${userTest.token}`)
            
        expect(result.status).toBe(200)
    })

    it("should reject if token is not valid", async () => {
        const userTest = await utils.findUser()
        const result = await supertest(app)
            .get("/users/haqi@gmail.com")
            .set("Authorization",`Bearer ${userTest.token}salah`)
        expect(result.status).toBe(403)
    })
    it("should reject if user is not found", async () => {
        const userTest = await utils.findUser()
        const result = await supertest(app)
            .get("/users/found")
            .set("Authorization",`Bearer ${userTest.token}`)
        expect(result.status).toBe(404)
    })
  
})

describe("get users",() => {
    beforeEach(async () => {
        await utils.createTestUserAdmin()
        await supertest(app)
        .post("/users/login")
        .send({
            "email" : "aabiljr@gmail.com",
            "password" : "habil"
        })
    })
    afterEach(async () => {
       await utils.removeTestUser()
    })

    it("should can get users", async () => {
        const userTest = await utils.findUser()
        const result = await supertest(app)
            .get("/users")
            .set("Authorization",`Bearer ${userTest.token}`)
            
        expect(result.status).toBe(200)
    })

    it("should reject if token is not valid", async () => {
        const userTest = await utils.findUser()
        const result = await supertest(app)
            .get("/users")
            .set("Authorization",`Bearer ${userTest.token}salah`)
        expect(result.status).toBe(403)
    })
  
})

describe("post users/logout/:identify",() => {
    beforeEach(async () => {
        await utils.createTestUserAdmin()
        await supertest(app)
        .post("/users/login")
        .send({
            "email" : "aabiljr@gmail.com",
            "password" : "habil"
        })
    })
    afterEach(async () => {
       await utils.removeTestUser()
    })

    it("should can get users", async () => {
        const userTest = await utils.findUser()
        const result = await supertest(app)
            .post("/users/logout/" + userTest.email)
        expect(result.status).toBe(200)
    })
    it("should reject if users is not found", async () => {
        const userTest = await utils.findUser()
        const result = await supertest(app)
            .post("/users/logout/" + userTest.email + "salah")
      
        expect(result.status).toBe(404)
    })

  
})

describe("post users/delete/:identify",() => {
    beforeEach(async () => {
        await utils.createTestUserAdmin()
        await utils.createTestUser()
        await supertest(app)
        .post("/users/login")
        .send({
            "email" : "aabiljr@gmail.com",
            "password" : "habil"
        })
    })
    afterEach(async () => {
        await utils.removeTestUser()
    })

    it("should can delete users", async () => {
        const userTestRegular = await utils.findRegularUser()
        const userTestAdmin = await utils.findUser()
        const result = await supertest(app)
            .delete("/users/delete/" + userTestRegular.email)
            .set("Authorization",`Bearer ${userTestAdmin.token}`)
     
        expect(result.status).toBe(200)
    })

  
})




