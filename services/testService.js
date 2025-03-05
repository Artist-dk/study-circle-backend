const testModel = require('../models/testModel');

async function getAllTests() {
  return testModel.getAllTests();
}

async function getTestById(id) {
  return testModel.getTestById(id);
}

async function createTest(data) {
  return testModel.createTest(data);
}

async function updateTest(id, data) {
  return testModel.updateTest(id, data);
}

async function deleteTest(id) {
  return testModel.deleteTest(id);
}

module.exports = {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest,
};