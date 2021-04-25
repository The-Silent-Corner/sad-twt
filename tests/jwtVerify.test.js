const jwtVerify = require("../helpers/jwtVerify.js");
const jwtGenerate = require("../helpers/jwtGenerate");

describe("decoding json web token", () =>{
  it("should return payload", async() =>{
    const testToken = jwtGenerate("JP@gmail.com", "parent");
    const verify = await jwtVerify(testToken);
    expect(verify).not.toBe(false);
    expect(verify).toBeDefined();
    expect(verify.user).toBe("JP@gmail.com");
    expect(verify.type).toBe("parent");
  });
  it("should return false", async() =>{
    const testToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMTIzIiwidHlwZSI6InBhcmVudCIsImlhdCI6MTYxOTMwOTM0MywiZXhwIjoxNjE5MzEyOTQzfQ.W97zYdo9Viks10hteOySDOpcfPRWXxyOzbazaC7-lYo";
    const verify = await jwtVerify(testToken);
    expect(verify).toBe(false);
  });
});