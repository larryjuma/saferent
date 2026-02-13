exports.adminPanel = async (req, res) => {
  try {
    res.json({
      message: "Admin panel loaded",
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
