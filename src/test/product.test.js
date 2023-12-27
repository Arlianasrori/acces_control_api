import supertest from "supertest";
import { app } from "../application/app.js";
import utils from "./testUtils.js"

describe("post product/add",() => {
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
        await utils.removeProductTest()
        await utils.removeTestUser()
    })

    it("should can add product", async () => {
        const userTestAdmin = await utils.findUser()
        const result = await supertest(app)
            .post("/product/add")
            .set("Authorization",`Bearer ${userTestAdmin.token}`)
            .send({
                "nama_product" : "product test",
                "price" : 80000,
                "deksription" : "sangat nyaman dipakai",
                "category" : "sepatu"
            })
          
        expect(result.status).toBe(201)

    })
    it("should reject if token is invalid", async () => {
        const result = await supertest(app)
            .post("/product/add")
            .set("Authorization",'Bearer salah')
            .send({
                "nama_product" : "sepatu",
                "price" : 80000,
                "deksription" : "sangat nyaman dipakai",
                "category" : "sepatu"
            })

        expect(result.status).toBe(403)
    })
    it("should reject if token authorize", async () => {
        const result = await supertest(app)
            .post("/product/add")
            .set("Authorization",'')
            .send({
                "nama_product" : "sepatu",
                "price" : 80000,
                "deksription" : "sangat nyaman dipakai",
                "category" : "sepatu"
            })

        expect(result.status).toBe(403)
    })
    it("should reject if request is invalid", async () => {
        const userTestAdmin = await utils.findUser()
        const result = await supertest(app)
            .post("/product/add")
            .set("Authorization",`Bearer ${userTestAdmin.token}`)
            .send({
                "nama_product" : "",
                "price" : 80000,
                "deksription" : "sangat nyaman dipakai",
                "category" : "sepatu"
            })

        expect(result.status).toBe(400)
    })
})

describe("get product",() => {
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

    it("should can get product", async () => {
        const userTestAdmin = await utils.findUser()
        const result = await supertest(app)
            .get("/product")
            .set("Authorization",`Bearer ${userTestAdmin.token}`)
          
        expect(result.status).toBe(200)

    })
    it("should reject if token invalid", async () => {
        const userTestAdmin = await utils.findUser()
        const result = await supertest(app)
            .get("/product")
            .set("Authorization",`Bearer ${userTestAdmin.token}354`)
          
        expect(result.status).toBe(401)

    })
 
})
describe("put product",() => {
    beforeEach(async () => {
        await utils.createTestUserAdmin()
        await utils.createTestProduct()
        await supertest(app)
        .post("/users/login")
        .send({
            "email" : "aabiljr@gmail.com",
            "password" : "habil"
        })
    })

    afterEach(async () => {
        await utils.removeProductAfterUpdateTest()
        await utils.removeTestUser()
    })


    it("should can update product", async () => {
        const userTestAdmin = await utils.findUser()
        const productTest = await utils.findProductTest()
        const result = await supertest(app)
            .put("/product/" + productTest.id)
            .set("Authorization",`Bearer ${userTestAdmin.token}`)
            .send({
                "nama_product" : "test update",
                "price" : "300000"
            })

        expect(result.status).toBe(200)

    })

 
})
describe("delete product",() => {
    beforeEach(async () => {
        await utils.createTestUserAdmin()
        await utils.createTestProduct()
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


    it("should can delete product", async () => {
        const userTestAdmin = await utils.findUser()
        const productTest = await utils.findProductTest()
        const result = await supertest(app)
            .delete("/product/" + productTest.id)
            .set("Authorization",`Bearer ${userTestAdmin.token}`)

        expect(result.status).toBe(200)

    })
    it("should can reject if product is not found", async () => {
        const userTestAdmin = await utils.findUser()
        const productTest = await utils.findProductTest()
        const result = await supertest(app)
            .delete("/product/" + (productTest.id + 1))
            .set("Authorization",`Bearer ${userTestAdmin.token}`)

        expect(result.status).toBe(404)

        await utils.removeProductTest()

    })
    it("should can reject if token is invalid", async () => {
        const userTestAdmin = await utils.findUser()
        const productTest = await utils.findProductTest()
        const result = await supertest(app)
            .delete("/product/" + productTest.id)
            .set("Authorization",`Bearer ${userTestAdmin.token}87686`)

        expect(result.status).toBe(403)

        await utils.removeProductTest()

    })

 
})
