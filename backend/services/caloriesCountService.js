function caloriesCountService() {
}

caloriesCountService.prototype.getAdvisedCalories = getAdvisedCalories;

function getAdvisedCalories(newData, currentData, callback) {

    const gender = newData.gender || currentData.gender;
    const weight = newData.weight || currentData.weight;
    const height = newData.height || currentData.height;
    const birthday = newData.birthday || currentData.birthday;
    const activityLevel = newData.activityLevel || currentData.activityLevel;

    if (gender && weight && height && birthday && activityLevel) {
        let genderNumber = gender === 'Male' ? 5 : -161;
        let age = getAge(birthday);
        callback(Math.round((10 * weight + 6.25 * height - 5 * age + genderNumber) * activityLevel));
    } else {
        callback('error')
    }
}

function getAge(birthday) {
    const birthdayDate = new Date(birthday);
    const ageDif = Date.now() - birthdayDate;
    const ageDate = new Date(ageDif);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = new caloriesCountService();
