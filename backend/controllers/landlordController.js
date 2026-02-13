exports.getLandlordDashboard = async (req, res) => {
  try {
    res.json({
      message: "Landlord dashboard loaded",
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
