exports.getTenantProfile = async (req, res) => {
  try {
    res.json({
      message: "Tenant profile fetched successfully",
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
