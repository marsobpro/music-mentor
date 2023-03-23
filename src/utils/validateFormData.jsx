export default function validateFormData(data) {
  const {
    subject,
    lessonTime,
    price,
    city,
    shortDescription = "",
    fullDescription = "",
    yearsOfTeachingExperience,
    phoneNumber = "",
    emailAddress = "",
    image,
    firstName = "",
    lastName = "",
    atMentorsPlace,
    atStudentsPlace,
    online,
    elementarySchool,
    highSchool,
    college,
    adults,
    password = "",
    videoLink = "",
    message = "",
  } = data;
  let errors = {};

  const emailRegex = /^(\S[^@\s]*)@([^\s@]+)\.([^\s@]+)$/;
  const youtubeUrlPattern =
    /^https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/)([a-zA-Z0-9_-]{11})/;

  if (!firstName.trim()) {
    errors.firstName = "Please enter your name";
  } else if (firstName.length > 50) {
    errors.firstName = "The name should be max. 50 characters long";
  }

  if (!lastName.trim()) {
    errors.lastName = "Please enter your last name";
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
    errors.city = "Choose a city";
  }

  if (!atMentorsPlace && !atStudentsPlace && !online) {
    errors.lessonLocation =
      "Where do you teach? Please choose at least 1 option";
  }

  if (shortDescription.trim().length < 50) {
    errors.shortDescription =
      "Short description should be at least 50 characters long";
  } else if (shortDescription.trim().length > 250) {
    errors.shortDescription =
      "Short description should be max. 250 characters long";
  }

  if (fullDescription.trim().length < 100) {
    errors.fullDescription =
      "Full description should be min. 100 characters long";
  } else if (fullDescription.trim().length > 700) {
    errors.fullDescription =
      "Full description should be max. 700 characters long";
  }

  if (!elementarySchool && !highSchool && !college && !adults) {
    errors.levelsOfTeaching = "Please choose at least one level of teaching";
  }

  if (!yearsOfTeachingExperience) {
    errors.yearsOfTeachingExperience = "At least 1 year of experience required";
  }

  if (!phoneNumber.trim()) {
    errors.phoneNumber = "Please enter your phone number";
  }

  if (!emailAddress.trim()) {
    errors.emailAddress = "Please enter your email";
  } else if (!emailRegex.test(emailAddress)) {
    errors.emailAddress =
      "Enter the email in the correct format (example@mail.com)";
  }

  if (!password) {
    errors.password = "Please choose a password";
  } else {
    if (password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password should contain at least 1 uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Password should contain at least 1 lowercase letter";
    } else if (!/[!@#$%^&*()]/.test(password)) {
      errors.password = "Password should contain at least 1 special character";
    } else if (!/\d/.test(password)) {
      errors.password = "Password should contain at least 1 number";
    } else if (/\s/.test(password)) {
      errors.password = "Password cannot contain whitespace characters";
    }
  }

  if (!image) {
    errors.image = "Please upload a picture of yourself";
  }

  if (videoLink.trim().length) {
    if (!videoLink.match(youtubeUrlPattern)) {
      errors.videoLink =
        "Please add a link in the correct format (https://www.youtube.com/watch?v=... OR https://www.youtube.com/embed/...)";
    }
  }

  if (!message.trim()) {
    errors.message = "Please write a message";
  } else {
    if (message.trim().length < 20) {
      errors.message =
        "Please make sure that your message has at least 20 characters";
    } else if (message.trim().length > 700) {
      errors.message =
        "Please try to keep your message to a maximum of 700 characters";
    }
  }

  return errors;
}
