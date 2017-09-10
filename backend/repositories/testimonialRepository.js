const Repository = require('./generalRepository'),
    Testimonial = require('../schemas/testimonialSchema');

function TestimonialRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Testimonial;
}

TestimonialRepository.prototype = new Repository();

TestimonialRepository.prototype.findByCoachId = findByCoachId;
TestimonialRepository.prototype.updateById = updateById;
TestimonialRepository.prototype.deleteById = deleteById;

function findByCoachId(coachId, callback) {
    const query = this.model.find({
        $and: [
            {
                coachId: coachId
            },
            {
                isRemoved: false
            }
        ]
    });
    query.exec(callback);
}

function updateById(id, userId, body, callback) {
    const query = this.model.update(
        { $and: [
            {
                userId: userId
            },
            {
                _id: id,
            }
        ]},
        { $set: {
            body: body
        }}
    );
    query.exec(callback);
}

function deleteById(id, userId, callback) {
    const query = this.model.update(
        { $and: [
            {
                userId: userId
            },
            {
                _id: id,
            }
        ]},
        { $set: {
            isRemoved: true
        }}
    );
    query.exec(callback);
}

module.exports = new TestimonialRepository();
