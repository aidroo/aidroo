import sequelize from "../sequalize";
import Address from "./address";
import BusinessProfile from "./business-profile";
import Category from "./category";
import Job from "./Job";
import PersonalProfile from "./personal-profile";
import Review from "./review";
import Schedule from "./schedule";
import SubCategory from "./subCategory";
import User from "./user";

// Initialize models
const db = {};

db.Sequelize = sequelize.Sequelize;
db.sequelize = sequelize;

db.User = User;
db.PersonalProfile = PersonalProfile;
db.BusinessProfile = BusinessProfile;
db.Address = Address;
db.Category = Category;
db.Subcategory = SubCategory;

db.JobPost = Job;
db.Review = Review;
db.Schedule = Schedule;

// Define associations

// User to PersonalProfile
db.User.hasOne(db.PersonalProfile, {
  foreignKey: "username",
  as: "personalProfile",
});
db.PersonalProfile.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
});

// User to BusinessProfile
db.User.hasOne(db.BusinessProfile, {
  foreignKey: "username",
  as: "businessProfile",
});
db.BusinessProfile.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
});

// User to Address
db.User.hasOne(db.Address, {
  foreignKey: "username",
  as: "addresses",
});
db.Address.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
});

// Schedule association
db.User.hasMany(db.Schedule, {
  foreignKey: "username",
  as: "schedule",
});
db.Schedule.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
});

// Jobs association
db.User.hasMany(db.JobPost, {
  foreignKey: "username",
  as: "jobPost",
});
db.JobPost.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
});

// Reviews association with User (the creator of the review)
db.User.hasMany(db.Review, {
  foreignKey: "username", // This refers to the user who created the review
  as: "review", // Changed from singular "review" to plural "reviews"
});
db.Review.belongsTo(db.User, {
  foreignKey: "username",
  as: "user", // The user who created the review
});

// Reviews association with BusinessProfile (the profile being reviewed)
db.BusinessProfile.hasMany(db.Review, {
  foreignKey: "profileId", // This refers to the profile being reviewed
  as: "review",
});
db.Review.belongsTo(db.BusinessProfile, {
  foreignKey: "profileId",
  as: "businessProfile", // The profile being reviewed
});

// Category and Subcategory associations
db.Category.hasMany(db.Subcategory, {
  foreignKey: "categoryId",
  as: "subcategories",
});
db.Subcategory.belongsTo(db.Category, {
  foreignKey: "categoryId",
  as: "category",
});

export default db;
