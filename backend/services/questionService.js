const questionModel = require("../models/questionModel");

const VALID_DIFFICULTIES = ["Easy", "Medium", "Hard"];
const VALID_TYPES = ["Single Choice", "Multiple Choice", "True/False"];

const validateQuestion = (data) => {
    if (!data.content || !data.content.trim()) {
        return "Question content is required.";
    }

    if (!VALID_DIFFICULTIES.includes(data.difficulty)) {
        return "Invalid difficulty.";
    }

    if (!VALID_TYPES.includes(data.question_type)) {
        return "Invalid question type.";
    }

    if (!data.topic || !data.topic.trim()) {
        return "Topic is required.";
    }

    return null;
};

const getQuestions = (filters) => questionModel.findAll(filters);

const getQuestion = async (id) => {
    const question = await questionModel.findById(id);

    if (!question) {
        const error = new Error("Question not found.");
        error.status = 404;
        throw error;
    }

    return question;
};

const createQuestion = async (data) => {
    const errorMessage = validateQuestion(data);

    if (errorMessage) {
        const error = new Error(errorMessage);
        error.status = 400;
        throw error;
    }

    return questionModel.create({
        content: data.content.trim(),
        difficulty: data.difficulty,
        question_type: data.question_type,
        topic: data.topic.trim()
    });
};

const updateQuestion = async (id, data) => {
    const errorMessage = validateQuestion(data);

    if (errorMessage) {
        const error = new Error(errorMessage);
        error.status = 400;
        throw error;
    }

    const question = await questionModel.update(id, {
        content: data.content.trim(),
        difficulty: data.difficulty,
        question_type: data.question_type,
        topic: data.topic.trim()
    });

    if (!question) {
        const error = new Error("Question not found.");
        error.status = 404;
        throw error;
    }

    return question;
};

const deleteQuestion = async (id) => {
    const deleted = await questionModel.remove(id);

    if (!deleted) {
        const error = new Error("Question not found.");
        error.status = 404;
        throw error;
    }
};

module.exports = {
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion
};
