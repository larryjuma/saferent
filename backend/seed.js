const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Property = require("./models/Property");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected for seeding"))
  .catch((err) => console.error(err));

const IMAGE_POOL = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600",
  "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1600",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1600",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600",
  "https://media.istockphoto.com/id/590277406/photo/modern-detached-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=mpkmvocAxl1KqIEBLvMoIjui7gyX-ZAOOnktY75k8v8=",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600",
  "https://images.unsplash.com/photo-1752989316612-296441af9b39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNtYWxsJTIwbWFuc2lvbnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600",
];

const seed = async () => {
  try {
    await Property.deleteMany();
    await User.deleteMany();

    const landlord = await User.create({
      name: "Demo Landlord",
      email: "landlord@test.com",
      password: "123456",
      role: "landlord",
    });

    const properties = Array.from({ length: 12 }).map((_, i) => {
      const images = [
        IMAGE_POOL[i % IMAGE_POOL.length],
        IMAGE_POOL[(i + 1) % IMAGE_POOL.length],
        IMAGE_POOL[(i + 2) % IMAGE_POOL.length],
      ];

      return {
        landlord: landlord._id,
        title: `Modern Apartment ${i + 1}`,
        description:
          "Experience modern living in this beautifully designed rental property located in Nairobi. Featuring spacious interiors, secure access, and proximity to essential amenities.",
        price: 20000 + i * 1500,
        location: "Nairobi",
        propertyType: i % 2 === 0 ? "apartment" : "bedsitter", // ✅ FIXED
        bedrooms: i % 3 === 0 ? 2 : 1,
        bathrooms: 1,
        isAvailable: true,
        images,
      };
    });

    await Property.insertMany(properties);

    console.log("✅ Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
