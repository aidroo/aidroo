import sequelize from "../sequalize";
import Address from "./address";
import BusinessProfile from "./business-profile";
import Category from "./category";
import Job from "./Job";
import PersonalProfile from "./personal-profile";
import Reaction from "./reaction";
import ReplyReview from "./replayReview";
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
db.ReplyReview = ReplyReview;
db.Reaction = Reaction;

// Define associations with cascading deletes

// User to PersonalProfile
db.User.hasOne(db.PersonalProfile, {
  foreignKey: "username",
  as: "personalProfile",
  onDelete: "CASCADE", // Automatically delete PersonalProfile when User is deleted
});
db.PersonalProfile.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
  onDelete: "CASCADE", // Automatically delete PersonalProfile if User is deleted
});

// User to BusinessProfile
db.User.hasOne(db.BusinessProfile, {
  foreignKey: "username",
  as: "businessProfile",
  onDelete: "CASCADE", // Automatically delete BusinessProfile when User is deleted
});
db.BusinessProfile.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
  onDelete: "CASCADE",
});

// User to Address
db.User.hasOne(db.Address, {
  foreignKey: "username",
  as: "addresses",
  onDelete: "CASCADE", // Automatically delete Address when User is deleted
});
db.Address.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
  onDelete: "CASCADE",
});

// Schedule association
db.User.hasMany(db.Schedule, {
  foreignKey: "username",
  as: "schedule",
  onDelete: "CASCADE", // Automatically delete Schedules when User is deleted
});
db.Schedule.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
  onDelete: "CASCADE",
});

// Jobs association
db.User.hasMany(db.JobPost, {
  foreignKey: "username",
  as: "jobPost",
  onDelete: "CASCADE", // Automatically delete Jobs when User is deleted
});
db.JobPost.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
  onDelete: "CASCADE",
});

// Reviews association with User (the creator of the review)
db.User.hasMany(db.Review, {
  foreignKey: "username", // This refers to the user who created the review
  as: "review",
  onDelete: "CASCADE", // Automatically delete Reviews when User is deleted
});
db.Review.belongsTo(db.User, {
  foreignKey: "username",
  as: "user", // The user who created the review
  onDelete: "CASCADE",
});

// Reviews association with BusinessProfile (the profile being reviewed)
db.BusinessProfile.hasMany(db.Review, {
  foreignKey: "profileId", // This refers to the profile being reviewed
  as: "review",
  onDelete: "CASCADE", // Automatically delete Reviews when BusinessProfile is deleted
});
db.Review.belongsTo(db.BusinessProfile, {
  foreignKey: "profileId",
  as: "businessProfile", // The profile being reviewed
  onDelete: "CASCADE",
});

// Category and Subcategory associations
db.Category.hasMany(db.Subcategory, {
  foreignKey: "categoryId",
  as: "subcategories",
  onDelete: "CASCADE", // Automatically delete Subcategories when Category is deleted
});
db.Subcategory.belongsTo(db.Category, {
  foreignKey: "categoryId",
  as: "category",
  onDelete: "CASCADE",
});

// replay review
db.Review.hasMany(db.ReplyReview, {
  foreignKey: "reviewId", // Associates replies with a review
  as: "replies", // Alias for the replies relation
  onDelete: "CASCADE", // Delete replies when the review is deleted
});
db.ReplyReview.belongsTo(db.Review, {
  foreignKey: "reviewId",
  as: "review", // Alias for the review that was replied to
  onDelete: "CASCADE",
});

// User association with ReplyReview (the user who replies)
db.User.hasMany(db.ReplyReview, {
  foreignKey: "username", // Associates replies with the user who created the reply
  as: "replyReviews", // Alias for the replies relation
  onDelete: "CASCADE", // Delete replies when the user is deleted
});
db.ReplyReview.belongsTo(db.User, {
  foreignKey: "username",
  as: "user", // Alias for the user who replied
  onDelete: "CASCADE",
});
// Association Setup

// Reaction Model
db.Review.hasMany(db.Reaction, {
  foreignKey: "reviewId",
  as: "reactions",
  onDelete: "CASCADE",
});

db.Reaction.belongsTo(db.Review, {
  foreignKey: "reviewId",
  as: "review",
  onDelete: "CASCADE",
});

// User association with Reaction (Ensure the key is consistent)
db.User.hasMany(db.Reaction, {
  foreignKey: "profileId", // Should match the Reaction model's profileId
  as: "reactions",
  onDelete: "CASCADE",
});

db.Reaction.belongsTo(db.User, {
  foreignKey: "profileId", // Should match the Reaction model's profileId
  as: "user",
  onDelete: "CASCADE",
});

export default db;
