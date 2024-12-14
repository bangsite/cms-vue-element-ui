export const scorePassword = (password: string) => {
  let score = 0;
  let length = 0;
  let specialChar = 0;
  let caseMix = 0;
  let numCharMix = 0;

  const specialCharRegex = /[^A-Za-z0-9]/g;
  const lowercaseRegex = /(.*[a-z].*)/g;
  const uppercaseRegex = /(.*[A-Z].*)/g;
  const numberRegex = /(.*[0-9].*)/g;
  const repeatCharRegex = /(\w)(\1+\1+\1+\1+)/g;

  const hasSpecialChar = specialCharRegex.test(password);
  const hasLowerCase = lowercaseRegex.test(password);
  const hasUpperCase = uppercaseRegex.test(password);
  const hasNumber = numberRegex.test(password);
  const hasRepeatChars = repeatCharRegex.test(password);

  if (password.length > 8) {
    if ((hasLowerCase || hasUpperCase) && hasNumber) {
      numCharMix = 1;
    }

    if (hasUpperCase && hasLowerCase) {
      caseMix = 1;
    }

    if ((hasLowerCase || hasUpperCase || hasNumber) && hasSpecialChar) {
      specialChar = 1;
    }

    if (password.length > 8) {
      length = 1;
    }

    if (password.length > 12 && !hasRepeatChars) {
      length = 2;
    }

    if (password.length > 20 && !hasRepeatChars) {
      length = 3;
    }

    score = length + specialChar + caseMix + numCharMix;

    if (score > 4) score = 4;
  }

  return score;
};
