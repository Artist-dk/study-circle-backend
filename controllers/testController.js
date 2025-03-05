const Test = require('../models/testModel');

exports.getAllTests = async (req, res) => {
    try {
        const tests = await Test.getAll();
        res.json({ success: true, data: tests });
    } catch (error) {
        console.error("Error fetching tests:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.getTestById = async (req, res) => {
    const { id } = req.params;
    try {
        const test = await Test.getById(id);
        if (!test) {
            return res.status(404).json({ success: false, message: "Test not found" });
        }
        res.json({ success: true, data: test });
    } catch (error) {
        console.error("Error fetching test:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.createTest = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: "Name is required" });
    }

    try {
        const newTestId = await Test.insert({ name });
        res.status(201).json({ success: true, message: "Test created", id: newTestId });
    } catch (error) {
        console.error("Error creating test:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.updateTest = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedRows = await Test.update(id, { name });
        if (updatedRows === 0) {
            return res.status(404).json({ success: false, message: "Test not found" });
        }
        res.json({ success: true, message: "Test updated" });
    } catch (error) {
        console.error("Error updating test:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.deleteTest = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRows = await Test.delete(id);
        if (deletedRows === 0) {
            return res.status(404).json({ success: false, message: "Test not found" });
        }
        res.json({ success: true, message: "Test deleted" });
    } catch (error) {
        console.error("Error deleting test:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};