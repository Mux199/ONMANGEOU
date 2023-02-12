const jwt = require("jsonwebtoken");
const app = require("./server");
const request = require("supertest");
const UserModel = require("./models/user.model");
const RestaurantModel = require("./models/restaurant.model");
const PlanningModel = require("./models/planning.model");

describe("GET /", () => {
  it("should return ...", async () => {
    const res = await request(app).get("api/user");
    console.log(res);
    expect(res.status).toEqual(200);
  });
});

describe("createToken", () => {
  it("creates a JSON Web Token with an expiration of 3 days", () => {
    const id = "user_id";
    const token = createToken(id);

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    expect(decoded).toHaveProperty("id", id);
    expect(decoded).toHaveProperty("exp");
    expect(decoded.exp * 1000).toBeCloseTo(
      Date.now() + 3 * 24 * 60 * 60 * 1000,
      -1
    );
  });
});

describe("signUpUser", () => {
  it('creates a user with role of "user"', async () => {
    const req = {
      body: {
        email: "test@email.com",
        password: "password",
        firstname: "test",
        lastname: "user",
        telephone: "0987654321",
        role: "user",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.mock(UserModel, () => ({
      create: jest
        .fn()
        .mockResolvedValue({ email: "test@email.com", role: "user" }),
    }));
    jest.mock(RestaurantModel, () => ({
      create: jest.fn(),
    }));

    await signUpUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user: "test@email.com",
      role: "user",
    });
    expect(UserModel.create).toHaveBeenCalledWith({
      email: "test@email.com",
      password: "password",
      firstname: "test",
      lastname: "user",
      telephone: "0987654321",
      role: "user",
    });
    expect(RestaurantModel.create).not.toHaveBeenCalled();
  });
});

describe("Sign up user", () => {
  it("should fail when creating a new user account", async () => {
    const req = {
      body: {
        email: "invalidemail",
        password: "password",
        firstname: "firstname",
        lastname: "lastname",
        telephone: "telephone",
        role: "user",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await signUpUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: { email: "Invalid email address" },
    });
  });
});

describe("Sign up professional", () => {
  it("should create a new professional account", async () => {
    const req = {
      body: {
        email: "professional@email.com",
        password: "password",
        firstname: "firstname",
        lastname: "lastname",
        telephone: "0987654321",
        role: "professional",
        name: "Restaurant Name",
        adresse: "Restaurant Address",
        siret: "87890956432345",
        city: "city",
        postalCode: "75000",
        type: "americain",
        weekdays: ["lundi", "mardi"],
        waiting: "rapide",
        priceRange: "moyen",
        places: [
          [1, 1],
          [1, 1],
        ],
        nbplaces: 4,
        description: "description",
        cols: 2,
        rows: 2,
        telephoneRestaurant: "0987654321",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await signUpUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user: "professional@email.com",
      role: "professional",
    });
  });
});

describe("Sign up professional", () => {
  it("should fail when creating a new professional account", async () => {
    const req = {
      body: {
        email: "professional@email.com",
        password: "password",
        firstname: "firstname",
        lastname: "lastname",
        telephone: "telephone",
        role: "professional",
        name: "",
        adresse: "Restaurant Address",
        siret: "123456789",
        city: "city",
        postalCode: "postalCode",
        type: "type",
        weekdays: ["Monday"],
        waiting: "waiting",
        priceRange: "priceRange",
        places: "places",
        nbplaces: "nbplaces",
        description: "description",
        cols: "cols",
        rows: "rows",
        telephoneRestaurant: "telephoneRestaurant",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await signUpUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

it("returns a 400 status code on error", async () => {
  const req = {
    body: {
      email: "notexist@example.com",
      password: "password",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await signIn(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
});

it("returns a 200 status code on success", async () => {
  const req = {
    body: {
      email: "marie1@gmail.com",
      password: "motdepasse",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    cookie: jest.fn(),
    json: jest.fn(),
  };

  await signIn(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
});

it("sets the jwt cookie's maxAge to 1", () => {
  const req = {};
  const res = {
    cookie: jest.fn(),
    redirect: jest.fn(),
  };

  logout(req, res);

  expect(res.cookie).toHaveBeenCalledWith("jwt", "", { maxAge: 1 });
});

it("returns a 200 status code and the planning document when the request is successful", async () => {
  const req = { params: { id: "63dd7d1714a561353789dd55" } };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  PlanningModel.find = jest.fn().mockResolvedValue([{ some: "planning" }]);

  await getPlanning(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.send).toHaveBeenCalledWith([{ some: "planning" }]);
});

it("returns a 404 status code and an error message when the planning document is not found", async () => {
  const req = { params: { id: "63455948e541284963d5d278" } };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  PlanningModel.find = jest.fn().mockResolvedValue([]);

  await getPlanning(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.send).toHaveBeenCalledWith({ message: "planning not found" });
});

it("returns a 400 status code and the error when an error occurs", async () => {
  const req = { params: { id: "000000000" } };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  const error = new Error("some error");
  PlanningModel.find = jest.fn().mockRejectedValue(error);

  await getPlanning(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith(error);
});