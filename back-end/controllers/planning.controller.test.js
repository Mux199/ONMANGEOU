const app = require("../server");
const request = require("supertest");
const PlanningModel = require("../models/planning.model");

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
