export default function validateCreateListingData(data) {
  const {
    subject,
    lessonTime,
    price,
    city,
    shortDescription,
    fullDescription,
    yearsOfTeachingExperience,
    phoneNumber,
    emailAddress,
    image,
    firstName,
    lastName,
  } = data;
  let errors = {};

  if (!firstName) {
    errors.firstName = "Name is required!";
  } else if (firstName.length > 50) {
    errors.firstName = "The name should be max. 50 characters long";
  }

  if (!lastName) {
    errors.lastName = "Last name is required!";
  } else if (firstName.length > 50) {
    errors.lastName = "The last name should be max. 50 characters long";
  }

  if (!subject) {
    errors.subject = "What instrument do you teach?";
  }

  if (lessonTime < 30) {
    errors.lessonTime = "Lesson should last at least 30 minutes";
  } else if (lessonTime > 120) {
    errors.lessonTime = "Lesson should last max. 120 minutes";
  }

  if (price < 20) {
    errors.price = "Lesson should cost at least 20 PLN";
  } else if (price > 400) {
    errors.price = "Lesson should cost max. 400 PLN";
  }

  if (!city) {
    errors.city = "Please choose a city";
  }

  if (!atMentorsPlace.checked && !atStudentsPlace.checked && !online.checked) {
    errors.lessonLocation = "Where do you teach? Choose at least 1 option";
  }

  if (shortDescription.length < 50) {
    errors.shortDescription =
      "Short description should be at least 50 characters long";
  } else if (data.shortDescription.length > 250) {
    errors.shortDescription =
      "Short description should be max. 250 characters long";
  }

  if (fullDescription.length < 100) {
    errors.fullDescription =
      "Full description should be min. 100 characters long";
  } else if (fullDescription.length > 700) {
    errors.fullDescription =
      "Full description should be max. 700 characters long";
  }

  if (
    !elementarySchool.checked &&
    !highSchool.checked &&
    !college.checked &&
    !adults.checked
  ) {
    errors.levelsOfTeaching = "Choose at least one level of teaching";
  }

  if (!yearsOfTeachingExperience) {
    errors.yearsOfTeachingExperience = "At least 1 year of experience required";
  }

  if (!phoneNumber) {
    errors.phoneNumber = "Enter your phone number";
  }

  if (!emailAddress) {
    errors.emailAddress = "Please enter email address";
  }

  if (!image) {
    errors.image = "Please upload a picture of yourself";
  }

  return errors;
}
