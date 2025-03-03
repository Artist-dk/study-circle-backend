exports.getTest = (req, res) => {
    res.json({ message: 'GET request successful' });
};
exports.postTest = (req, res) => {
    res.json({ message: 'POST request successful', data: req.body });
};